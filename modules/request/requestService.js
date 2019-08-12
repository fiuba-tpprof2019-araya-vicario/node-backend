import { getServiceError } from '../util/error'
import UserRepository from '../user/userRepository'
import RequestRepository from './requestRepository'

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

const modifyStudentRequest = async (requestId, status) => {
  return new Promise(async (resolve, reject) => {
    return RequestRepository.modifyStatusRequestStudent(requestId, status)
      .then(requests => {
        return resolve(requests)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const modifyTutorRequest = async (requestId, status) => {
  return new Promise(async (resolve, reject) => {
    return RequestRepository.modifyStatusRequestTutor(requestId, status)
      .then(requests => {
        return resolve(requests)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

module.exports = { getAllStudentRequests, getAllTutorRequests, modifyStudentRequest, modifyTutorRequest }
