import { getServiceError, getBadRequest } from '../util/error'
import RequestRepository from './requestRepository'
import ProjectRepository from '../project/projectRepository'

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

const modifyProposalStatusRequestStudent = async (requestId, proposalStatus) => {
  console.log('requestService::modifyProposalStatusRequestStudent')
  if (!(await RequestRepository.hasRequestStudentAccepted(requestId))) return Promise.reject(getBadRequest('La solicitud no se encuentra en estado aceptada'))
  if (!(await ProjectRepository.canAcceptProposalRequestStudent(requestId))) return Promise.reject(getBadRequest('El proyecto no acepta propuesta'))

  let response = await RequestRepository.updateRequestStudent(requestId, { accepted_proposal: proposalStatus })
  if (response == null) return Promise.reject(getBadRequest())

  // TODO: AGREGAR ENVIO DE MAIL

  return Promise.resolve(response)
}

const modifyStatusRequestStudent = async (requestId, status) => {
  if (!(await RequestRepository.hasRequestStudentPending(requestId))) return Promise.reject(getBadRequest('La solicitud no se encuentra en estado pendiente'))

  let response = await RequestRepository.updateRequestStudent(requestId, { status })
  if (response == null) return Promise.reject(getBadRequest())

  // TODO: AGREGAR ENVIO DE MAIL

  return Promise.resolve(response)
}

export const modifyStudentRequest = async (requestId, status, proposalStatus) => {
  if (proposalStatus != null) return modifyProposalStatusRequestStudent(requestId, proposalStatus)
  else return modifyStatusRequestStudent(requestId, status)
}

const modifyProposalStatusRequestTutor = async (requestId, proposalStatus) => {
  if (!(await RequestRepository.hasRequestTutorAccepted(requestId))) return Promise.reject(getBadRequest('La solicitud no se encuentra en estado aceptada'))
  if (!(await ProjectRepository.canAcceptProposalRequestTutor(requestId))) return Promise.reject(getBadRequest('El proyecto no acepta propuesta'))

  let response = await RequestRepository.updateRequestTutor(requestId, { accepted_proposal: proposalStatus })
  if (response == null) return Promise.reject(getBadRequest())

  // TODO: AGREGAR ENVIO DE MAIL

  return Promise.resolve(response)
}

const modifyStatusRequestTutor = async (requestId, status) => {
  if (!(await RequestRepository.hasRequestTutorPending(requestId))) return Promise.reject(getBadRequest('La solicitud no se encuentra en estado pendiente'))

  let response = await RequestRepository.updateRequestTutor(requestId, { status })
  if (response == null) return Promise.reject(getBadRequest())

  // TODO: AGREGAR ENVIO DE MAIL

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
