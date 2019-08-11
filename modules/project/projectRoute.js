import { Router } from 'express'
import { createValidations, checkStudentsAndTutors, getValidations, modifyValidations, checkExistProject } from './projectValidation'
import { createProject, getProject, getStudentProjects, getTutorProjects, putProject } from './projectController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/students/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getStudentProjects))
router.get('/tutors/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getTutorProjects))
router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('CREATE_PROJECT'), checkStudentsAndTutors(), validate(createProject))
router.put('/:id([0-9]+)?/', modifyValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_PROJECT'), checkStudentsAndTutors(), checkExistProject(), validate(putProject))
router.get('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getProject))

export default router
