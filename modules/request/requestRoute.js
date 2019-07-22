import { Router } from 'express'
import { getStudentRequests, getTutorRequests } from './requestController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/students/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getStudentRequests))
router.get('/tutors/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getTutorRequests))

export default router
