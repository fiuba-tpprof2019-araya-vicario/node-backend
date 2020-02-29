import * as presentationService from './presentationService'
import { codes, createSuccessResponse } from '../util/responser'

export const createPresentation = async function (req, res) {
  let body = req.body
  let response
  response = await presentationService.createPresentation(body.project_id, req.id)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

export const getPresentation = async function (req, res) {
  console.log('presentationController::getPresentation')
  let presentationId = req.params.id
  let response = await presentationService.getPresentation(presentationId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

export const putPresentation = async function (req, res) {
  let body = req.body
  let response = await presentationService.editPresentation(req.id, req.params.id, body)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

export const uploadPresentation = async function (req, res) {
  console.log(req.file)
  let response = await presentationService.uploadPresentation(req.params.id, req.file)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

export const uploadDocumentation = async function (req, res) {
  console.log(req.file)
  let response = await presentationService.uploadDocumentation(req.params.id, req.file)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}
