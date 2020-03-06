import { check, param } from 'express-validator'

const MISS_PROJECT_ID = 'Falta el id del proyecto'
const MISS_PRESENTATION_ID = 'Falta el id de la presentación'

const createValidations = [
  check('project_id')
    .not().isEmpty()
    .withMessage(MISS_PROJECT_ID)
]

const getValidations = [
  param('id')
    .not().isEmpty()
    .withMessage(MISS_PRESENTATION_ID)
]

const modifyValidations = [
  ...getValidations
]

export { createValidations, getValidations, modifyValidations }
