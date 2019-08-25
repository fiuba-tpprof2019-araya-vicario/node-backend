import { getServiceError, getBadRequest } from '../util/error'
import RequirementRepository from './requirementRepository'

const getAllRequirements = async () => {
  return new Promise(async (resolve, reject) => {
    return RequirementRepository.getAll()
      .then(requirements => {
        return resolve(requirements)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const addRequirement = async (creatorId, name, description) => {
  return new Promise(async (resolve, reject) => {
    return RequirementRepository.create(creatorId, name, description)
      .then(requirementId => {
        if (requirementId == null) return reject(getServiceError())
        return resolve(requirementId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const editRequirement = async (creatorId, requirementId, name, description) => {
  if (!(await RequirementRepository.isRequirementCreator(creatorId, requirementId))) return Promise.reject(getBadRequest('Solo el creador del requerimiento puede editarlo'))

  return new Promise(async (resolve, reject) => {
    return RequirementRepository.edit(creatorId, requirementId, name, description)
      .then(requirementId => {
        return resolve(requirementId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const removeRequirement = async (requirementId) => {
  return new Promise(async (resolve, reject) => {
    return RequirementRepository.delete(requirementId)
      .then(requirementId => {
        if (requirementId == null) return reject(getBadRequest('No existe el requerimiento que quiere eliminar'))
        return resolve(requirementId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

module.exports = { getAllRequirements, addRequirement, editRequirement, removeRequirement }
