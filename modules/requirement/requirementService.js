import { getServiceError, getBadRequest } from '../util/error'
import RequirementRepository from './requirementRepository'

const getAllRequirements = async () => {
  return RequirementRepository.getAll()
    .then(requirements => {
      return Promise.resolve(requirements)
    })
}

const addRequirement = async (creatorId, name, description) => {
  return RequirementRepository.create(creatorId, name, description)
    .then(requirementId => {
      if (requirementId == null) return reject(getServiceError())
      return Promise.resolve(requirementId)
    })
}

const editRequirement = async (creatorId, requirementId, name, description) => {
  if (!(await RequirementRepository.isRequirementCreator(creatorId, requirementId))) return Promise.reject(getBadRequest('Solo el creador del requerimiento puede editarlo'))

  return RequirementRepository.edit(creatorId, requirementId, name, description)
    .then(requirementId => {
      return Promise.resolve(requirementId)
    })
}

const removeRequirement = async (requirementId) => {
  return RequirementRepository.delete(requirementId)
    .then(requirementId => {
      if (requirementId == null) return reject(getBadRequest('No existe el requerimiento que quiere eliminar'))
      return Promise.resolve(requirementId)
    })
}

module.exports = { getAllRequirements, addRequirement, editRequirement, removeRequirement }
