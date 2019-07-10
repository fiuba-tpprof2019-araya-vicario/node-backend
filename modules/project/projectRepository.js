const Project = require('../../db/models').Project
const ProjectType = require('../../db/models').ProjectType
const User = require('../../db/models').User
const ProjectHistory = require('../../db/models').ProjectHistory

const STATE_ID_START = 1

class ProjectRepository {
  static get (id) {
    return Project.findByPk(id, {
      include: [{
        model: User,
        as: 'Students',
        attributes: {
          exclude: ['google_id']
        }
      },
      {
        model: User,
        as: 'Tutors',
        attributes: {
          exclude: ['google_id']
        }
      },
      {
        model: ProjectType,
        as: 'Type'
      }]
    })
  }

  static createProject (name, type, description) {
    return Project.create({
      name: name,
      description: description,
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

  static async create (creatorId, name, type, description, students, tutors) {
    try {
      let project = await ProjectRepository.createProject(name, type, description)
      let p1 = project.addStudent(creatorId, { through: { student_type: 'Creador' } })
      let p2 = project.addStudents(students, { through: { student_type: 'Integrante' } })
      let p3 = project.addTutors(tutors, { through: { tutor_type: 'Tutor' } })
      let p4 = ProjectRepository.registerProjectState(project.dataValues.id, creatorId, project.dataValues.state_id)
      await Promise.all([p1, p2, p3, p4])
      return project.dataValues.id
    } catch (e) {
      return null
    }
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
}

export default ProjectRepository
