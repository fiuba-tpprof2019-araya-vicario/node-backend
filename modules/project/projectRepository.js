import { sequelize } from '../../db/connectorDB'
import { getBadRequest } from '../util/error'

const Project = require('../../db/models').Project
const ProjectType = require('../../db/models').ProjectType
const User = require('../../db/models').User
const ProjectHistory = require('../../db/models').ProjectHistory
const State = require('../../db/models').State
const ProjectRequestTutor = require('../../db/models').ProjectRequestTutor
const ProjectRequestStudent = require('../../db/models').ProjectRequestStudent
const Requirement = require('../../db/models').Requirement
const Department = require('../../db/models').Department

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

class ProjectRepository {
  static getProjectById (id) {
    return Project.findByPk(id, {
      include: [{
        model: User,
        as: 'Creator',
        attributes: { exclude: ['google_id'] }
      },
      {
        model: User,
        as: 'Tutor',
        attributes: { exclude: ['google_id'] },
        include: [{
          model: ProjectRequestTutor,
          as: 'TutorRequests',
          where: { project_id: id }
        }]
      },
      {
        model: User,
        as: 'Students',
        attributes: { exclude: ['google_id'] },
        through: { attributes: [] },
        include: [{
          model: ProjectRequestStudent,
          as: 'StudentRequests',
          where: { project_id: id }
        }]
      },
      {
        model: User,
        as: 'Cotutors',
        attributes: { exclude: ['google_id'] },
        through: { attributes: [] },
        include: [{
          model: ProjectRequestTutor,
          as: 'TutorRequests',
          where: { project_id: id }
        }]
      },
      {
        model: ProjectType,
        as: 'Type'
      },
      {
        model: State,
        as: 'State'
      },
      {
        model: Department,
        as: 'Departments',
        through: { attributes: [] }
      }]
    })
  }

  static createProject (name, type, description) {
    return Project.create({
      name,
      description,
      type_id: type,
      state_id: STATE_ID_START
    })
  }

  static registerProjectState (projectId, creatorId, stateId) {
    return ProjectHistory.create({
      project_id: projectId,
      created_by: creatorId,
      state_id: stateId
    })
  }

  static async createWithRequirement (creatorId, requirementId, type, students, cotutors, departments) {
    let requirement = await Requirement.findOne(
      {
        where: {
          id: requirementId,
          status: 'active'
        },
        include: [{
          model: User,
          as: 'Creator',
          attributes: { exclude: ['google_id'] }
        }]
      })
    if (requirement == null) return Promise.reject(getBadRequest())
    let projectId
    return sequelize.transaction(transaction => {
      return Project.create({
        name: requirement.dataValues.name,
        description: requirement.dataValues.description,
        creator_id: creatorId,
        tutor_id: requirement.Creator.dataValues.id,
        type_id: type,
        state_id: STATE_ID_START,
        requirement_id: requirementId
      }, { transaction })
        .then(project => {
          projectId = project.dataValues.id
          let p1 = project.setStudents(students, { transaction })
          let p2 = project.setCotutors(cotutors, { transaction })
          let p3 = project.setDepartments(departments, { transaction })
          let p4 = ProjectHistory.create({
            project_id: project.dataValues.id,
            created_by: creatorId,
            state_id: project.dataValues.state_id
          }, { transaction })
          let p5 = ProjectRequestTutor.create({
            project_id: project.dataValues.id,
            user_id: requirement.Creator.dataValues.id,
            status: STATUS_REQUEST.PENDING,
            type: TYPE_TUTOR_REQUEST.TUTOR
          }, { transaction })
          let p6 = students.map(student => {
            return ProjectRequestStudent.create({
              project_id: project.dataValues.id,
              user_id: student,
              status: STATUS_REQUEST.PENDING
            }, { transaction })
          })
          let p7 = cotutors.map(cotutor => {
            return ProjectRequestTutor.create({
              project_id: project.dataValues.id,
              user_id: cotutor,
              status: STATUS_REQUEST.PENDING,
              type: TYPE_TUTOR_REQUEST.COTUTOR
            }, { transaction })
          })
          return Promise.all([p1, p2, p3, p4, p5, p6, p7])
        })
    })
      .then(() => {
        return projectId
      })
  }

