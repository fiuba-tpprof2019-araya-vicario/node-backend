import { getServiceError, getNotFound, getBadRequest } from '../util/error'
import CareerRepository from './careerRepository'
import UserRepository from '../user/userRepository'

const getSpecificCareer = async (careerId) => {
  return CareerRepository.getCareerById(careerId)
    .then(career => {
      if (career == null) return Promise.reject(getNotFound())
      else return Promise.resolve(career)
    })
}

const getCareers = async () => {
  return CareerRepository.getCareers()
    .then(careers => {
      return Promise.resolve(careers)
    })
}

const getCareersByUser = async (userId) => {
  return UserRepository.getCareers(userId)
    .then(careers => {
      return Promise.resolve(careers)
    })
}

const addCareer = async (creatorId, name, description) => {
  return CareerRepository.create(name, description)
    .then(careerId => {
      return Promise.resolve(careerId)
    })
}

const editCareer = async (creatorId, careerId, name, description) => {
  if (!(await CareerRepository.existCareer(careerId))) return Promise.reject(getBadRequest('El departamento que quieres editar no existe'))

  return CareerRepository.edit(careerId, name, description)
    .then(careerId => {
      return Promise.resolve(careerId)
    })
}

const removeCareer = async (careerId) => {
  return CareerRepository.deleteById(careerId)
    .then(careerId => {
      return Promise.resolve(careerId)
    })
}

module.exports = { addCareer, getSpecificCareer, getCareers, editCareer, removeCareer }
