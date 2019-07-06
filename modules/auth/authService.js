import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import { getServiceError, getUsuarioNoExistente } from '../util/error'
import UserRepository from './authRepository'
import moment from 'moment'

const client = new OAuth2Client(process.env.AUDIENCE, process.env.CLIENT_GOOGLE_SECRET, '')

const createToken = (id, email, profile, credentials) => {
  let payload = {
    id: id,
    email: email,
    profile: profile,
    credentials: credentials,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}

const validateGoogleToken = async (idToken) => {
  return new Promise(async (resolve, reject) => {
    let audience = process.env.AUDIENCE
    return client.verifyIdToken({
      idToken: idToken,
      audience: audience
    })
      .then(ticket => {
        let payload = ticket.getPayload()
        let email = payload.email
        let tokenUser = payload.sub
        let name = payload.given_name
        let surname = payload.family_name
        console.log('payload google ', payload)
        console.log('token user google ', tokenUser)
        console.log('email google ', email)
        return resolve({ tokenUser, email, name, surname })
      }).catch(err => { return reject(getServiceError(err.message)) })
  })
}

const getResponseUser = (user, token) => {
  return {
    token: token,
    id: user.id,
    email: user.email,
    name: user.name,
    surname: user.surname,
    profile: user.Profiles[0],
    credentials: getCredentials(user)
  }
}

const getCredentials = function (user) {
  let credentials = []
  for (let profile of user.Profiles) {
    for (let credential of profile.Credentials) {
      credentials.push(credential.name)
    }
  }
  return credentials
}

const getUserInfo = (user) => {
  user = user.get()
  user.Profiles = user.Profiles.map((profile) => {
    profile.Credentials = profile.Credentials.map((credential) => {
      return credential.get()
    })
    return profile.get()
  })

  return user
}

const validateUser = async (token, email) => {
  return new Promise(async (resolve, reject) => {
    // TODO: CAMBIAR ESTE HARDCODEO
    // return UserRepository.getByEmailAndToken(email, token)
    return UserRepository.getByEmailAndToken(email, null)
      .then(user => {
        if (user == null) return resolve(user)
        user = getUserInfo(user)
        let authToken = createToken(user.id, user.email, user.Profiles[0], getCredentials(user))
        return resolve(getResponseUser(user, authToken))
      })
      .catch(() => {
        return reject(getUsuarioNoExistente())
      })
  })
}

const createUser = async (email, name, surname, token, padron, type) => {
  return new Promise(async (resolve, reject) => {
    // TODO: CAMBIAR ESTE HARDCODEO
    // return UserRepository.create(email, name, surname, token, padron, type)
    return UserRepository.create(email, name, surname, null, padron, type)
      .then(user => {
        if (user == null) return reject(getUsuarioNoExistente())
        user = getUserInfo(user)
        let authToken = createToken(user.id, user.email, user.Profiles[0], getCredentials(user))
        return resolve(getResponseUser(user, authToken))
      })
      .catch(() => { return reject(getUsuarioNoExistente()) })
  })
}

module.exports = { validateGoogleToken, validateUser, createUser }
