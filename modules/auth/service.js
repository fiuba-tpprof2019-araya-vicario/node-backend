import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import { getServiceError, getUsuarioNoExistente } from '../util/error'
import UserRepository from './repository'

const client = new OAuth2Client(process.env.AUDIENCE, process.env.CLIENT_GOOGLE_SECRET, '')

const createToken = (id, email, profile, credentials) => {
  let payload = {
    id: id,
    email: email,
    profile: profile,
    credentials: credentials,
    iat: Math.now().unix(),
    exp: Math.now().add(30, 'days').unix()
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}

const validateGoogleToken = (idToken) => {
  return new Promise(async (resolve, reject) => {
    let audience = process.env.AUDIENCE
    try {
      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: audience
      })
      let payload = ticket.getPayload()
      let email = payload.email
      let tokenUser = payload.sub
      console.log('payload google ', payload)
      console.log('token user google ', tokenUser)
      console.log('email google ', email)
      return resolve({ tokenUser: tokenUser, email: email })
    } catch (err) {
      return reject(getServiceError(err.message))
    }
  })
}

const responseUser = (user, resolve, reject) => {
  if (user != null) {
    let token = createToken(user.id, user.email, user.Profiles[0], user.gerCredentials())
    return resolve({
      token: token,
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      profile: user.Profiles[0],
      credentials: user.getCredentials()
    })
  }
  return reject(getUsuarioNoExistente())
}

const validateUser = (token, email) => {
  return new Promise(async (resolve, reject) => {
    let user = await UserRepository.getByEmailAndToken(token, email)
    return responseUser(user, resolve, reject)
  })
}

const createUser = (email, name, surname, padron, type) => {
  return new Promise(async (resolve, reject) => {
    let user = await UserRepository.create(email, name, surname, padron, type)
    return responseUser(user, resolve, reject)
  })
}

module.exports = { validateGoogleToken, validateUser, createUser }
