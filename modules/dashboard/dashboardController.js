import * as dashboardService from './dashboardService'
import { codes, createSuccessResponse } from '../util/responser'

const getProjectsByYear = async function (req, res) {
  let response = await dashboardService.getProjectsByYear(req.query.year)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { getProjectsByYear }
