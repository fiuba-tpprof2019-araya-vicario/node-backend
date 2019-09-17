import { getServiceError, getBadRequest } from '../util/error'
import RequestRepository from './requestRepository'

export const getAllStudentRequests = async (userId) => {
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

export const getAllTutorRequests = async (userId) => {
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

const modifyProposalStatusRequestStudent = (requestId, proposalStatus) => {
  if (!(await RequestRepository.hasRequestStudentAccepted(requestId))) return Promise.reject(getBadRequest('La solicitud no se encuentra en estado aceptada'))
  let response = await RequestRepository.modifyProposalStatusRequestStudent(requestId, proposalStatus)
  if (response == null) return Promise.reject(getBadRequest())

  //TODO: AGREGAR ENVIO DE MAIL

  return Promise.resolve(response)
}

const modifyStatusRequestStudent = async (requestId, status) => {
  if (!(await RequestRepository.hasRequestStudentPending(requestId))) return Promise.reject(getBadRequest('La solicitud no se encuentra en estado pendiente'))
  let response = await RequestRepository.modifyStatusRequestStudent(requestId, status)
  if (response == null) return Promise.reject(getBadRequest())

  //TODO: AGREGAR ENVIO DE MAIL

  return Promise.resolve(response)
}

export const modifyStudentRequest = async (requestId, status, proposalStatus) => {
  if (proposalStatus != null) return modifyProposalStatusRequestStudent(requestId, proposalStatus)
  else return modifyStatusRequestStudent(requestId, status)
}

const modifyProposalStatusRequestTutor = (requestId, proposalStatus) => {
  if (!(await RequestRepository.hasRequestTutorAccepted(requestId))) return Promise.reject(getBadRequest('La solicitud no se encuentra en estado aceptada'))
  let response = await RequestRepository.modifyProposalStatusRequestTutor(requestId, proposalStatus)
  if (response == null) return Promise.reject(getBadRequest())

  //TODO: AGREGAR ENVIO DE MAIL

  return Promise.resolve(response)
}

const modifyStatusRequestTutor = (requestId, status) => {
  if (!(await RequestRepository.hasRequestTutorPending(requestId))) return Promise.reject(getBadRequest('La solicitud no se encuentra en estado pendiente'))
  let response = await RequestRepository.modifyStatusRequestTutor(requestId, status)
  if (response == null) return Promise.reject(getBadRequest())

  //TODO: AGREGAR ENVIO DE MAIL

  return Promise.resolve(response)
}

export const modifyTutorRequest = async (requestId, status, proposalStatus) => {
  if (proposalStatus != null) return modifyProposalStatusRequestTutor(requestId, proposalStatus)
  else return modifyStatusRequestTutor(requestId, status)
}

export const acceptTutorRequest = async (requestId) => {
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

