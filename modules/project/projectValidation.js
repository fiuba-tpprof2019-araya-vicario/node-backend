import { check, param } from 'express-validator'

const MISS_NAME = 'Falta el nombre'
const MISS_DESCRIPTION = 'Falta la descripción'
const MISS_TYPE = 'Falta el tipo'
const MISS_STUDENTS = 'Faltan los estudiantes'
const MISS_TUTOR = 'Falta el tutor'
const MISS_COTUTORS = 'Faltan los cotutores'
const MISS_PROJECT_ID = 'Falta el id del proyecto'
const MISS_DEPARTMENTS = 'Faltan los departamentos'
const MISS_USER_ID = 'Falta el id del usuario'
const MISS_STATUS = 'Falta el estado'
const WRONG_STATUS_VALUE = 'Estado invalido'
const MISS_CAREER = 'Falta la carrera'
const MISS_TX = 'Falta transaction id'

const createValidations = [
  check('name')
    .not().isEmpty()
    .withMessage(MISS_NAME),
  check('description')
    .not().isEmpty()
    .withMessage(MISS_DESCRIPTION),
  check('tutor_id')
    .not().isEmpty()
    .withMessage(MISS_TUTOR),
  check('type_id')
    .not().isEmpty()
    .withMessage(MISS_TYPE),
  check('students')
    .exists()
    .withMessage(MISS_STUDENTS),
  check('cotutors')
    .exists()
    .withMessage(MISS_COTUTORS),
  check('careers')
    .not().isEmpty()
    .withMessage(MISS_DEPARTMENTS)
]

const getValidations = [
  param('id')
    .not().isEmpty()
    .withMessage(MISS_PROJECT_ID)
]

const modifyValidations = [
  ...getValidations
]

const blockchainValidations = [
  ...getValidations,
  check('tx_id')
    .not().isEmpty()
    .withMessage(MISS_TX)
]

const deleteUserProjectValidations = [
  ...getValidations,
  param('user_id')
    .not().isEmpty()
    .withMessage(MISS_USER_ID)
]

const evaluateValidations = [
  ...getValidations,
  check('status')
    .not().isEmpty()
    .withMessage(MISS_STATUS)
    .isIn(['accepted', 'rejected'])
    .withMessage(WRONG_STATUS_VALUE),
  check('career')
    .not().isEmpty()
    .withMessage(MISS_CAREER)
]

export { createValidations, getValidations, modifyValidations, deleteUserProjectValidations, evaluateValidations, blockchainValidations }
