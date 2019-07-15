import { Router } from 'express'
import { createValidations, checkStudentsAndTutors, getValidations, modifyValidations, checkExistProject } from './projectValidation'
import { createProject, getProject, getMyProjects, getStudentProjects, getTutorProjects, putProject } from './projectController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/students/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getStudentProjects))
router.get('/tutors/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getTutorProjects))
router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('CREATE_PROJECT'), checkStudentsAndTutors(), validate(createProject))
router.get('/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getMyProjects))
router.put('/:id', modifyValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_PROJECTS'), checkStudentsAndTutors(), checkExistProject(), validate(putProject))
router.get('/:id', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getProject))

export default router
