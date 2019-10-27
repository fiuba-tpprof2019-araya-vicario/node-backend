import { getNotFound } from '../util/error'
import DashboardRepository from './dashboardRepository'

const getProjectsByYear = async (year) => {
  return DashboardRepository.getProjectsByYear(year)
    .then(career => {
      if (career == null) return Promise.reject(getNotFound())
      else return Promise.resolve(career)
    })
}

module.exports = { getProjectsByYear }
