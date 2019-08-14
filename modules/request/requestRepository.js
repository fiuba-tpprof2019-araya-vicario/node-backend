import { sequelize } from '../../db/connectorDB'

const ProjectRequestStudent = require('../../db/models').ProjectRequestStudent
const ProjectRequestTutor = require('../../db/models').ProjectRequestTutor
const Project = require('../../db/models').Project
const ProjectTypeState = require('../../db/models').ProjectTypeState

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
    return ProjectRequestStudent.update({ status }, { where: { id } })
  }

  static modifyStatusRequestTutor (id, status, transaction) {
    return ProjectRequestTutor.update({ status }, { where: { id }, transaction })
  }

  static getRequestStudentById (id, include) {
    return ProjectRequestStudent.findByPk(id, { include })
  }

  static getRequestTutorById (id, include) {
    return ProjectRequestTutor.findByPk(id, { include })
  }

  static async acceptTutorRequest (requestId) {
    let request = await RequestRepository.getRequestTutorById(requestId, { include: [{ model: Project, where: { state_id: 2 } }] })
    let projectTypeState = await ProjectTypeState.findOne({
      where: {
        project_type_id: request.dataValues.Project.dataValues.type_id,
        primary_state_id: request.dataValues.Project.dataValues.type_id
      }
    })
    return sequelize.transaction(transaction => {
      let p1 = ProjectRequestTutor.update({ status: 'accepted' }, { where: { id: requestId }, transaction })
      let p2 = Project.update(
        { state_id: projectTypeState.dataValues.secondary_state_id },
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
