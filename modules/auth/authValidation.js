import { check } from 'express-validator/check'

const MISS_ID_TOKEN = 'Falta el token'
const MISS_ID_USER = 'Falta el id de usuario'

const authValidations = [
  check('id_token')
    .exists()
    .withMessage(MISS_ID_TOKEN)
]

const getUserValidations = [
  check('id')
    .exists()
    .withMessage(MISS_ID_USER)
]

export { authValidations, getUserValidations }
