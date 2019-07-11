import { check } from 'express-validator/check'
import { getBadRequest } from '../util/error'
import UserRepository from '../user/userRepository'
import ProjectRepository from './projectRepository'
import { createErrorResponse } from '../util/responser'

const MISS_NAME = 'Falta el nombre'
const MISS_DESCRIPTION = 'Falta la descripción'
const MISS_TYPE = 'Falta el tipo'
const MISS_STUDENTS = 'Faltan los estudiantes'
const MISS_TUTOR = 'Falta el tutor'
const MISS_COTUTORS = 'Faltan los cotutores'
const MISS_PROJECT_ID = 'Falta el id del proyecto'

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
  check('tutor_id')
    .exists()
    .withMessage(MISS_TUTOR),
  check('cotutors')
    .exists()
    .withMessage(MISS_COTUTORS)
]

const getValidations = [
  check('id')
    .exists()
    .withMessage(MISS_PROJECT_ID)
]

const modifyValidations = [
  ...createValidations,
  ...getValidations
]

const checkStudentsAndTutors = () => {
  return async (req, res, next) => {
    try {
      let existStudents = await UserRepository.existStudents(req.body.students)
      let existTutors = await UserRepository.existTutors([req.body.tutor_id, ...req.body.cotutors])
      let existProjectType = await ProjectRepository.existProjectType(req.body.type)
      let creatorIsStudent = req.body.students.includes(req.id)
      let tutorIsCotutor = req.body.cotutors.includes(req.body.tutor_id)
      if (existStudents && existTutors && existProjectType && !creatorIsStudent && !tutorIsCotutor) {
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

const checkExistProject = () => {
  return async (req, res, next) => {
    try {
      let existProject = await ProjectRepository.existProject(req.params.id)
      if (existProject) {
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

export { createValidations, checkStudentsAndTutors, getValidations, modifyValidations, checkExistProject }
