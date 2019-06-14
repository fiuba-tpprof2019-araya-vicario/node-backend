import { validateGoogleToken, validateUser, createUser } from './service'
import { codes, createSuccessResponse } from '../util/responser'

const auth = async function (req, res) {
  let googleData = await validateGoogleToken(req.body.id_token)
  console.log('llego')
  let response = await validateUser(googleData.tokenUser, googleData.email)
  console.log('estuvo')
  res.statusCode = codes.ACCEPTED
  res.json(createSuccessResponse(res.statusCode, response))
}

const create = async function (req, res) {
  let body = req.body
  let response = await createUser(body.email, body.name, body.surname, body.padron, body.type)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { auth, create }
