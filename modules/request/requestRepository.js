import { sequelize } from '../../db/connectorDB'
import { getBadRequest } from '../util/error'

const ProjectRequestStudent = require('../../db/models').ProjectRequestStudent
const ProjectRequestTutor = require('../../db/models').ProjectRequestTutor
const Project = require('../../db/models').Project
const User = require('../../db/models').User
const ProjectTypeTransaction = require('../../db/models').ProjectTypeTransaction
const ProjectHistory = require('../../db/models').ProjectHistory

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
    return ProjectRequestStudent.update({ status }, { where: { id, status: STATUS_REQUEST.PENDING } })
      .then((result) => {
        if (result[0] > 0) return ProjectRequestStudent.findByPk(id, { include: [ { model: Project }, { model: User } ] })
        else return null
      })
  }

  static modifyStatusRequestTutor (id, status, transaction) {
    return ProjectRequestTutor.update({ status }, { where: { id, status: STATUS_REQUEST.PENDING }, transaction })
      .then((result) => {
        if (result[0] > 0) return ProjectRequestTutor.findByPk(id, { include: [ { model: Project }, { model: User } ] })
        else return null
      })
  }

  static getRequestStudentById (id, include) {
    return ProjectRequestStudent.findByPk(id, { include })
  }

  static getRequestTutorById (id, include) {
    return ProjectRequestTutor.findByPk(id, { include })
  }

  static getStudentRequests (userId) {
    return ProjectRequestStudent.findAll({
      where: {
        user_id: userId
      },
      include: [ { model: Project }, { model: User } ]
    })
  }

  static getTutorRequests (userId) {
    return ProjectRequestTutor.findAll({
      where: {
        user_id: userId
      },
      include: [ { model: Project }, { model: User } ]
    })
  }

  static hasRequestTutorPending (requestId) {
    return ProjectRequestTutor.findOne({ where: { id: requestId, status: STATUS_REQUEST.PENDING }, include: [{ model: Project, where: { state_id: 1 } }] })
      .then(request => {
        return request != null
      })
  }

  static hasRequestStudentPending (requestId) {
    return ProjectRequestStudent.findOne({ where: { id: requestId, status: STATUS_REQUEST.PENDING }, include: [{ model: Project, where: { state_id: 1 } }] })
      .then(project => {
        return project != null
      })
  }

  static async acceptTutorRequest (requestId) {
    let request = await RequestRepository.getRequestTutorById(requestId, [{ model: Project, where: { state_id: 1 } }])
    if (request == null) return Promise.reject(getBadRequest())
    let projectTypeState = await ProjectTypeTransaction.findOne({
      where: {
        project_type: request.dataValues.Project.dataValues.type_id,
        primary_state: request.dataValues.Project.dataValues.type_id
      }
    })
    if (projectTypeState == null) return Promise.reject(getBadRequest())
    return sequelize.transaction(transaction => {
      let p1 = RequestRepository.modifyStatusRequestTutor(requestId, STATUS_REQUEST.ACCEPTED, transaction)
      let p2 = Project.update(
        { state_id: projectTypeState.dataValues.secondary_state },
        { where: { id: request.dataValues.project_id }, transaction }
      )
      let p3 = ProjectHistory.create({
        project_id: request.dataValues.project_id,
        created_by: request.dataValues.user_id,
        state_id: projectTypeState.dataValues.secondary_state
      }, { transaction })
      return Promise.all([p1, p2, p3])
    })
      .then(() => {
        return requestId
      })
  }
}

export default RequestRepository
