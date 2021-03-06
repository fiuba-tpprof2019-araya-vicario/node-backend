import { createToken } from '../auth/authService'
import { getServiceError, getUsuarioNoExistente } from '../util/error'
import UserRepository from './userRepository'
import { STATUS_REQUEST } from '../request/requestUtils'

const STATE_ID_LAST = 7

const getResponseUser = (user, token) => {
  return {
    token: token,
    id: user.id,
    email: user.email,
    name: user.name,
    surname: user.surname,
    credentials: getCredentials(user),
    careers: getCareers(user),
    interests: getInterests(user)
  }
}

const getCareers = (user) => (user.Careers.map(({ id, name, description }) => ({ id, name, description })))

const getInterests = (user) => (user.UserInterests.map(({ interest_id, score }) => ({ id: interest_id, score })))

const getCredentials = function (user) {
  let credentials = []
  for (let profile of user.Profiles) {
    credentials = [...credentials, ...profile.Credentials.map(credential => credential.name)]
  }
  return [...new Set(credentials)]
}

const isStudent = (user) => {
  return user.Profiles.find(
    profile => {
      return profile.dataValues.Credentials.find(
        credential => {
          return credential.dataValues.name === 'EDIT_PROJECTS'
        }) != null
    }) != null
}

const getActiveProject = (creations, participations) => {
  let activeProject = creations.find(creation => { return creation.dataValues.state_id !== STATE_ID_LAST })
  if (activeProject != null) return activeProject
  return participations.find(participation => { return participation.dataValues.state_id !== STATE_ID_LAST && participation.StudentRequests.length > 0 && participation.StudentRequests[0].dataValues.status === STATUS_REQUEST.ACCEPTED })
}

const processUserResponse = (user) => {
  user = user.dataValues
  console.log(user)
  let authToken = createToken(user.id, user.email, getCredentials(user))
  console.log('authToken: ', authToken)
  let response = getResponseUser(user, authToken)
  if (isStudent(user)) {
    console.log('ES ESTUDIANTE!!!')
    let activeProject = getActiveProject(user.Creations, user.Participations)
    console.log(activeProject)
    if (activeProject != null) response.projectId = activeProject.dataValues.id
  }
  console.log(response)
  return Promise.resolve(response)
}

const validateUser = async (token, email) => {
  // TODO: CAMBIAR ESTE HARDCODEO
  // return UserRepository.getByEmailAndToken(email, token)
  return UserRepository.getByEmailAndToken(email, null)
    .then(user => {
      if (user == null) return Promise.resolve(user)
      return processUserResponse(user)
    })
}

const getUser = async (userId) => {
  return UserRepository.getById(userId)
    .then(user => {
      if (user == null) return Promise.reject(getUsuarioNoExistente())
      return Promise.resolve(user)
    })
}

const getUsers = async (params) => {
  return UserRepository.getAll(params)
    .then(users => {
      if (users == null) return Promise.reject(getUsuarioNoExistente())
      return Promise.resolve(users)
    })
}

const createUser = async (email, name, surname, token, padron, type) => {
  // TODO: CAMBIAR ESTE HARDCODEO
  // return UserRepository.create(email, name, surname, token, padron, type)
  return UserRepository.create(email, name, surname, null, padron, type)
    .then(user => {
      if (user == null) return Promise.reject(getServiceError())
      return processUserResponse(user)
    })
}

const editUser = async (userId, profiles, careers) => {
  return UserRepository.edit(userId, profiles, careers)
    .then(userId => {
      if (userId == null) return Promise.reject(getServiceError())
      return Promise.resolve(userId)
    })
}

module.exports = { getUser, getUsers, createUser, validateUser, editUser }
