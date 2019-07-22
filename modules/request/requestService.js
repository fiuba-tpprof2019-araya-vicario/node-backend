import { getServiceError } from '../util/error'
import UserRepository from '../user/userRepository'

const getAllStudentRequests = async (userId) => {
  return new Promise(async (resolve, reject) => {
    return UserRepository.getStudentRequests(userId)
      .then(requests => {
        return resolve(requests)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const getAllTutorRequests = async (userId) => {
  return new Promise(async (resolve, reject) => {
    return UserRepository.getTutorRequests(userId)
      .then(requests => {
        return resolve(requests)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

module.exports = { getAllStudentRequests, getAllTutorRequests }
