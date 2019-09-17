import * as profileService from './profileService'
import { codes, createSuccessResponse } from '../util/responser'

const getProfiles = async function (req, res) {
  let response = await profileService.getProfiles()
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { getProfiles }
