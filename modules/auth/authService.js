import { google } from 'googleapis'
import jwt from 'jsonwebtoken'
import { getServiceError } from '../util/error'
import moment from 'moment'

const client = new google.auth.OAuth2(process.env.AUDIENCE, process.env.CLIENT_GOOGLE_SECRET, '')

const createToken = (id, email, credentials) => {
  let payload = {
    id: id,
    email: email,
    credentials: credentials,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET_JWT)
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

module.exports = { validateGoogleToken, createToken }
