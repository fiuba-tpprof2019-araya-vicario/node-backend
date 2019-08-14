import { getServiceError } from '../util/error'
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

module.exports = { getAllRequirements, addRequirement }
