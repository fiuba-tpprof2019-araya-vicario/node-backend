import { getServiceError } from '../util/error'
import ProjectRepository from './projectRepository'
import UserRepository from '../user/userRepository'

const getProjects = async (userId) => {
  return new Promise(async (resolve, reject) => {
    return UserRepository.getStudentProjects(userId)
      .then(projects => {
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
      .then(projectId => {
        if (projectId == null) return reject(getServiceError())
        return resolve(projectId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

module.exports = { addProject, getProjects }
