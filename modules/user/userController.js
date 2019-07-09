import { getUserById, getUsersByProfile } from './userService'
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

module.exports = { getUser, getUsers }
