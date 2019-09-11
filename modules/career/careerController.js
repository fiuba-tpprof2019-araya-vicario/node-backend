import { addCareer, getSpecificCareer, getCareers, editCareer, removeCareer } from './careerService'
import { codes, createSuccessResponse } from '../util/responser'

const createCareer = async function (req, res) {
  let body = req.body
  let response = await addCareer(req.id, body.name, body.description)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const getCareer = async function (req, res) {
  let careerId = req.params.id
  let response = await getSpecificCareer(careerId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getAllCareers = async function (req, res) {
  let response = await getCareers(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const putCareer = async function (req, res) {
  let body = req.body
  let response = await editCareer(req.id, req.params.id, body.name, body.description)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const deleteCareer = async function (req, res) {
  let careerId = req.params.id
  let response = await removeCareer(careerId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { createCareer, getCareer, getAllCareers, putCareer, deleteCareer }
