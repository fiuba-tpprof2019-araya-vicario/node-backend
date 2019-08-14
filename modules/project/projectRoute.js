import { Router } from 'express'
import { createValidations, getValidations, modifyValidations } from './projectValidation'
import { createProject, getProject, getStudentProjects, getTutorProjects, putProject, deleteProject } from './projectController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/students/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getStudentProjects))
router.get('/tutors/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getTutorProjects))
router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('CREATE_PROJECT'), validate(createProject))
router.put('/:id([0-9]+)?/', modifyValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_PROJECT'), validate(putProject))
router.get('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getProject))
router.delete('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_PROJECT'), validate(deleteProject))

export default router
