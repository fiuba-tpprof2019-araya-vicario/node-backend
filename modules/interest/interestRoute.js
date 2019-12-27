import { Router } from 'express'
import * as interestController from './interestController'
import { editUserInterestValidations } from './interestValidation'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(interestController.getInterests))
router.get('/users/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(interestController.getUserInterests))
router.put('/users/', editUserInterestValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(interestController.editUserInterests))

export default router
