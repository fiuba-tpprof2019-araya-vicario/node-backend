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
  console.log('Token cliente: ', idToken)
  let audience = process.env.AUDIENCE
  let audienceAndroid = process.env.AUDIENCE_ANDROID
  let audienceIOS = process.env.AUDIENCE_IOS
  return client.verifyIdToken({
    idToken: idToken,
    audience: [audience, audienceAndroid, audienceIOS]
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
      return Promise.resolve({ tokenUser, email, name, surname })
    })
}

module.exports = { validateGoogleToken, createToken }
