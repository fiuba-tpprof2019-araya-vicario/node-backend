import { Op } from 'sequelize'

const Project = require('../../db/models').Project
const State = require('../../db/models').State

const getProjectsPerMonthStruct = () => {
  return [
    { mes: 1, terminated: 0, progress: 0 },
    { mes: 2, terminated: 0, progress: 0 },
    { mes: 3, terminated: 0, progress: 0 },
    { mes: 4, terminated: 0, progress: 0 },
    { mes: 5, terminated: 0, progress: 0 },
    { mes: 6, terminated: 0, progress: 0 },
    { mes: 7, terminated: 0, progress: 0 },
    { mes: 8, terminated: 0, progress: 0 },
    { mes: 9, terminated: 0, progress: 0 },
    { mes: 10, terminated: 0, progress: 0 },
    { mes: 11, terminated: 0, progress: 0 },
    { mes: 12, terminated: 0, progress: 0 }
  ]
}

const getProjectsPerMonth = (projects) => {
  let data = getProjectsPerMonthStruct()
  for (let i in projects) {
    if (projects[i].dataValues.State.dataValues.id > 4) data[projects[i].dataValues.updatedAt.getMonth()].terminated += 1
    else data[projects[i].dataValues.updatedAt.getMonth()].progress += 1
  }
  return data
}

class DashboardRepository {
  static async getProjectsByYear (year) {
    let initialDate = new Date(year, 0)
    let finalDate = new Date(parseInt(year) + 1, 0)
    console.log('year: ', year)
    console.log('initialDate: ', initialDate)
    console.log('finalDate: ', finalDate)
    let result = await Project.findAll({
      where: { updatedAt: { [Op.and]: { [Op.gte]: initialDate, [Op.lt]: finalDate } } },
      include: [ { model: State, as: 'State' } ]
    })
    console.log(result[0].dataValues.updatedAt.getMonth())
    let data = getProjectsPerMonth(result)
    return data
  }
}

export default DashboardRepository
