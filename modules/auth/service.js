const keys = require('../../keystore.json')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(keys.web.client_id, keys.web.client_secret, '')
const errorGetter = require('../util/error')

const validateGoogleToken = (idToken) => {
  let promise = new Promise((resolve, reject) => {
    let audience = keys.web.client_id
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
      .catch((e) => {
        return reject(errorGetter.getServiceError(e.errors))
      })
  })
  return promise
}

module.exports = {
  validateGoogleToken: validateGoogleToken
}
