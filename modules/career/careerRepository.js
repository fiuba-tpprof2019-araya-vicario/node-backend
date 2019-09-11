const Career = require('../../db/models').Career

class CareerRepository {
  static getCareerById (id) {
    return Career.findByPk(id)
  }

  static getCareers () {
    return Career.findAll()
  }

  static create (name, description) {
    return Career.create({
      name,
      description
    })
  }

  static existCareer (id) {
    return Career.count({
      where: { id }
    })
      .then(count => {
        if (count > 0) {
          return true
        }
        return false
      })
  }

  static edit (id, name, description) {
    return Career.update({ name, description }, { where: { id } })
      .then((result) => {
        if (result[0] > 0) return Career.findByPk(id)
        else return null
      })
  }

  static deleteById (id) {
    return Career.destroy({
      where: { id }
    })
      .then(() => {
        return id
      })
  }
}

export default CareerRepository
