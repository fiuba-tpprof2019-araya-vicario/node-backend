import { check, param } from 'express-validator'

const MISS_NAME = 'Falta el nombre'
const MISS_DESCRIPTION = 'Falta la descripción'
const MISS_DEPARTMENT_ID = 'Falta el id del departamento'

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
    .withMessage(MISS_DEPARTMENT_ID)
]

const modifyValidations = [
  ...createValidations,
  ...getValidations
]

export { createValidations, getValidations, modifyValidations }
