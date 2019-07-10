import { validateGoogleToken } from './authService'
import { createUser, validateUser } from '../user/userService'
import { codes, createSuccessResponse } from '../util/responser'

const STUDENT_PROFILE_ID = 2

const auth = async function (req, res) {
  let userData = await validateGoogleToken(req.body.id_token)
  let user = await validateUser(userData.tokenUser, userData.email)
  if (user == null) user = await createUser(userData.email, userData.name, userData.surname, userData.tokenUser, null, [STUDENT_PROFILE_ID])
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, user))
}

module.exports = { auth }
