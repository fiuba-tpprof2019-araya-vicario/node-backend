import { sequelize } from '../../db/connectorDB'
import { getBadRequest } from '../util/error'
import { Op } from 'sequelize'

const Project = require('../../db/models').Project
const ProjectType = require('../../db/models').ProjectType
const User = require('../../db/models').User
const ProjectHistory = require('../../db/models').ProjectHistory
const State = require('../../db/models').State
const ProjectRequestTutor = require('../../db/models').ProjectRequestTutor
const ProjectRequestStudent = require('../../db/models').ProjectRequestStudent
const Requirement = require('../../db/models').Requirement
const Career = require('../../db/models').Career

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
        model: Career,
        as: 'Careers',
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

  static async createWithRequirement (creatorId, data) {
    let requirement = await Requirement.findOne(
      {
        where: {
          id: data.requirement_id,
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
        type_id: data.type_id,
        state_id: STATE_ID_START,
        requirement_id: data.requirement_id
      }, { transaction })
        .then(project => {
          projectId = project.dataValues.id
          let p1 = project.setStudents(data.students, { transaction })
          let p2 = project.setCotutors(data.cotutors, { transaction })
          let p3 = project.setCareers(data.careers, { transaction })
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
          let p6 = data.students.map(student => {
            return ProjectRequestStudent.create({
              project_id: project.dataValues.id,
              user_id: student,
              status: STATUS_REQUEST.PENDING
            }, { transaction })
          })
          let p7 = data.cotutors.map(cotutor => {
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

  static create (creatorId, data) {
    let projectId
    return sequelize.transaction(transaction => {
      return Project.create({
        name: data.name,
        description: data.description,
        creator_id: creatorId,
        tutor_id: data.tutorId,
        type_id: data.type_id,
        state_id: STATE_ID_START
      }, { transaction })
        .then(project => {
          projectId = project.dataValues.id
          let p1 = project.setStudents(data.students, { transaction })
          let p2 = project.setCotutors(data.cotutors, { transaction })
          let p3 = project.setCareers(data.careers, { transaction })
          let p4 = ProjectHistory.create({
            project_id: project.dataValues.id,
            created_by: creatorId,
            state_id: project.dataValues.state_id
          }, { transaction })
          let p5 = ProjectRequestTutor.create({
            project_id: project.dataValues.id,
            user_id: data.tutorId,
            status: STATUS_REQUEST.PENDING,
            type: TYPE_TUTOR_REQUEST.TUTOR
          }, { transaction })
          let p6 = data.students.map(student => {
            return ProjectRequestStudent.create({
              project_id: project.dataValues.id,
              user_id: student,
              status: STATUS_REQUEST.PENDING
            }, { transaction })
          })
          let p7 = data.cotutors.map(cotutor => {
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

  static edit (creatorId, projectId, data) {
    console.log(data)
    console.log(data.students !== undefined)
    return sequelize.transaction(transaction => {
      return Project.findByPk(projectId, { transaction })
        .then(project => {
          let requestDeletePromise = []
          if (data.students !== undefined) {
            let p1 = ProjectRequestStudent.destroy({
              where: { project_id: project.dataValues.id }, transaction
            })
            requestDeletePromise.push(p1)
          }

          if (data.cotutors !== undefined) {
            let p1 = ProjectRequestTutor.destroy({
              where: { [Op.and]: { project_id: project.dataValues.id, user_id: { [Op.ne]: project.dataValues.tutor_id } } }, transaction
            })
            requestDeletePromise.push(p1)
          }

          if (data.tutor_id !== undefined) {
            let p1 = ProjectRequestTutor.destroy({
              where: { [Op.and]: { project_id: project.dataValues.id, user_id: project.dataValues.tutor_id } }, transaction
            })
            requestDeletePromise.push(p1)
          }

          return Promise.all(requestDeletePromise).then(() => {
            let updatePromises = []

            let updateObject = {}
            if (data.name !== undefined) updateObject.name = data.name
            if (data.description !== undefined) updateObject.description = data.description
            if (data.tutor_id !== undefined) updateObject.tutor_id = data.tutor_id
            if (data.type_id !== undefined) updateObject.type_id = data.type_id
            if (data.proposal_url !== undefined) updateObject.proposal_url = data.proposal_url

            if (Object.keys(updateObject).length > 0) {
              let p1 = Project.update(
                updateObject,
                { where: { id: projectId }, transaction }
              )
              updatePromises.push(p1)
            }

            if (data.students !== undefined) {
              let p1 = project.setStudents(data.students, { transaction })
              let p2 = data.students.map(student => {
                return ProjectRequestStudent.create({
                  project_id: project.dataValues.id,
                  user_id: student,
                  status: STATUS_REQUEST.PENDING
                }, { transaction })
              })
              updatePromises = [...updatePromises, p1, ...p2]
            }

            if (data.cotutors !== undefined) {
              let p1 = project.setCotutors(data.cotutors, { transaction })
              let p2 = data.cotutors.map(cotutor => {
                return ProjectRequestTutor.create({
                  project_id: project.dataValues.id,
                  user_id: cotutor,
                  status: STATUS_REQUEST.PENDING,
                  type: TYPE_TUTOR_REQUEST.COTUTOR
                }, { transaction })
              })
              updatePromises = [...updatePromises, p1, ...p2]
            }

            if (data.tutor_id !== undefined) {
              let p1 = ProjectRequestTutor.create({
                project_id: project.dataValues.id,
                user_id: data.tutorId,
                status: STATUS_REQUEST.PENDING,
                type: TYPE_TUTOR_REQUEST.TUTOR
              }, { transaction })
              updatePromises.push(p1)
            }

            if (data.careers !== undefined) {
              let p1 = project.setCareers(data.careers, { transaction })
              updatePromises.push(p1)
            }

            return Promise.all(updatePromises)
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

  static deleteParticipantProject (projectId, userId) {
    return sequelize.transaction(transaction => {
      return Project.findByPk(projectId, { transaction })
        .then(project => {
          let p1 = project.removeStudent(userId, { transaction })
          let p2 = ProjectRequestStudent.destroy({ where: { project_id: projectId, user_id: userId } })
          return Promise.all([p1, p2])
        })
    })
      .then(() => {
        return projectId
      })
  }

  static deleteCotutorProject (projectId, userId) {
    return sequelize.transaction(transaction => {
      return Project.findByPk(projectId, { transaction })
        .then(project => {
          let p1 = project.removeCotutor(userId, { transaction })
          let p2 = ProjectRequestTutor.destroy({ where: { project_id: projectId, user_id: userId } })
          return Promise.all([p1, p2])
        })
    })
      .then(() => {
        return projectId
      })
  }

  static deleteTutorProject (projectId, userId) {
    return sequelize.transaction(transaction => {
      return Project.findByPk(projectId, { transaction })
        .then(project => {
          let p1 = project.setTutor(null, { transaction })
          let p2 = Project.update(
            { state_id: STATE_ID_START },
            { where: { id: projectId }, transaction }
          )
          let p3 = ProjectRequestTutor.destroy({ where: { project_id: projectId, user_id: userId } })
          return Promise.all([p1, p2, p3])
        })
    })
      .then(() => {
        return projectId
      })
  }

  static creatorHasProject (creatorId) {
    return Project.findOne({ where: { creator_id: creatorId } })
      .then(project => {
        return project != null
      })
  }

  static isProjectCreator (projectId, creatorId) {
    return Project.findOne({ where: { id: projectId }, include: [{ model: User, as: 'Creator', where: { id: creatorId } }] })
      .then(project => {
        return project != null
      })
  }

  static isProjectTutor (projectId, tutorId) {
    return Project.findOne({ where: { id: projectId }, include: [{ model: User, as: 'Tutor', where: { id: tutorId } }] })
      .then(project => {
        return project != null
      })
  }
}

export default ProjectRepository
