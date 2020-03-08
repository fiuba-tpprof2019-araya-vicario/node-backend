import { param } from 'express-validator'

const MISS_PRESENTATION_ID = 'Falta el id de la presentación'

const getValidations = [
  param('id')
    .not().isEmpty()
    .withMessage(MISS_PRESENTATION_ID)
]

const modifyValidations = [
  ...getValidations
]

export { getValidations, modifyValidations }
