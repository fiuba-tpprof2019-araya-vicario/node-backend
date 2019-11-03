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
const ProjectCareer = require('../../db/models').ProjectCareer
const Career = require('../../db/models').Career
const ProjectTypeTransaction = require('../../db/models').ProjectTypeTransaction
const Presentation = require('../../db/models').Presentation

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

const getWhereForCommissionProjects = (filter) => {
  let whereCondition = {}
  if (filter.approved != null) whereCondition.state_id = { [Op.gte]: State.getMinStateApproveCommission() }
  else whereCondition.state_id = State.pendingRevision()
  return whereCondition
}

const getWhereForProjects = (filter) => {
  let whereCondition = {}
  if (filter.state != null) whereCondition.state_id = filter.state
  return whereCondition
}

const getIncludeCommissionProjectsData = (careersId, filter) => {
  let careers
  if (filter.career != null && careersId.includes(parseInt(filter.career))) careers = [parseInt(filter.career)]
  else careers = careersId

  return [{
    model: User,
    as: 'Creator',
    attributes: { exclude: ['google_id'] }
  },
  {
    model: User,
    as: 'Tutor',
    attributes: { exclude: ['google_id'] }
  },
  {
    model: User,
    as: 'Students',
    attributes: { exclude: ['google_id'] },
    through: { attributes: [] }
  },
  {
    model: User,
    as: 'Cotutors',
    attributes: { exclude: ['google_id'] },
    through: { attributes: [] }
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
    model: Presentation,
    as: 'Presentation'
  },
  {
    model: Requirement,
    as: 'Requirement'
  },
  {
    model: ProjectCareer,
    required: true,
    include: [
      { model: Career, required: true, where: { id: { [Op.in]: careers } } },
      { model: User, as: 'Judge', attributes: { exclude: ['google_id'] } }]
  }]
}

const getFullIncludeProjectsData = () => {
  return [{
    model: User,
    as: 'Creator',
    attributes: { exclude: ['google_id'] }
  },
  {
    model: User,
    as: 'Tutor',
    attributes: { exclude: ['google_id'] }
  },
  {
    model: User,
    as: 'Students',
    attributes: { exclude: ['google_id'] },
    through: { attributes: [] }
  },
  {
    model: User,
    as: 'Cotutors',
    attributes: { exclude: ['google_id'] },
    through: { attributes: [] }
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
    model: Presentation,
    as: 'Presentation'
  },
  {
    model: Requirement,
    as: 'Requirement'
  },
  {
    model: ProjectCareer,
    include: [{ model: Career }, { model: User, as: 'Judge', attributes: { exclude: ['google_id'] } }]
  }]
}

const getFullIncludeProjectData = (id) => {
  return [{
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
    model: Presentation,
    as: 'Presentation'
  },
  {
    model: Requirement,
    as: 'Requirement'
  },
  {
    model: ProjectCareer,
    include: [{ model: Career }, { model: User, as: 'Judge', attributes: { exclude: ['google_id'] } }]
  }]
}

class ProjectRepository {
  static getProjectFullById (id) {
    return Project.findByPk(id, { include: getFullIncludeProjectData(id) })
  }

  static getProjectById (id) {
    return Project.findByPk(id)
  }

  static getProjectByRequestStudentId (requestId) {
    return Project.findOne({ include: [{ model: ProjectRequestStudent, as: 'StudentRequests', required: true, where: { id: requestId } }] })
  }

  static getProjectByRequestTutorId (requestId) {
    return Project.findOne({ include: [{ model: ProjectRequestTutor, as: 'TutorRequests', required: true, where: { id: requestId } }] })
  }

  static getProjects (filter) {
    return Project.findAll({ include: getFullIncludeProjectsData(), where: getWhereForProjects(filter) })
  }

  static getCommissionProjects (careersId, filter) {
    return Project.findAll({ include: getIncludeCommissionProjectsData(careersId, filter), where: getWhereForCommissionProjects(filter) })
  }

