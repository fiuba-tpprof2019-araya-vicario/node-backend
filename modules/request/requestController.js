import { getAllStudentRequests, getAllTutorRequests } from './requestService'
import { codes, createSuccessResponse } from '../util/responser'

const getStudentRequests = async function (req, res) {
  let response = await getAllStudentRequests(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getTutorRequests = async function (req, res) {
  let response = await getAllTutorRequests(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { getStudentRequests, getTutorRequests }
