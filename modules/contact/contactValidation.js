import { check } from 'express-validator/check'

const MISS_NAME = 'Falta el token'
const MISS_EMAIL = 'Falta el token'
const MISS_DESCRIPTION = 'Falta el mensaje'

export const contactValidations = [
  check('name')
    .exists()
    .withMessage(MISS_NAME),
  check('email')
    .exists()
    .isEmail()
    .withMessage(MISS_EMAIL),
  check('description')
    .exists()
    .withMessage(MISS_DESCRIPTION)
]
