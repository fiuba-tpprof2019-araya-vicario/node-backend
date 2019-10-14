import { getServiceError, getBadRequest } from '../util/error'
import RequirementRepository from './requirementRepository'
import { uploadRequirementFile, removeFile } from '../util/googleDriveService'

const getAllRequirements = async () => {
  return RequirementRepository.getAll()
    .then(requirements => {
      return Promise.resolve(requirements)
    })
}

const addRequirement = async (creatorId, name, description, file) => {
  console.log('requirementService::addRequirement')
  if (file != null) {
    let fileResponse = await uploadRequirementFile(file.originalname, file.path)
    let requirementId = await RequirementRepository.create(creatorId, name, description, fileResponse.id, fileResponse.link, fileResponse.name)
    if (requirementId == null) return Promise.reject(getServiceError())
    return Promise.resolve(requirementId)
  } else {
    let requirementId = await RequirementRepository.create(creatorId, name, description)
    if (requirementId == null) return Promise.reject(getServiceError())
    return Promise.resolve(requirementId)
  }
}

const editRequirement = async (creatorId, requirementId, name, description, file) => {
  if (!(await RequirementRepository.isRequirementCreator(creatorId, requirementId))) return Promise.reject(getBadRequest('Solo el creador del requerimiento puede editarlo'))

  let requirement = await RequirementRepository.getById(requirementId)
  if (requirement != null && requirement.file_drive_id != null) removeFile(requirement.file_drive_id)

  if (file != null) {
    let fileResponse = await uploadRequirementFile(file.originalname, file.path)
    let response = await RequirementRepository.edit(creatorId, requirementId, name, description, fileResponse.id, fileResponse.link, fileResponse.name)
    if (response == null) return Promise.reject(getServiceError())
    return Promise.resolve(response)
  } else {
    let response = await RequirementRepository.edit(creatorId, requirementId, name, description)
    if (response == null) return Promise.reject(getServiceError())
    return Promise.resolve(response)
  }
}

const removeRequirement = async (requirementId) => {
  let requirement = await RequirementRepository.getById(requirementId)
  if (requirement != null && requirement.file_drive_id != null) removeFile(requirement.file_drive_id)

  return RequirementRepository.delete(requirementId)
    .then(requirementId => {
      if (requirementId == null) return Promise.reject(getBadRequest('No existe el requerimiento que quiere eliminar'))
      return Promise.resolve(requirementId)
    })
}

module.exports = { getAllRequirements, addRequirement, editRequirement, removeRequirement }
