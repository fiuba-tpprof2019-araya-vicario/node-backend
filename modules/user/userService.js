import { createToken } from '../auth/authService'
import { getServiceError, getUsuarioNoExistente } from '../util/error'
import UserRepository from './userRepository'

const getResponseUser = (user, token) => {
  return {
    token: token,
    id: user.id,
    email: user.email,
    name: user.name,
    surname: user.surname,
    credentials: getCredentials(user)
  }
}

const getCredentials = function (user) {
  let credentials = []
  for (let profile of user.Profiles) {
    credentials = [...credentials, ...profile.Credentials.map(credential => credential.name)]
  }
  return [...new Set(credentials)]
}

const validateUser = async (token, email) => {
  return new Promise(async (resolve, reject) => {
    // TODO: CAMBIAR ESTE HARDCODEO
    // return UserRepository.getByEmailAndToken(email, token)
    return UserRepository.getByEmailAndToken(email, null)
      .then(user => {
        if (user == null) return resolve(user)
        user = user.dataValues
        let authToken = createToken(user.id, user.email, getCredentials(user))
        return resolve(getResponseUser(user, authToken))
      })
      .catch(() => {
        return reject(getUsuarioNoExistente())
      })
  })
}

const getUserById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    return UserRepository.get(userId)
      .then(user => {
        if (user == null) return reject(getUsuarioNoExistente())
        return resolve(user)
      })
      .catch(() => { return reject(getUsuarioNoExistente()) })
  })
}

const getUsersByProfileResponse = (users) => {
  return users.map(user => { return { id: user.dataValues.id, name: `${user.dataValues.name} ${user.dataValues.surname}` } })
}

const getUsersByProfile = async (profileId) => {
  return new Promise(async (resolve, reject) => {
    return UserRepository.getByProfile(profileId)
      .then(users => {
        if (users == null) return reject(getUsuarioNoExistente())
        return resolve(getUsersByProfileResponse(users))
      })
      .catch(() => { return reject(getUsuarioNoExistente()) })
  })
}

const createUser = async (email, name, surname, token, padron, type) => {
  return new Promise(async (resolve, reject) => {
    // TODO: CAMBIAR ESTE HARDCODEO
    // return UserRepository.create(email, name, surname, token, padron, type)
    return UserRepository.create(email, name, surname, null, padron, type)
      .then(user => {
        if (user == null) return reject(getServiceError())
        user = user.dataValues
        let authToken = createToken(user.id, user.email, getCredentials(user))
        return resolve(getResponseUser(user, authToken))
      })
      .catch((e) => {
        return reject(getServiceError())
      })
  })
}

module.exports = { getUserById, getUsersByProfile, createUser, validateUser }
