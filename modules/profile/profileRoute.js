import { Router } from 'express'
import { getProfiles } from './profileController'
import { validate } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/', checkIsLoggedWithCredentials('GET_USERS'), validate(getProfiles))

export default router
