import { getAllStudentRequests, getAllTutorRequests, modifyStudentRequest, modifyTutorRequest } from './requestService'
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

const putStudentRequest = async function (req, res) {
  let body = req.body
  let response = await modifyStudentRequest(req.params.id, body.status)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const putTutorRequest = async function (req, res) {
  let body = req.body
  let response = await modifyTutorRequest(req.params.id, body.status)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { getStudentRequests, getTutorRequests, putStudentRequest, putTutorRequest }
