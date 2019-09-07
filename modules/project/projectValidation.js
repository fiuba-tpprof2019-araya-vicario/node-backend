import { check, param, oneOf } from 'express-validator'

const MISS_NAME = 'Falta el nombre'
const MISS_DESCRIPTION = 'Falta la descripción'
const MISS_TYPE = 'Falta el tipo'
const MISS_STUDENTS = 'Faltan los estudiantes'
const MISS_TUTOR = 'Falta el tutor'
const MISS_COTUTORS = 'Faltan los cotutores'
const MISS_PROJECT_ID = 'Falta el id del proyecto'
const MISS_REQUIREMENT_ID = 'Falta el id del requerimiento'
const MISS_DEPARTMENTS = 'Faltan los departamentos'
const MISS_USER_ID = 'Falta el id del usuario'

const baseCreateValidations = [
  check('type')
    .not().isEmpty()
    .withMessage(MISS_TYPE),
  check('students')
    .exists()
    .withMessage(MISS_STUDENTS),
  check('cotutors')
    .exists()
    .withMessage(MISS_COTUTORS),
  check('departments')
    .exists()
    .withMessage(MISS_DEPARTMENTS)
]

const createValidations = [
  // WITHOUT REQUIREMENT
  oneOf([[check('name')
    .not().isEmpty()
    .withMessage(MISS_NAME),
  check('description')
    .not().isEmpty()
    .withMessage(MISS_DESCRIPTION),
  check('tutor_id')
    .not().isEmpty()
    .withMessage(MISS_TUTOR),
  ...baseCreateValidations],
  // WITH REQUIREMENT
  [check('requirementId')
    .not().isEmpty()
    .withMessage(MISS_REQUIREMENT_ID),
  ...baseCreateValidations]
  ])
]

const getValidations = [
  param('id')
    .not().isEmpty()
    .withMessage(MISS_PROJECT_ID)
]

const modifyValidations = [
  ...createValidations,
  ...getValidations
]

const deleteUserProjectValidations = [
  ...getValidations,
  param('user_id')
    .not().isEmpty()
    .withMessage(MISS_USER_ID)
]

export { createValidations, getValidations, modifyValidations, deleteUserProjectValidations }
