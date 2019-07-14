import { sequelize } from '../../db/connectorDB'
import Sequelize from 'sequelize'
import _ from 'lodash'

const Project = require('../../db/models').Project
const ProjectType = require('../../db/models').ProjectType
const User = require('../../db/models').User
const ProjectHistory = require('../../db/models').ProjectHistory
const State = require('../../db/models').State

const STATE_ID_START = 1

class ProjectRepository {
  static getProjectById (id) {
    return Project.findByPk(id, {
      include: [{
        model: User,
        as: 'Students',
        attributes: { exclude: ['google_id'] },
        through: { attributes: ['student_type'] }
      },
      {
        model: User,
        as: 'Tutors',
        attributes: { exclude: ['google_id'] },
        through: { attributes: ['tutor_type'] }
      },
      {
        model: ProjectType,
        as: 'Type'
      },
      {
        model: State,
        as: 'State'
      }]
    }).then(project => {
      console.log(project)
      console.log(project.dataValues.Students[0])
      project.dataValues.creator = _.remove(
        project.dataValues.Students,
        student => {
          return student.dataValues.ProjectStudent.dataValues.student_type === 'Creador'
        }).pop()

      project.dataValues.tutor = _.remove(
        project.dataValues.Tutors,
        tutor => {
          return tutor.dataValues.ProjectTutor.dataValues.tutor_type === 'Tutor'
        }).pop()

      return project
      // project.creator = _.remove(project.dataValues.Students, student => return student.dataValues)
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

  static create (creatorId, name, type, description, students, tutorId, cotutors) {
    let projectId
    return sequelize.transaction(transaction => {
      return Project.create({
        name,
        description,
        type_id: type,
        state_id: STATE_ID_START
      }, { transaction })
        .then(project => {
          projectId = project.dataValues.id
          let p1 = project.addStudent(creatorId, { through: { student_type: 'Creador' }, transaction })
          let p2 = project.addStudents(students, { through: { student_type: 'Integrante' }, transaction })
          let p3 = project.addTutor(tutorId, { through: { tutor_type: 'Tutor' }, transaction })
          let p4 = project.addTutors(cotutors, { through: { tutor_type: 'Co-tutor' }, transaction })
          let p5 = ProjectHistory.create({
            project_id: project.dataValues.id,
            created_by: creatorId,
            state_id: project.dataValues.state_id
          }, { transaction })
          return Promise.all([p1, p2, p3, p4, p5])
        })
        .then(result => {
          return projectId
        }).catch(() => {
          return null
        })
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

  static edit (creatorId, projectId, name, type, description, students, tutorId, cotutors) {
    return sequelize.transaction(transaction => {
      return Project.findByPk(projectId, { transaction })
        .then(project => {
          let p1 = project.setStudents([creatorId], { through: { student_type: 'Creador' }, transaction })
          let p2 = project.setTutors([tutorId], { through: { tutor_type: 'Tutor' }, transaction })
          let p3 = Project.update(
            { name, description, type_id: type },
            { where: { id: projectId }, transaction }
          )
          return Promise.all([p1, p2, p3]).then(() => {
            let p1 = project.addStudents(students, { through: { student_type: 'Integrante' }, transaction })
            let p2 = project.addTutors(cotutors, { through: { tutor_type: 'Co-tutor' }, transaction })
            return Promise.all([p1, p2])
          })
        })
        .then(() => {
          return projectId
        }).catch(() => {
          return null
        })
    })
  }
}

export default ProjectRepository
