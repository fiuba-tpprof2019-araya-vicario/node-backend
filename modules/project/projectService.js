import { getServiceError, getNotFound, getBadRequest } from '../util/error'
import ProjectRepository from './projectRepository'
import UserRepository from '../user/userRepository'

const getSpecificProject = async (projectId) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.getProjectById(projectId)
      .then(project => {
        if (project == null) return reject(getNotFound())
        else return resolve(project)
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

const addProject = async (creatorId, data) => {
  if (await ProjectRepository.creatorHasProject(creatorId)) return Promise.reject(getBadRequest())

  return new Promise(async (resolve, reject) => {
    return ProjectRepository.create(creatorId, data)
      .then(projectId => {
        return resolve(projectId)
      })
      .catch(() => {
        return reject(getBadRequest())
      })
  })
}

const addProjectWithRequirement = async (creatorId, data) => {
  if (await ProjectRepository.creatorHasProject(creatorId)) return Promise.reject(getBadRequest())

  return new Promise(async (resolve, reject) => {
    return ProjectRepository.createWithRequirement(creatorId, data)
      .then(projectId => {
        return resolve(projectId)
      })
      .catch(() => {
        return reject(getBadRequest())
      })
  })
}

const editProject = async (creatorId, projectId, data) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.edit(creatorId, projectId, data)
      .then(projectId => {
        return resolve(projectId)
      })
      .catch(() => {
        return reject(getBadRequest())
      })
  })
}

const removeProject = async (projectId) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.deleteProjectById(projectId)
      .then(projectId => {
        return resolve(projectId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const removeStudentProject = async (projectId, userId) => {
  if (!(await ProjectRepository.existProject(projectId))) return Promise.reject(getBadRequest('No existe el proyecto'))
  if (await ProjectRepository.isProjectCreator(projectId, userId)) return removeCreatorProject(projectId, userId)
  return removeParticipantProject(projectId, userId)
}

const removeParticipantProject = async (projectId, userId) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.deleteParticipantProject(projectId, userId)
      .then(projectId => {
        return resolve(projectId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const removeCreatorProject = async (projectId, userId) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.deleteProjectById(projectId)
      .then(projectId => {
        return resolve(projectId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const removeTutorProject = async (projectId, userId) => {
  if (!(await ProjectRepository.existProject(projectId))) return Promise.reject(getBadRequest('No existe el proyecto'))
  if (await ProjectRepository.isProjectTutor(projectId, userId)) return _removeTutorProject(projectId, userId)
  return removeCotutorProject(projectId, userId)
}

const _removeTutorProject = async (projectId, userId) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.deleteTutorProject(projectId, userId)
      .then(projectId => {
        return resolve(projectId)
      })
      .catch((e) => {
        console.error(e)
        return reject(getServiceError())
      })
  })
}

const removeCotutorProject = async (projectId, userId) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.deleteCotutorProject(projectId, userId)
      .then(projectId => {
        return resolve(projectId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

module.exports = { addProject, getSpecificProject, getAllStudentProjects, getAllTutorProjects, editProject, removeProject, addProjectWithRequirement, removeStudentProject, removeTutorProject }
