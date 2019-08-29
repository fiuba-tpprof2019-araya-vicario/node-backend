import { check } from 'express-validator'

const MISS_ID_TOKEN = 'Falta el token'

const authValidations = [
  check('id_token')
    .exists().not().isEmpty()
    .withMessage(MISS_ID_TOKEN)
]

export { authValidations }
