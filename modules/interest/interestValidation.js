import { check } from 'express-validator'

const MISS_INTERESTS = 'Faltan los intereses'
const MISS_INTEREST_ID = 'Falta el id del interes'
const MISS_INTEREST_SCORE = 'Falta la puntuacion del interes'

export const editUserInterestValidations = [
  check('interests')
    .exists()
    .withMessage(MISS_INTERESTS),
  check('interests.*.id')
    .exists()
    .withMessage(MISS_INTEREST_ID),
  check('interests.*.score')
    .exists()
    .withMessage(MISS_INTEREST_SCORE)
]
