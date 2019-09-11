import { getServiceError, getNotFound, getBadRequest } from '../util/error'
import ProjectRepository from './projectRepository'
import UserRepository from '../user/userRepository'
import { sendMail } from '../util/mailService'
import { getRequestStudentMailOption, getRequestTutorMailOption, getRequestCotutorMailOption } from '../util/mailUtils'

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

const sendRequestMails = (data) => {
  console.log('Active mails: ', process.env.ACTIVE_MAILS)
  if (process.env.ACTIVE_MAILS !== 'true') return
  console.log('Entro proceso de envio de mails de solicitudes...')
  if (data.students !== undefined && data.students.length > 0) {
    UserRepository.getUsers(data.students)
      .then(students => {
        let to = ''
        students.forEach(student => {
          to += student.email + ', '
        })
        sendMail(getRequestStudentMailOption({ name: data.name, to }))
      })
  }

  if (data.cotutors !== undefined && data.cotutors.length > 0) {
    UserRepository.getUsers(data.cotutors)
      .then(cotutors => {
        let to = ''
        cotutors.forEach(student => {
          to += student.email + ', '
        })
        sendMail(getRequestCotutorMailOption({ name: data.name, to }))
      })
  }

  if (data.tutor_id !== undefined) {
    UserRepository.getUser(data.tutor_id)
      .then(tutor => {
        sendMail(getRequestTutorMailOption({ name: data.name, to: tutor.email }))
      })
  }
}

const addProject = async (creatorId, data) => {
  if (await ProjectRepository.creatorHasProject(creatorId)) return Promise.reject(getBadRequest())

  let response = await ProjectRepository.create(creatorId, data)
  if (response === undefined) return Promise.reject(getBadRequest())

  sendRequestMails(data)

  return Promise.resolve(response)
}

const addProjectWithRequirement = async (creatorId, data) => {
  if (await ProjectRepository.creatorHasProject(creatorId)) return Promise.reject(getBadRequest())

  let response = await ProjectRepository.createWithRequirement(creatorId, data)
  if (response === undefined) return Promise.reject(getBadRequest())

  sendRequestMails(data)

  return Promise.resolve(response)
}

const editProject = async (creatorId, projectId, data) => {
  if (!(await ProjectRepository.existProject(projectId))) return Promise.reject(getBadRequest('No existe el proyecto'))
  if (!(await ProjectRepository.isProjectCreator(projectId, creatorId))) return Promise.reject(getBadRequest('Solo el creador del proyecto puede editarlo'))

  let response = await ProjectRepository.edit(projectId, data)
  if (response === undefined) return Promise.reject(getBadRequest())

  sendRequestMails(data)

  return Promise.resolve(response)
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
