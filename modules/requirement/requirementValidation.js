import { check, param } from 'express-validator'

const MISS_NAME = 'Falta el nombre'
const MISS_DESCRIPTION = 'Falta la descripción'
const MISS_REQUIREMENT_ID = 'Falta el id del requerimiento'

const createValidations = [
  check('name')
    .exists()
    .withMessage(MISS_NAME),
  check('description')
    .exists()
    .withMessage(MISS_DESCRIPTION)
]

const getValidations = [
  param('id')
    .exists()
    .withMessage(MISS_REQUIREMENT_ID)
]

const modifyValidations = [
  getValidations,
  createValidations
]

export { createValidations, modifyValidations, getValidations }
