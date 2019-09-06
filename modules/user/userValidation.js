import { check } from 'express-validator'

const MISS_ID_USER = 'Falta el id de usuario'

const getUserValidations = [
  check('id')
    .exists().not().isEmpty()
    .withMessage(MISS_ID_USER)
]

export { getUserValidations }
