import { check, param } from 'express-validator'

const MISS_NAME = 'Falta el nombre'
const MISS_DESCRIPTION = 'Falta la descripción'
const MISS_REQUIREMENT_ID = 'Falta el id del requerimiento'

const createValidations = [
  check('name')
    .exists().not().isEmpty()
    .withMessage(MISS_NAME),
  check('description')
    .exists().not().isEmpty()
    .withMessage(MISS_DESCRIPTION)
]

const getValidations = [
  param('id')
    .exists().not().isEmpty()
    .withMessage(MISS_REQUIREMENT_ID)
]

const modifyValidations = [
  getValidations,
  createValidations
]

export { createValidations, modifyValidations, getValidations }