  static create (creatorId, name, type, description, students, tutorId, cotutors, departments) {
    let projectId
    return sequelize.transaction(transaction => {
      return Project.create({
        name,
        description,
        creator_id: creatorId,
        tutor_id: tutorId,
        type_id: type,
        state_id: STATE_ID_START
      }, { transaction })
        .then(project => {
          projectId = project.dataValues.id
          let p1 = project.setStudents(students, { transaction })
          let p2 = project.setCotutors(cotutors, { transaction })
          let p3 = project.setDepartments(departments, { transaction })
          let p4 = ProjectHistory.create({
            project_id: project.dataValues.id,
            created_by: creatorId,
            state_id: project.dataValues.state_id
          }, { transaction })
          let p5 = ProjectRequestTutor.create({
            project_id: project.dataValues.id,
            user_id: tutorId,
            status: STATUS_REQUEST.PENDING,
            type: TYPE_TUTOR_REQUEST.TUTOR
          }, { transaction })
          let p6 = students.map(student => {
            return ProjectRequestStudent.create({
              project_id: project.dataValues.id,
              user_id: student,
              status: STATUS_REQUEST.PENDING
            }, { transaction })
          })
          let p7 = cotutors.map(cotutor => {
            return ProjectRequestTutor.create({
              project_id: project.dataValues.id,
              user_id: cotutor,
              status: STATUS_REQUEST.PENDING,
              type: TYPE_TUTOR_REQUEST.COTUTOR
            }, { transaction })
          })
          return Promise.all([p1, p2, p3, p4, p5, p6, p7])
        })
    })
      .then(() => {
        return projectId
      })
  }

  static existProjectType (type) {
    return ProjectType.count({
      where: { id: type }
    })
      .then(count => {
        if (count > 0) {
          return true
        }
        return false
      })
  }

  static existProject (id) {
    return Project.count({
      where: { id }
    })
      .then(count => {
        if (count > 0) {
          return true
        }
        return false
      })
  }

  static edit (creatorId, projectId, name, type, description, students, tutorId, cotutors, departments) {
    return sequelize.transaction(transaction => {
      return Project.findByPk(projectId, { transaction })
        .then(project => {
          let p1 = ProjectRequestStudent.destroy({
            where: { project_id: project.dataValues.id }, transaction
          })
          let p2 = ProjectRequestTutor.destroy({
            where: { project_id: project.dataValues.id }, transaction
          })
          return Promise.all([p1, p2]).then(() => {
            let p1 = project.setStudents(students, { transaction })
            let p2 = project.setCotutors(cotutors, { transaction })
            let p3 = project.setDepartments(departments, { transaction })
            let p4 = Project.update(
              { name, description, creator_id: creatorId, tutor_id: tutorId, type_id: type },
              { where: { id: projectId }, transaction }
            )
            let p5 = ProjectRequestTutor.create({
              project_id: project.dataValues.id,
              user_id: tutorId,
              status: STATUS_REQUEST.PENDING,
              type: TYPE_TUTOR_REQUEST.TUTOR
            }, { transaction })
            let p6 = students.map(student => {
              return ProjectRequestStudent.create({
                project_id: project.dataValues.id,
                user_id: student,
                status: STATUS_REQUEST.PENDING
              }, { transaction })
            })
            let p7 = cotutors.map(cotutor => {
              return ProjectRequestTutor.create({
                project_id: project.dataValues.id,
                user_id: cotutor,
                status: STATUS_REQUEST.PENDING,
                type: TYPE_TUTOR_REQUEST.COTUTOR
              }, { transaction })
            })
            return Promise.all([p1, p2, p3, p4, p5, p6, p7])
          })
        })
    })
      .then(() => {
        return projectId
      })
  }

  static deleteProjectById (id) {
    return Project.destroy({
      where: { id }
    })
      .then(() => {
        return id
      })
  }

  static creatorHasProject (creatorId) {
    return Project.findOne({ where: { creator_id: creatorId } })
      .then(project => {
        return project != null
      })
  }
}

export default ProjectRepository
