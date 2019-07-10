import { check } from 'express-validator/check'
import { getBadRequest } from '../util/error'
import UserRepository from '../user/userRepository'
import ProjectRepository from './projectRepository'

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

const checkStudentsAndTutors = () => {
  return async (req, res, next) => {
    try {
      let existStudents = await UserRepository.existStudents(req.body.students)
      let existTutors = await UserRepository.existTutors(req.body.tutors)
      let existProjectType = await ProjectRepository.existProjectType(req.body.type)
      if (existStudents && existTutors && existProjectType) {
        next()
      } else {
        next(getBadRequest())
      }
    } catch (e) {
      next(getBadRequest())
    }
  }
}

export { createValidations, checkStudentsAndTutors }
