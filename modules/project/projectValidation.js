import { check, param, oneOf } from 'express-validator'

const MISS_NAME = 'Falta el nombre'
const MISS_DESCRIPTION = 'Falta la descripción'
const MISS_TYPE = 'Falta el tipo'
const MISS_STUDENTS = 'Faltan los estudiantes'
const MISS_TUTOR = 'Falta el tutor'
const MISS_COTUTORS = 'Faltan los cotutores'
const MISS_PROJECT_ID = 'Falta el id del proyecto'
const MISS_REQUIREMENT_ID = 'Falta el id del requerimiento'

const createValidations = [
  // WITHOUT REQUIREMENT
  oneOf([[check('name')
    .exists()
    .withMessage(MISS_NAME),
  check('description')
    .exists()
    .withMessage(MISS_DESCRIPTION),
  check('type')
    .exists()
    .withMessage(MISS_TYPE),
  check('students')
    .exists()
    .withMessage(MISS_STUDENTS),
  check('tutor_id')
    .exists()
    .withMessage(MISS_TUTOR),
  check('cotutors')
    .exists()
    .withMessage(MISS_COTUTORS)],
  // WITH REQUIREMENT
  [check('requirementId')
    .exists()
    .withMessage(MISS_REQUIREMENT_ID),
  check('type')
    .exists()
    .withMessage(MISS_TYPE),
  check('students')
    .exists()
    .withMessage(MISS_STUDENTS),
  check('cotutors')
    .exists()
    .withMessage(MISS_COTUTORS)]
  ])
]

const getValidations = [
  param('id')
    .exists()
    .withMessage(MISS_PROJECT_ID)
]

const modifyValidations = [
  ...createValidations,
  ...getValidations
]

export { createValidations, getValidations, modifyValidations }
