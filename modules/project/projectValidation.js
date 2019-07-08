import { check } from 'express-validator/check'

const MISS_NAME = 'Falta el nombre'
const MISS_DESCRIPTION = 'Falta la descripción'
const MISS_TYPE = 'Falta el tipo'
const MISS_STUDENTS = 'Faltan los estudiantes'
const MISS_TUTORS = 'Falta los tutores'

const createValidations = [
  check('name')
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
  check('tutors')
    .exists()
    .withMessage(MISS_TUTORS)
]

module.exports = { createValidations }
