import { validateGoogleToken } from './service'
import { codes, createSuccessResponse } from '../util/responser'

const auth = async function (req, res) {
  let response = await validateGoogleToken(req.body.id_token)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { auth }
