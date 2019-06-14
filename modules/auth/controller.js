import { validateGoogleToken, validateUser } from './service'
import { codes, createSuccessResponse } from '../util/responser'

const auth = async function (req, res) {
  let googleData = await validateGoogleToken(req.body.id_token)
  let response = await validateUser(googleData.tokenUser, googleData.email)
  res.statusCode = codes.ACCEPTED
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { auth }
