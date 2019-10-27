import { query } from 'express-validator'

const MISS_YEAR = 'Falta el año'
const WRONG_YEAR = 'No es un año valido'

const getValidations = [
  query('year')
    .not().isEmpty()
    .withMessage(MISS_YEAR)
    .isInt()
    .withMessage(WRONG_YEAR)
]

export { getValidations }
