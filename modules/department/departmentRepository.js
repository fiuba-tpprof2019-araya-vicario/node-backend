const Department = require('../../db/models').Department

class DepartmentRepository {
  static getDepartmentById (id) {
    return Department.findByPk(id)
  }

  static getDepartments () {
    return Department.findAll()
  }

  static create (name, description) {
    return Department.create({
      name,
      description
    })
  }

  static existDepartment (id) {
    return Department.count({
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
    return Department.update({ name, description }, { where: { id } })
      .then((result) => {
        if (result[0] > 0) return Department.findByPk(id)
        else return null
      })
  }

  static deleteById (id) {
    return Department.destroy({
      where: { id }
    })
      .then(() => {
        return id
      })
  }
}

export default DepartmentRepository
