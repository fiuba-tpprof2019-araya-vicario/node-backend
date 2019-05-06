const { check } = require('express-validator/check')

const MISS_ID_TOKEN = 'Falta el token'

module.exports = {
  messageFaltaNombre: MISS_ID_TOKEN,
  authValidations: [
    check('id_token')
      .exists()
      .withMessage(MISS_ID_TOKEN)
  ]
}
