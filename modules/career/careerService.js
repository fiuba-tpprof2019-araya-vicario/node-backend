import { getServiceError, getNotFound, getBadRequest } from '../util/error'
import CareerRepository from './careerRepository'
import UserRepository from '../user/userRepository'

const getSpecificCareer = async (careerId) => {
  return new Promise(async (resolve, reject) => {
    return CareerRepository.getCareerById(careerId)
      .then(career => {
        if (career == null) return reject(getNotFound())
        else return resolve(career)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const getCareers = async () => {
  return new Promise(async (resolve, reject) => {
    return CareerRepository.getCareers()
      .then(careers => {
        return resolve(careers)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const getCareersByUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    return UserRepository.getCareers(userId)
      .then(careers => {
        return resolve(careers)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const addCareer = async (creatorId, name, description) => {
  return new Promise(async (resolve, reject) => {
    return CareerRepository.create(name, description)
      .then(careerId => {
        return resolve(careerId)
      })
      .catch(() => {
        return reject(getBadRequest())
      })
  })
}

const editCareer = async (creatorId, careerId, name, description) => {
  if (!(await CareerRepository.existCareer(careerId))) return Promise.reject(getBadRequest('El departamento que quieres editar no existe'))

  return new Promise(async (resolve, reject) => {
    return CareerRepository.edit(careerId, name, description)
      .then(careerId => {
        return resolve(careerId)
      })
      .catch(() => {
        return reject(getBadRequest())
      })
  })
}

const removeCareer = async (careerId) => {
  return new Promise(async (resolve, reject) => {
    return CareerRepository.deleteById(careerId)
      .then(careerId => {
        return resolve(careerId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

module.exports = { addCareer, getSpecificCareer, getCareers, editCareer, removeCareer }
