import { getServiceError, getNotFound, getBadRequest } from '../util/error'
import DepartmentRepository from './departmentRepository'
import UserRepository from '../user/userRepository'

const getSpecificDepartment = async (departmentId) => {
  return new Promise(async (resolve, reject) => {
    return DepartmentRepository.getDepartmentById(departmentId)
      .then(department => {
        if (department == null) return reject(getNotFound())
        else return resolve(department)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const getDepartments = async () => {
  return new Promise(async (resolve, reject) => {
    return DepartmentRepository.getDepartments()
      .then(departments => {
        return resolve(departments)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const getDepartmentsByUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    return UserRepository.getDepartments(userId)
      .then(departments => {
        return resolve(departments)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const addDepartment = async (creatorId, name, description) => {
  return new Promise(async (resolve, reject) => {
    return DepartmentRepository.create(name, description)
      .then(departmentId => {
        return resolve(departmentId)
      })
      .catch(() => {
        return reject(getBadRequest())
      })
  })
}

const editDepartment = async (creatorId, departmentId, name, description) => {
  if (!(await DepartmentRepository.existDepartment(departmentId))) return Promise.reject(getBadRequest('El departamento que quieres editar no existe'))

  return new Promise(async (resolve, reject) => {
    return DepartmentRepository.edit(departmentId, name, description)
      .then(departmentId => {
        return resolve(departmentId)
      })
      .catch(() => {
        return reject(getBadRequest())
      })
  })
}

const removeDepartment = async (departmentId) => {
  return new Promise(async (resolve, reject) => {
    return DepartmentRepository.deleteById(departmentId)
      .then(departmentId => {
        return resolve(departmentId)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

module.exports = { addDepartment, getSpecificDepartment, getDepartments, editDepartment, removeDepartment }
