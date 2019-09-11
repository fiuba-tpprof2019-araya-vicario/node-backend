import { check, param } from 'express-validator'

const MISS_REQUEST_ID = 'Falta el id de la solicitud'
const MISS_STATUS = 'Falta el estado'
const WRONG_STATUS_VALUE = 'Estado invalido'
const MISS_TYPE = 'Falta el tipo'
const WRONG_TYPE_VALUE = 'Tipo invalido'

const putValidations = [
  param('id')
    .not().isEmpty()
    .withMessage(MISS_REQUEST_ID),
  check('status')
    .not().isEmpty()
    .withMessage(MISS_STATUS)
    .isIn(['accepted', 'rejected'])
    .withMessage(WRONG_STATUS_VALUE)
]

const putTutorValidations = [
  ...putValidations,
  check('type')
    .not().isEmpty()
    .withMessage(MISS_TYPE)
    .isIn(['tutor', 'cotutor'])
    .withMessage(WRONG_TYPE_VALUE)
]

export { putValidations, putTutorValidations }
