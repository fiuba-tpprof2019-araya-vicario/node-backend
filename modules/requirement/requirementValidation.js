import { check } from 'express-validator'
import { getBadRequest } from '../util/error'
import { createErrorResponse } from '../util/responser'

const MISS_NAME = 'Falta el nombre'
const MISS_DESCRIPTION = 'Falta la descripción'

const createValidations = [
  check('name')
    .exists()
    .withMessage(MISS_NAME),
  check('description')
    .exists()
    .withMessage(MISS_DESCRIPTION)
]

const checkCreatorTutor = () => {
  return async (req, res, next) => {
    try {
      // let creatorIsTutor = await UserRepository.existTutors([req.params.id])
      let creatorIsTutor = true
      if (creatorIsTutor) {
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

export { createValidations, checkCreatorTutor }
