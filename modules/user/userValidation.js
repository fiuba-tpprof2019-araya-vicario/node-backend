import { check } from 'express-validator'

const MISS_ID_USER = 'Falta el id de usuario'
const MISS_PROFILES = 'Faltan los perfiles'

const getUserValidations = [
  check('id')
    .not().isEmpty()
    .withMessage(MISS_ID_USER)
]

const editUserValidations = [
  ...getUserValidations,
  check('profiles')
    .exists()
    .withMessage(MISS_PROFILES)
]

export { getUserValidations, editUserValidations }
