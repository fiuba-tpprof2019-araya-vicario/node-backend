import { Router } from 'express'
import { getProfiles } from './profileController'
import { validate } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getProfiles))

export default router
