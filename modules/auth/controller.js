const service = require('./service')
const responser = require('../util/responser')

const auth = async function (req, res) {
  let response = await service.validateGoogleToken(req.body.id_token)
  res.statusCode = responser.codes.CREATED
  res.json(responser.createSuccessResponse(res.statusCode, response))
}

module.exports = {
  auth: auth
}
