import * as userService from './userService'
import { codes, createSuccessResponse } from '../util/responser'

const getUser = async function (req, res) {
  console.log('userController::getUser')
  let userId = req.params.id
  let response = await userService.getUser(userId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getUsers = async function (req, res) {
  console.log('userController::getUsers')
  console.log(req.query)
  let response = await userService.getUsers(req.query)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const createAux = async function (req, res) {
  console.log('userController::createAux')
  let user = await userService.createUser('prueba@fi.uba.ar', 'prueba', 'prueba', 'null', 92224, [3])
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, user))
}

const getProfiles = async function (req, res) {
  console.log('userController::getProfiles')
  let response = await userService.getProfiles()
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { getUser, getUsers, createAux, getProfiles }