  static getProjectsTypes () {
    return ProjectType.findAll()
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
    console.log('ProjectRepository::createWithRequirement ', creatorId, data)
    let requirement = await Requirement.findOne(
      {
        where: {
          id: data.requirement_id,
          status: 'inactive'
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
        name: data.name,
        description: data.description,
        creator_id: creatorId,
        tutor_id: data.tutor_id,
        type_id: data.type_id,
        state_id: STATE_ID_START,
        requirement_id: data.requirement_id
      }, { transaction })
        .then(project => {
          projectId = project.dataValues.id
          let p1 = project.setStudents(data.students, { transaction })
          let p2 = project.setCotutors(data.cotutors, { transaction })
          let p3 = data.careers.map(career => {
            return ProjectCareer.create({
              project_id: project.dataValues.id,
              career_id: career,
              status: STATUS_REQUEST.PENDING
            }, { transaction })
          })
          let p4 = ProjectHistory.create({
            project_id: project.dataValues.id,
            created_by: creatorId,
            state_id: project.dataValues.state_id
          }, { transaction })
          let p5 = ProjectRequestTutor.create({
            project_id: project.dataValues.id,
            user_id: data.tutor_id,
            status: STATUS_REQUEST.PENDING,
            accepted_proposal: STATUS_REQUEST.PENDING,
            type: TYPE_TUTOR_REQUEST.TUTOR
          }, { transaction })
          let p6 = data.students.map(student => {
            return ProjectRequestStudent.create({
              project_id: project.dataValues.id,
              user_id: student,
              status: STATUS_REQUEST.PENDING,
              accepted_proposal: STATUS_REQUEST.PENDING
            }, { transaction })
          })
          let p7 = data.cotutors.map(cotutor => {
            return ProjectRequestTutor.create({
              project_id: project.dataValues.id,
              user_id: cotutor,
              status: STATUS_REQUEST.PENDING,
              accepted_proposal: STATUS_REQUEST.PENDING,
              type: TYPE_TUTOR_REQUEST.COTUTOR
            }, { transaction })
          })
          let p8 = Requirement.update({ status: 'active' }, { where: { id: data.requirement_id }, transaction })
          return Promise.all([p1, p2, p3, p4, p5, p6, p7, p8])
        })
    })
      .then(() => {
        return projectId
      })
  }

  static create (creatorId, data) {
    console.log('projectRepository::create ', creatorId, data)
    let projectId
    return sequelize.transaction(transaction => {
      return Project.create({
        name: data.name,
        description: data.description,
        creator_id: creatorId,
        tutor_id: data.tutor_id,
        type_id: data.type_id,
        state_id: STATE_ID_START
      }, { transaction })
        .then(project => {
          projectId = project.dataValues.id
          let p1 = project.setStudents(data.students, { transaction })
          let p2 = project.setCotutors(data.cotutors, { transaction })
          let p3 = data.careers.map(career => {
            return ProjectCareer.create({
              project_id: project.dataValues.id,
              career_id: career,
              status: STATUS_REQUEST.PENDING
            }, { transaction })
          })
          let p4 = ProjectHistory.create({
            project_id: project.dataValues.id,
            created_by: creatorId,
            state_id: project.dataValues.state_id
          }, { transaction })
          let p5 = ProjectRequestTutor.create({
            project_id: project.dataValues.id,
            user_id: data.tutor_id,
            status: STATUS_REQUEST.PENDING,
            accepted_proposal: STATUS_REQUEST.PENDING,
            type: TYPE_TUTOR_REQUEST.TUTOR
          }, { transaction })
          let p6 = data.students.map(student => {
            return ProjectRequestStudent.create({
              project_id: project.dataValues.id,
              user_id: student,
              status: STATUS_REQUEST.PENDING,
              accepted_proposal: STATUS_REQUEST.PENDING
            }, { transaction })
          })
          let p7 = data.cotutors.map(cotutor => {
            return ProjectRequestTutor.create({
              project_id: project.dataValues.id,
              user_id: cotutor,
              status: STATUS_REQUEST.PENDING,
              accepted_proposal: STATUS_REQUEST.PENDING,
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

  static edit (projectId, data) {
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

          if (data.tutor_id !== undefined && data.tutor_id !== project.dataValues.tutor_id) {
            let p1 = ProjectRequestTutor.destroy({
              where: { [Op.and]: { project_id: project.dataValues.id, user_id: project.dataValues.tutor_id } }, transaction
            })
            requestDeletePromise.push(p1)
          }

          if (data.careers !== undefined) {
            let p1 = ProjectCareer.destroy({
              where: { [Op.and]: { project_id: project.dataValues.id } }, transaction
            })
            requestDeletePromise.push(p1)
          }

          return Promise.all(requestDeletePromise).then(() => {
            let updatePromises = []

            let updateObject = {}
            if (data.tutor_id !== undefined && data.tutor_id !== project.dataValues.tutor_id) updateObject.state_id = STATE_ID_START
            if (data.name !== undefined) updateObject.name = data.name
            if (data.description !== undefined) updateObject.description = data.description
            if (data.tutor_id !== undefined) updateObject.tutor_id = data.tutor_id
            if (data.type_id !== undefined) updateObject.type_id = data.type_id

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
                  status: STATUS_REQUEST.PENDING,
                  accepted_proposal: STATUS_REQUEST.PENDING
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
                  accepted_proposal: STATUS_REQUEST.PENDING,
                  type: TYPE_TUTOR_REQUEST.COTUTOR
                }, { transaction })
              })
              updatePromises = [...updatePromises, p1, ...p2]
            }

            if (data.tutor_id !== undefined && data.tutor_id !== project.dataValues.tutor_id) {
              let p1 = ProjectRequestTutor.create({
                project_id: project.dataValues.id,
                user_id: data.tutor_id,
                status: STATUS_REQUEST.PENDING,
                accepted_proposal: STATUS_REQUEST.PENDING,
                type: TYPE_TUTOR_REQUEST.TUTOR
              }, { transaction })
              updatePromises.push(p1)
            }

            if (data.careers !== undefined) {
              let p1 = data.careers.map(career => {
                return ProjectCareer.create({
                  project_id: project.dataValues.id,
                  career_id: career,
                  status: STATUS_REQUEST.PENDING
                }, { transaction })
              })
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

  static canAcceptProposalRequestTutor (requestId) {
    return Project.findOne({
      where: { proposal_url: { [Op.ne]: null } },
      include: [{ model: ProjectRequestTutor, as: 'TutorRequests', required: true, where: { id: requestId } }]
    })
      .then(project => {
        return project != null
      })
  }

  static canAcceptProposalRequestStudent (requestId) {
    return Project.findOne({
      where: { proposal_url: { [Op.ne]: null } },
      include: [{ model: ProjectRequestStudent, as: 'StudentRequests', required: true, where: { id: requestId } }]
    })
      .then(project => {
        return project != null
      })
  }

  static updateProposal (projectId, driveId, link, name) {
    return Project.update(
      { proposal_drive_id: driveId, proposal_url: link, proposal_name: name },
      { where: { id: projectId } }
    )
  }

  static async hasAllRequestAcceptedProposal (projectId) {
    console.log('ProjectRepository::hasAllRequestAcceptedProposal')
    let project = await Project.findOne({
      where: { id: projectId },
      include: [{
        model: ProjectRequestStudent,
        as: 'StudentRequests',
        required: true,
        where: { accepted_proposal: { [Op.ne]: 'accepted' } }
      }]
    })

    if (project != null) return false

    project = await Project.findOne({
      where: { id: projectId },
      include: [{
        model: ProjectRequestTutor,
        as: 'TutorRequests',
        required: true,
        where: { accepted_proposal: { [Op.ne]: 'accepted' } }
      }]
    })

    return project == null
  }

  static async updateNextState (project) {
    let projectTypeState = await ProjectTypeTransaction.findOne({
      where: {
        project_type: project.dataValues.type_id,
        primary_state: project.dataValues.state_id
      }
    })
    if (projectTypeState == null) return Promise.reject(getBadRequest())
    return Project.update(
      { state_id: projectTypeState.dataValues.secondary_state },
      { where: { id: project.dataValues.id } }
    )
  }

  static canEvaluateProject (projectId, carrerId) {
    return Project.findOne({
      attributes: ['id'],
      where: { proposal_url: { [Op.ne]: null }, state_id: State.pendingRevision(), id: parseInt(projectId) },
      include: {
        model: ProjectCareer,
        required: true,
        attributes: [],
        where: {
          career_id: carrerId
        }
      }
    })
      .then(project => {
        return project != null
      })
  }

  static approveProjectCareer (projectId, careerId, judgeId) {
    return ProjectCareer.update(
      { status: STATUS_REQUEST.ACCEPTED, judge_id: judgeId },
      { where: { project_id: projectId, career_id: careerId } }
    )
  }

  static async approveProject (projectId) {
    let project = await Project.findByPk(projectId)
    let projectTypeState = await ProjectTypeTransaction.findOne({
      where: {
        project_type: project.dataValues.type_id,
        primary_state: project.dataValues.state_id
      }
    })
    if (projectTypeState == null) return Promise.reject(getBadRequest())
    return Project.update(
      { state_id: projectTypeState.dataValues.secondary_state },
      { where: { id: projectId } }
    )
  }

  static hasAllCareerEvaluationAccepted (projectId) {
    return Project.findByPk(projectId, {
      include: {
        model: ProjectCareer,
        required: true,
        attributes: [],
        where: { status: { [Op.ne]: 'accepted' } }
      }
    })
      .then(project => {
        return project == null
      })
  }

  static hasAllCareerEvaluated (projectId) {
    return Project.findByPk(projectId, {
      include: {
        model: ProjectCareer,
        required: true,
        attributes: [],
        where: { status: { [Op.eq]: 'pending' } }
      }
    })
      .then(project => {
        return project == null
      })
  }

  static async setProjectStateBefore (projectId) {
    let project = await Project.findByPk(projectId)
    let projectTypeState = await ProjectTypeTransaction.findOne({
      where: {
        project_type: project.dataValues.type_id,
        secondary_state: project.dataValues.state_id
      }
    })
    if (projectTypeState == null) return Promise.reject(getBadRequest())
    return Project.update(
      { state_id: projectTypeState.dataValues.primary_state },
      { where: { id: projectId } }
    )
  }

  static async setProjectStateAfter (projectId) {
    let project = await Project.findByPk(projectId)
    let projectTypeState = await ProjectTypeTransaction.findOne({
      where: {
        project_type: project.dataValues.type_id,
        primary_state: project.dataValues.state_id
      }
    })
    if (projectTypeState == null) return Promise.reject(getBadRequest())
    return Project.update(
      { state_id: projectTypeState.dataValues.secondary_state },
      { where: { id: projectId } }
    )
  }

  static async rejectProjectCareer (projectId, careerId, judgeId, rejectReason) {
    return ProjectCareer.update(
      { status: STATUS_REQUEST.REJECTED, judge_id: judgeId, reject_reason: rejectReason },
      { where: { project_id: projectId, career_id: careerId } }
    )
  }

  static async sendProjectRevision (projectId) {
    await ProjectCareer.update(
      { status: STATUS_REQUEST.PENDING, reject_reason: null, judge_id: null },
      { where: { project_id: projectId } }
    )
    return ProjectRepository.setProjectStateAfter(projectId)
  }

  static canCreatePresentation (id) {
    return Project.findByPk(id, { where: { state_id: State.pendingPresentation() } })
      .then(project => {
        return project != null
      })
  }

  static async createPresentation (projectId) {
    let presentation = await Presentation.create({ status: 'created' })
    let result = await Project.update(
      { presentation_id: presentation.dataValues.id },
      { where: { id: projectId } })
    return projectId
  }
}

export default ProjectRepository
