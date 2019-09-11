import { sendMail } from '../util/mailService'
import { getContactMailOption } from '../util/mailUtils'

const sendContactMail = async (email, name, description) => {
  return sendMail(getContactMailOption({ email, name, description }))
}

module.exports = { sendContactMail }
