import { getNotFound, getBadRequest } from '../util/error'
import ProjectRepository from './projectRepository'
import UserRepository from '../user/userRepository'
import RequestRepository from '../request/requestRepository'
import { sendMail } from '../util/mailService'
import { getRequestStudentMailOption, getRequestTutorMailOption, getRequestCotutorMailOption } from '../util/mailUtils'
import { uploadFile, removeFile } from '../util/googleDriveService'

export const getSpecificProject = async (projectId) => {
  return ProjectRepository.getProjectFullById(projectId)
    .then(project => {
      if (project == null) return Promise.reject(getNotFound())
      else return Promise.resolve(project)
    })
}

export const getProjects = async (filter) => {
  return ProjectRepository.getProjects(filter)
    .then(project => {
      if (project == null) return Promise.reject(getNotFound())
      else return Promise.resolve(project)
    })
}

export const getAllStudentProjects = async (userId) => {
  return UserRepository.getStudentProjects(userId)
    .then(projects => {
      return Promise.resolve(projects)
    })
}

export const getAllTutorProjects = async (userId) => {
  return UserRepository.getTutorProjects(userId)
    .then(projects => {
      return Promise.resolve(projects)
    })
}

export const getTypesProjects = async () => {
  return ProjectRepository.getProjectsTypes()
    .then(types => {
      return Promise.resolve(types)
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

export const addProject = async (creatorId, data) => {
  if (await ProjectRepository.creatorHasProject(creatorId)) return Promise.reject(getBadRequest())

  let response = await ProjectRepository.create(creatorId, data)
  if (response === undefined) return Promise.reject(getBadRequest())

  sendRequestMails(data)

  return Promise.resolve(response)
}

export const addProjectWithRequirement = async (creatorId, data) => {
  if (await ProjectRepository.creatorHasProject(creatorId)) return Promise.reject(getBadRequest())

  let response = await ProjectRepository.createWithRequirement(creatorId, data)
  if (response === undefined) return Promise.reject(getBadRequest())

  sendRequestMails(data)

  return Promise.resolve(response)
}

export const editProject = async (creatorId, projectId, data) => {
  if (!(await ProjectRepository.existProject(projectId))) return Promise.reject(getBadRequest('No existe el proyecto'))
  if (!(await ProjectRepository.isProjectCreator(projectId, creatorId))) return Promise.reject(getBadRequest('Solo el creador del proyecto puede editarlo'))

  let response = await ProjectRepository.edit(projectId, data)
  if (response === undefined) return Promise.reject(getBadRequest())

  await RequestRepository.resetAcceptProposal(projectId)

  sendRequestMails(data)

  return Promise.resolve(response)
}

export const removeProject = async (projectId) => {
  let project = await ProjectRepository.getProjectById(projectId)
  if (project != null && project.proposal_drive_id != null) removeFile(project.proposal_drive_id)
  return ProjectRepository.deleteProjectById(projectId)
    .then(projectId => {
      return Promise.resolve(projectId)
    })
}

export const removeStudentProject = async (projectId, userId) => {
  if (!(await ProjectRepository.existProject(projectId))) return Promise.reject(getBadRequest('No existe el proyecto'))
  if (await ProjectRepository.isProjectCreator(projectId, userId)) return removeCreatorProject(projectId, userId)
  return removeParticipantProject(projectId, userId)
}

const removeParticipantProject = async (projectId, userId) => {
  await ProjectRepository.deleteParticipantProject(projectId, userId)
  await RequestRepository.resetAcceptProposal(projectId)
  return Promise.resolve(projectId)
}

const removeCreatorProject = async (projectId, userId) => {
  return ProjectRepository.deleteProjectById(projectId)
    .then(projectId => {
      return Promise.resolve(projectId)
    })
}

export const removeTutorProject = async (projectId, userId) => {
  if (!(await ProjectRepository.existProject(projectId))) return Promise.reject(getBadRequest('No existe el proyecto'))
  if (await ProjectRepository.isProjectTutor(projectId, userId)) return _removeTutorProject(projectId, userId)
  return removeCotutorProject(projectId, userId)
}

const _removeTutorProject = async (projectId, userId) => {
  await ProjectRepository.deleteTutorProject(projectId, userId)
  await RequestRepository.resetAcceptProposal(projectId)
  return Promise.resolve(projectId)
}

const removeCotutorProject = async (projectId, userId) => {
  await ProjectRepository.deleteCotutorProject(projectId, userId)
  await RequestRepository.resetAcceptProposal(projectId)
  return Promise.resolve(projectId)
}

export const uploadProposal = async (projectId, file) => {
  console.log('projectService::uploadProposal')
  let project = await ProjectRepository.getProjectById(projectId)
  if (project != null && project.proposal_drive_id != null) {
    removeFile(project.proposal_drive_id)
    await RequestRepository.resetAcceptProposal(projectId)
  }
  let fileResponse = await uploadFile(file.originalname, file.path)
  console.log('fileResponse: ', fileResponse)
  let response = await ProjectRepository.updateProposal(projectId, fileResponse.id, fileResponse.link, fileResponse.name)
  if (response !== null) return Promise.resolve(response)
  else return Promise.reject(getBadRequest())
}

const checkProjectEvalution = async (projectId) => {
  if (!(await ProjectRepository.hasAllCareerEvaluated(projectId))) return
  if ((await ProjectRepository.hasAllCareerEvaluationAccepted(projectId))) await ProjectRepository.setProjectStateAfter(projectId)
  else await ProjectRepository.setProjectStateBefore(projectId)
}

export const evaluateProposal = async (projectId, userId, careerId, status, rejectReason) => {
  if (!(await UserRepository.hasCareer(userId, careerId))) return Promise.reject(getBadRequest('El usuario no pertenece a la carrera'))
  if (!(await ProjectRepository.existProject(projectId))) return Promise.reject(getBadRequest('No existe el proyecto'))
  if (!(await ProjectRepository.canEvaluateProject(projectId, careerId))) return Promise.reject(getBadRequest('El proyecto no se encuentra en revisión'))
  if (status === 'accepted') await ProjectRepository.approveProjectCareer(projectId, careerId, userId)
  else await ProjectRepository.rejectProjectCareer(projectId, careerId, userId, rejectReason)

  await checkProjectEvalution(projectId)

  return Promise.resolve(projectId)
}
