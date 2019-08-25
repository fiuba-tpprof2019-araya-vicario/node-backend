import { getServiceError, getBadRequest } from '../util/error'
import RequestRepository from './requestRepository'

const getAllStudentRequests = async (userId) => {
  return new Promise(async (resolve, reject) => {
    return RequestRepository.getStudentRequests(userId)
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
    return RequestRepository.getTutorRequests(userId)
      .then(requests => {
        return resolve(requests)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const modifyStudentRequest = async (requestId, status) => {
  if (!(await RequestRepository.hasRequestStudentPending(requestId))) return Promise.reject(getBadRequest('La solicitud no se encuentra en estado pendiente'))

  return new Promise(async (resolve, reject) => {
    return RequestRepository.modifyStatusRequestStudent(requestId, status)
      .then(request => {
        if (request != null) return resolve(request)
        else reject(getBadRequest())
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const modifyTutorRequest = async (requestId, status) => {
  if (!(await RequestRepository.hasRequestTutorPending(requestId))) return Promise.reject(getBadRequest('La solicitud no se encuentra en estado pendiente'))

  return new Promise(async (resolve, reject) => {
    return RequestRepository.modifyStatusRequestTutor(requestId, status)
      .then((request) => {
        if (request != null) return resolve(request)
        else reject(getBadRequest())
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const acceptTutorRequest = async (requestId) => {
  if (!(await RequestRepository.hasRequestTutorPending(requestId))) return Promise.reject(getBadRequest('La solicitud no se encuentra en estado pendiente'))

  return new Promise(async (resolve, reject) => {
    return RequestRepository.acceptTutorRequest(requestId)
      .then(() => {
        return resolve(requestId)
      })
      .catch((e) => {
        console.error(e)
        return reject(getServiceError())
      })
  })
}

module.exports = { getAllStudentRequests, getAllTutorRequests, modifyStudentRequest, modifyTutorRequest, acceptTutorRequest }
