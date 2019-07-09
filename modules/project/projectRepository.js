const Project = require('../../db/models').Project
const ProjectType = require('../../db/models').ProjectType
const User = require('../../db/models').User

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

  static getByUser (userId) {
    return Project.findAll({
      include: [{
        model: User,
        as: 'Students',
        attributes: {
          exclude: ['google_id']
        },
        where: {
          id: userId
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
}

export default ProjectRepository
