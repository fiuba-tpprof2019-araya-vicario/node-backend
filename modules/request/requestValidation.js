import { check, param, oneOf } from 'express-validator/check'

const MISS_REQUEST_ID = 'Falta el id de la solicitud'
const MISS_STATUS = 'Falta el estado'
const WRONG_STATUS_VALUE = 'Estado invalido'
const MISS_TYPE = 'Falta el tipo'
const WRONG_TYPE_VALUE = 'Tipo invalido'

const putValidations = [
  param('id')
    .exists()
    .withMessage(MISS_REQUEST_ID),
  check('status')
    .exists()
    .withMessage(MISS_STATUS),
  oneOf([
    check('status').equals('accepted'),
    check('status').equals('rejected')
  ], WRONG_STATUS_VALUE)
]

const putTutorValidations = [
  ...putValidations,
  check('type')
    .exists()
    .withMessage(MISS_TYPE),
  oneOf([
    check('type').equals('tutor'),
    check('type').equals('cotutor')
  ], WRONG_TYPE_VALUE)
]

export { putValidations, putTutorValidations }
