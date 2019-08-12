import { check, param, oneOf } from 'express-validator/check'
import { getBadRequest } from '../util/error'
import RequestRepository from './requestRepository'
import { createErrorResponse } from '../util/responser'

const MISS_STATUS = 'Falta el estado'
const MISS_REQUEST_ID = 'Falta el id de la solicitud'
const WRONG_STATUS_VALUE = 'Estado invalido'

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

const checkRequestStudent = () => {
  return async (req, res, next) => {
    try {
      let request = await RequestRepository.getRequestStudentById(req.params.id)
      if (request != null && request.dataValues.status === 'pending') {
        next()
      } else {
        let error = getBadRequest()
        res.statusCode = error.status
        res.json(createErrorResponse(error.status, error, null))
      }
    } catch (e) {
      let error = getBadRequest()
      res.statusCode = error.status
      res.json(createErrorResponse(error.status, error, null))
    }
  }
}

const checkRequestTutor = () => {
  return async (req, res, next) => {
    try {
      let request = await RequestRepository.getRequestTutorById(req.params.id)
      if (request != null && request.dataValues.status === 'pending') {
        next()
      } else {
        let error = getBadRequest()
        res.statusCode = error.status
        res.json(createErrorResponse(error.status, error, null))
      }
    } catch (e) {
      let error = getBadRequest()
      res.statusCode = error.status
      res.json(createErrorResponse(error.status, error, null))
    }
  }
}

export { putValidations, checkRequestStudent, checkRequestTutor }
