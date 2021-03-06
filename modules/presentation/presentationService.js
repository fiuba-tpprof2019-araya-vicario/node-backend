import { getNotFound, getBadRequest } from '../util/error'
import PresentationRepository from './presentationRepository'
import ProjectRepository from '../project/projectRepository'
import * as projectService from '../project/projectService'
import { uploadPresentationFile, uploadDocumentationFile, removeFile } from '../util/googleDriveService'

export const createPresentation = async (projectId, userId) => {
  if (!(await ProjectRepository.existProject(projectId))) return Promise.reject(getBadRequest('No existe el proyecto'))
  if (!(await ProjectRepository.canCreatePresentation(projectId))) return Promise.reject(getBadRequest('El proyecto no se encuentra pendiente de presentación'))
  if (!(await ProjectRepository.isProjectTutor(projectId, userId))) return Promise.reject(getBadRequest('Solo el tutor puede habilitar presentación'))

  let response = await PresentationRepository.createPresentation(projectId)
  await ProjectRepository.setProjectStateAfter(projectId)
  
  if (response === undefined) return Promise.reject(getBadRequest())

  return Promise.resolve(response)
}

export const getPresentation = async (presentationId) => {
  return PresentationRepository.getPresentationById(presentationId)
    .then(presentation => {
      if (presentation == null) return Promise.reject(getNotFound())
      else return Promise.resolve(presentation)
    })
}

export const editPresentation = async (creatorId, presentationId, data, isAdmin) => {
  if (!(await PresentationRepository.existPresentation(presentationId))) return Promise.reject(getBadRequest('No existe el proyecto'))
  if (
    !isAdmin &&
    !(await PresentationRepository.isProjectCreator(presentationId, creatorId))
  ) return Promise.reject(getBadRequest('Solo el creador del proyecto puede editarlo'))

  let response = await PresentationRepository.edit(presentationId, data)
  if (response === undefined) return Promise.reject(getBadRequest())

  return Promise.resolve(response)
}

export const uploadPresentation = async (presentationId, file) => {
  console.log('presentationService::uploadPresentation')
  let presentation = await PresentationRepository.getPresentationById(presentationId)
  if (presentation != null && presentation.presentation_drive_id != null) removeFile(presentation.presentation_drive_id)
  let fileResponse = await uploadPresentationFile(file.originalname, file.path)
  console.log('fileResponse: ', fileResponse)
  let response = await PresentationRepository.updatePresentation(presentationId, fileResponse.id, fileResponse.link, fileResponse.name)
  if (response !== null) return Promise.resolve(response)
  else return Promise.reject(getBadRequest())
}

export const uploadDocumentation = async (presentationId, file) => {
  console.log('presentationService::uploadDocumentation')
  let presentation = await PresentationRepository.getPresentationById(presentationId)
  if (presentation != null && presentation.documentation_drive_id != null) removeFile(presentation.documentation_drive_id)
  let fileResponse = await uploadDocumentationFile(file.originalname, file.path)
  console.log('fileResponse: ', fileResponse)
  let response = await PresentationRepository.updateDocumentation(presentationId, fileResponse.id, fileResponse.link, fileResponse.name)
  if (response !== null) return Promise.resolve(response)
  else return Promise.reject(getBadRequest())
}

export const submitPresentation = async (presentationId) => {
  console.log('presentationService::submitPresentation')
  if (!(await PresentationRepository.canSubmitPresentation(presentationId))) return Promise.reject(getBadRequest('Faltan campos a completar en la Presentación'))
  let response = await PresentationRepository.acceptPresentation(presentationId)
  if (response == null) return Promise.reject(getBadRequest())
  let project = await PresentationRepository.getProjectByPresentationId(presentationId)

  await ProjectRepository.setProjectStateAfter(project.dataValues.id)
  await projectService.publishProjectBlockchain(project.dataValues.id)

  return Promise.resolve(presentationId)
}
