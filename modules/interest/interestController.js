import * as interestService from './interestService'
import { codes, createSuccessResponse } from '../util/responser'

const getInterests = async function (req, res) {
  let response = await interestService.getInterests(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getUserInterests = async function (req, res) {
  let response = await interestService.getUserInterests(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const editUserInterests = async function (req, res) {
  console.log('requestController::putStudentRequest')
  console.log('body: ', req.body)
  let body = req.body
  let response = await interestService.editUserInterests(req.params.id, body.status, body.accepted_proposal)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { getInterests, getUserInterests, editUserInterests }
