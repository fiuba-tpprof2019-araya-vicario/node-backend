import { validateGoogleToken, validateUser, createUser } from './authService'
import { codes, createSuccessResponse } from '../util/responser'

const auth = async function (req, res) {
  let userData = await validateGoogleToken(req.body.id_token)
  let user = await validateUser(userData.tokenUser, userData.email)
  if (user == null) user = await createUser(userData.email, userData.name, userData.surname, userData.tokenUser, userData.padron, [2])
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, user))
}

const create = async function (req, res) {
  let body = req.body
  let response = await createUser(body.email, body.name, body.surname, body.padron, body.type)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { auth, create }
