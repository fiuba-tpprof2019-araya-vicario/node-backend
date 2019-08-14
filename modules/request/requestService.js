import { getServiceError, getBadRequest } from '../util/error'
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
      .then(result => {
        if (result[0] > 0) return resolve(requestId)
        else reject(getBadRequest())
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const modifyTutorRequest = async (requestId, status) => {
  return new Promise(async (resolve, reject) => {
    return RequestRepository.modifyStatusRequestTutor(requestId, status)
      .then((result) => {
        if (result[0] > 0) return resolve(requestId)
        else reject(getBadRequest())
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const acceptTutorRequest = async (requestId) => {
  return new Promise(async (resolve, reject) => {
    return RequestRepository.acceptTutorRequest(requestId)
      .then(() => {
        return resolve(requestId)
      })
      .catch((e) => {
        console.log(e)
        return reject(getServiceError())
      })
  })
}

module.exports = { getAllStudentRequests, getAllTutorRequests, modifyStudentRequest, modifyTutorRequest, acceptTutorRequest }
