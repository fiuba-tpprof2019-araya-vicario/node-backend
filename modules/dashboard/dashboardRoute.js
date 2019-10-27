import { Router } from 'express'
import { getValidations } from './dashboardValidation'
import { getProjectsByYear } from './dashboardController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_DASHBOARD'), validate(getProjectsByYear))

export default router
