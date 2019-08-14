import { Router } from 'express'
import { getStudentRequests, getTutorRequests, putStudentRequest, putTutorRequest } from './requestController'
import { putValidations, putTutorValidations } from './requestValidation'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/students/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getStudentRequests))
router.get('/tutors/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getTutorRequests))
router.put('/students/:id([0-9]+)?/', putValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(putStudentRequest))
router.put('/tutors/:id([0-9]+)?/', putTutorValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(putTutorRequest))

export default router
