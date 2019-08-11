import { check } from 'express-validator/check'

const MISS_ID_USER = 'Falta el id de usuario'

const getUserValidations = [
  check('id')
    .exists()
    .withMessage(MISS_ID_USER)
]

export { getUserValidations }
