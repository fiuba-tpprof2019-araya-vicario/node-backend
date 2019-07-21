import { getServiceError } from '../util/error'
import ProjectRepository from './projectRepository'
import UserRepository from '../user/userRepository'

const getSpecificProject = async (projectId) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.getProjectById(projectId)
      .then(project => {
        console.log(project.dataValues.TutorRequests)
        return resolve(project)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const getAllStudentProjects = async (userId) => {
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

const getAllTutorProjects = async (userId) => {
  return new Promise(async (resolve, reject) => {
    return UserRepository.getTutorProjects(userId)
      .then(projects => {
        return resolve(projects)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const addProject = async (creatorId, name, type, description, students, tutorId, cotutors) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.create(creatorId, name, type, description, students, tutorId, cotutors)
      .then(projectId => {
        if (projectId == null) return reject(getServiceError())
        return resolve(projectId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const editProject = async (creatorId, projectId, name, type, description, students, tutorId, cotutors) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.edit(creatorId, projectId, name, type, description, students, tutorId, cotutors)
      .then(projectId => {
        if (projectId == null) return reject(getServiceError())
        return resolve(projectId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

module.exports = { addProject, getSpecificProject, getAllStudentProjects, getAllTutorProjects, editProject }
