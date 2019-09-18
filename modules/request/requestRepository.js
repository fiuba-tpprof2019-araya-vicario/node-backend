import { sequelize } from '../../db/connectorDB'
import { getBadRequest } from '../util/error'
import { STATUS_REQUEST } from './requestUtils'
import { Op } from 'sequelize'

const ProjectRequestStudent = require('../../db/models').ProjectRequestStudent
const ProjectRequestTutor = require('../../db/models').ProjectRequestTutor
const Project = require('../../db/models').Project
const User = require('../../db/models').User
const ProjectType = require('../../db/models').ProjectType
const ProjectTypeTransaction = require('../../db/models').ProjectTypeTransaction
const ProjectHistory = require('../../db/models').ProjectHistory
const State = require('../../db/models').State

const STATE_ID_START = 1

class RequestRepository {
  static updateRequestStudent (id, updateObject) {
    return ProjectRequestStudent.update(updateObject, { where: { id } })
      .then((result) => {
        if (result[0] > 0) return ProjectRequestStudent.findByPk(id, { include: [ { model: Project }, { model: User } ] })
        else return null
      })
  }

  static updateRequestTutor (id, updateObject, transaction) {
    console.log('RequestRepository::updateRequestTutor')
    console.log('updateObject: ', updateObject)
    return ProjectRequestTutor.update(updateObject, { where: { id }, transaction })
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
      include: [
        { model: Project,
          include: [
            { model: User, as: 'Creator' },
            { model: ProjectType, as: 'Type' }
          ] }
      ]
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
    console.log(State.getMaxStateAcceptRequest())
    return ProjectRequestTutor.findOne({
      where: { id: requestId, status: STATUS_REQUEST.PENDING },
      include: [{ model: Project, required: true, where: { state_id: { [Op.lte]: State.getMaxStateAcceptRequest() } } }]
    })
      .then(request => {
        return request != null
      })
  }

  static hasRequestStudentPending (requestId) {
    return ProjectRequestStudent.findOne({
      where: { id: requestId, status: STATUS_REQUEST.PENDING },
      include: [{ model: Project, required: true, where: { state_id: { [Op.lte]: State.getMaxStateAcceptRequest() } } }]
    })
      .then(project => {
        return project != null
      })
  }

  static hasRequestTutorAccepted (requestId) {
    return ProjectRequestTutor.findOne({ where: { id: requestId, status: STATUS_REQUEST.ACCEPTED } })
      .then(request => {
        return request != null
      })
  }

  static hasRequestStudentAccepted (requestId) {
    return ProjectRequestStudent.findOne({ where: { id: requestId, status: STATUS_REQUEST.ACCEPTED } })
      .then(project => {
        return project != null
      })
  }

  static async acceptTutorRequest (requestId) {
    console.log(requestId)
    console.log(State.getMaxStateAcceptRequest())
    let request = await RequestRepository.getRequestTutorById(requestId, [{ model: Project, where: { state_id: STATE_ID_START } }])
    if (request == null) return Promise.reject(getBadRequest())
    let projectTypeState = await ProjectTypeTransaction.findOne({
      where: {
        project_type: request.dataValues.Project.dataValues.type_id,
        primary_state: request.dataValues.Project.dataValues.state_id
      }
    })
    if (projectTypeState == null) return Promise.reject(getBadRequest())
    return sequelize.transaction(transaction => {
      let p1 = RequestRepository.updateRequestTutor(requestId, { status: STATUS_REQUEST.ACCEPTED }, transaction)
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

  static resetAcceptProposal (projectId) {
    let p1 = ProjectRequestStudent.update({ accepted_proposal: 'pending' }, { where: { project_id: projectId } })
    let p2 = ProjectRequestTutor.update({ accepted_proposal: 'pending' }, { where: { project_id: projectId } })
    return Promise.all([p1, p2])
  }
}

export default RequestRepository
