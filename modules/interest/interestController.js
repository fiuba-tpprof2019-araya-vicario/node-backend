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
  console.log('interestController::putStudentRequest')
  console.log('body: ', req.body)
  console.log('userId: ', req.id)
  let body = req.body
  let response = await interestService.editUserInterests(req.id, body.interests)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getSimilarUsers = async function (req, res) {
  console.log('interestController::getSimilarUsers')
  console.log('userId: ', req.id)

  let response = await interestService.getSimilarUsers(req.id, eq.query.type)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { getInterests, getUserInterests, editUserInterests, getSimilarUsers }
