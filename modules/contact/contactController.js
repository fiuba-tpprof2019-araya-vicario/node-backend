import { sendContactMail } from './contactService'
import { codes, createSuccessResponse } from '../util/responser'

const contact = async function (req, res) {
  let response = await sendContactMail(req.body.email, req.body.name, req.body.description)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { contact }
