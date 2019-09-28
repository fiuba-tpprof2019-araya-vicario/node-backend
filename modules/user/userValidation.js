import { check } from 'express-validator'

const MISS_ID_USER = 'Falta el id de usuario'
const MISS_PROFILES = 'Faltan los perfiles'
const MISS_CAREERS = 'Faltan las carreras'

const getUserValidations = [
  check('id')
    .not().isEmpty()
    .withMessage(MISS_ID_USER)
]

const editUserValidations = [
  ...getUserValidations,
  check('profiles')
    .exists()
    .withMessage(MISS_PROFILES),
  check('careers')
    .exists()
    .withMessage(MISS_CAREERS)
]

export { getUserValidations, editUserValidations }
