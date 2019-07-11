import { Router } from 'express'
import { createValidations, checkStudentsAndTutors, getValidations, modifyValidations, checkExistProject } from './projectValidation'
import { createProject, getMyProjects, getProject, putProject } from './projectController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()

router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('CREATE_PROJECT'), checkStudentsAndTutors(), validate(createProject))
router.get('/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getMyProjects))
router.get('/:id', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getProject))
router.put('/:id', modifyValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), checkStudentsAndTutors(), checkExistProject(), validate(putProject))

export default router
