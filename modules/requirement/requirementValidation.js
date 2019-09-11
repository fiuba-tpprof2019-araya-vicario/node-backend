import { check, param } from 'express-validator'

const MISS_NAME = 'Falta el nombre'
const MISS_DESCRIPTION = 'Falta la descripción'
const MISS_REQUIREMENT_ID = 'Falta el id del requerimiento'

const createValidations = [
  check('name')
    .not().isEmpty()
    .withMessage(MISS_NAME),
  check('description')
    .not().isEmpty()
    .withMessage(MISS_DESCRIPTION)
]

const getValidations = [
  param('id')
    .not().isEmpty()
    .withMessage(MISS_REQUIREMENT_ID)
]

const modifyValidations = [
  getValidations,
  createValidations
]

export { createValidations, modifyValidations, getValidations }
