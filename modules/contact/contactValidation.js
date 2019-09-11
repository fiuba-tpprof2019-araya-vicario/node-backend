import { check } from 'express-validator'

const MISS_NAME = 'Falta el nombre'
const MISS_EMAIL = 'Falta el email'
const NOT_EMAIL = 'No tiene el formato correcto de email'
const MISS_DESCRIPTION = 'Falta el mensaje'

export const contactValidations = [
  check('name')
    .not().isEmpty()
    .withMessage(MISS_NAME),
  check('email')
    .not().isEmpty()
    .withMessage(MISS_EMAIL)
    .isEmail()
    .withMessage(NOT_EMAIL),
  check('description')
    .not().isEmpty()
    .withMessage(MISS_DESCRIPTION)
]
