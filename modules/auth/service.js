import { OAuth2Client } from 'google-auth-library'
import { getServiceError, getUsuarioNoExistente } from '../util/error'
import UserRepository from './repository'

const client = new OAuth2Client(process.env.AUDIENCE, process.env.CLIENT_GOOGLE_SECRET, '')

const validateGoogleToken = (idToken) => {
  let promise = new Promise((resolve, reject) => {
    let audience = process.env.AUDIENCE
    return client.verifyIdToken({
      idToken: idToken,
      audience: audience
    })
      .then(ticket => {
        let payload = ticket.getPayload()
        let email = payload.email
        let tokenUser = payload.sub

        console.log('payload google ', payload)
        console.log('token user google ', tokenUser)
        console.log('email google ', email)

        return resolve({ tokenUser: tokenUser, email: email })
      })
      .catch(err => {
        return reject(getServiceError(err.message))
      })
  })
  return promise
}

const validateUser = (token, email) => {
  return Promise(async (resolve, reject) => {
    let user = await UserRepository.getByEmailAndToken(token, email)
    if (user != null) {
      return resolve(user)
    }
    return reject(getUsuarioNoExistente())
  })
}

module.export = { validateGoogleToken, validateUser }
