import { sequelize } from '../../db/connectorDB'

const ProjectRequestStudent = require('../../db/models').ProjectRequestStudent
const ProjectRequestTutor = require('../../db/models').ProjectRequestTutor

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

  static modifyStatusRequestTutor (id, status) {
    return ProjectRequestTutor.update({ status }, { where: { id } })
  }

  static getRequestStudentById (id) {
    return ProjectRequestStudent.findByPk(id)
  }

  static getRequestTutorById (id) {
    return ProjectRequestTutor.findByPk(id)
  }
}

export default RequestRepository
