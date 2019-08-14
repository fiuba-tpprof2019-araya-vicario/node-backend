import { sequelize } from '../../db/connectorDB'
import ProjectRepository from '../project/projectRepository'

const ProjectRequestStudent = require('../../db/models').ProjectRequestStudent
const ProjectRequestTutor = require('../../db/models').ProjectRequestTutor
const Project = require('../../db/models').Project
const ProjectTypeTransaction = require('../../db/models').ProjectTypeTransaction

const STATE_ID_START = 1

const STATUS_REQUEST = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
}

const TYPE_TUTOR_REQUEST = {
  TUTOR: 'tutor',
  COTUTOR: 'cotutor'
}

class RequestRepository {
  static modifyStatusRequestStudent (id, status) {
    return ProjectRequestStudent.update({ status }, { where: { id, status: 'pending' } })
  }

  static modifyStatusRequestTutor (id, status, transaction) {
    return ProjectRequestTutor.update({ status }, { where: { id, status: 'pending' }, transaction })
  }

  static getRequestStudentById (id, include) {
    return ProjectRequestStudent.findByPk(id, { include })
  }

  static getRequestTutorById (id, include) {
    return ProjectRequestTutor.findByPk(id, { include })
  }

  static async acceptTutorRequest (requestId) {
    let request = await RequestRepository.getRequestTutorById(requestId, [{ model: Project, where: { state_id: 1 } }])
    let projectTypeState = await ProjectTypeTransaction.findOne({
      where: {
        project_type: request.dataValues.Project.dataValues.type_id,
        primary_state: request.dataValues.Project.dataValues.type_id
      }
    })
    return sequelize.transaction(transaction => {
      let p1 = ProjectRepository.modifyStatusRequestTutor(requestId, 'accepted', transaction)
      let p2 = Project.update(
        { state_id: projectTypeState.dataValues.secondary_state },
        { where: { id: request.dataValues.project_id }, transaction }
      )
      return Promise.all([p1, p2])
    })
      .then(() => {
        return requestId
      })
  }
}

export default RequestRepository
