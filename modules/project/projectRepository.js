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
        through: { attributes: [] }
      },
      {
        model: User,
        as: 'Tutors',
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

  static async create (creatorId, name, type, description, students, tutorId, cotutors) {
    try {
      let project = await ProjectRepository.createProject(name, type, description)
      let p1 = project.addStudent(creatorId, { through: { student_type: 'Creador' } })
      let p2 = project.addStudents(students, { through: { student_type: 'Integrante' } })
      let p3 = project.addTutor(tutorId, { through: { tutor_type: 'Tutor' } })
      let p4 = project.addTutors(cotutors, { through: { tutor_type: 'Co-tutor' } })
      let p5 = ProjectRepository.registerProjectState(project.dataValues.id, creatorId, project.dataValues.state_id)
      await Promise.all([p1, p2, p3, p4, p5])
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

  static async edit (creatorId, projectId, name, type, description, students, tutorId, cotutors) {
    try {
      let project = await Project.findByPk(projectId)
      await project.setStudents([creatorId], { through: { student_type: 'Creador' } })
      await project.setTutors([tutorId], { through: { tutor_type: 'Tutor' } })
      let p1 = project.addStudents(students, { through: { student_type: 'Integrante' } })
      let p2 = project.addTutors(cotutors, { through: { tutor_type: 'Co-tutor' } })
      let p3 = Project.update(
        { name, description, type_id: type },
        { where: { id: projectId } }
      )
      await Promise.all([p1, p2, p3])
      return project.dataValues.id
    } catch (e) {
      return null
    }
  }
}
export default ProjectRepository
