import { check } from 'express-validator'

const MISS_NAME = 'Falta el nombre'
const MISS_EMAIL = 'Falta el email'
const MISS_DESCRIPTION = 'Falta el mensaje'

export const contactValidations = [
  check('name')
    .exists().not().isEmpty()
    .withMessage(MISS_NAME),
  check('email')
    .exists().not().isEmpty()
    .isEmail()
    .withMessage(MISS_EMAIL),
  check('description')
    .exists().not().isEmpty()
    .withMessage(MISS_DESCRIPTION)
]
