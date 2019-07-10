import { Router } from 'express'
import { createValidations, checkStudentsAndTutors } from './projectValidation'
import { createProject, getMyProjects } from './projectController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()

router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('CREATE_PROJECT'), checkStudentsAndTutors(), validate(createProject))
router.get('/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getMyProjects))

export default router
