import { getUserById, getUsersByProfile, createUser } from './userService'
import { codes, createSuccessResponse } from '../util/responser'

const getUser = async function (req, res) {
  let userId = req.params.id
  let response = await getUserById(userId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getUsers = async function (req, res) {
  let profileId = req.query.profile_id
  let response = await getUsersByProfile(profileId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const createAux = async function (req, res) {
  let user = await createUser('prueba@fi.uba.ar', 'prueba', 'prueba', 'null', 92224, [3])
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, user))
}

module.exports = { getUser, getUsers, createAux }
