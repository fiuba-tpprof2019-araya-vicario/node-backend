import { Router } from 'express'
import { createValidations } from './projectValidation'
import { createProject, getMyProjects } from './projectController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()

router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('CREATE_PROJECT'), validate(createProject))
router.get('/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getMyProjects))

export default router
