import { getServiceError } from '../util/error'
import ProjectRepository from './projectRepository'

const getProjects = async (userId) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.getByUser(userId)
      .then(projects => {
        console.log(projects)
        return resolve(projects)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const addProject = async (creatorId, name, type, description, students, tutors) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.create(creatorId, name, type, description, students, tutors)
      .then(project => {
        if (project == null) return reject(getServiceError())
        return resolve(project)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

module.exports = { addProject, getProjects }
