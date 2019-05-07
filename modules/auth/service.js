const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.AUDIENCE, process.env.CLIENT_GOOGLE_SECRET, '')
const errorGetter = require('../util/error')

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
      .catch((e) => {
        return reject(errorGetter.getServiceError(e.errors))
      })
  })
  return promise
}

module.exports = {
  validateGoogleToken: validateGoogleToken
}
