const Requirement = require('../../db/models').Requirement
const User = require('../../db/models').User

class RequirementRepository {
  static getAll () {
    return Requirement.findAll({
      include: [ { model: User, as: 'Creator', attributes: { exclude: ['google_id'] } } ]
    })
  }

  static create (creatorId, name, description) {
    return Requirement.create({
      name,
      description,
      creator_id: creatorId,
      status: 'inactive'
    })
      .then(requirement => {
        return requirement.dataValues.id
      }).catch((e) => {
        console.error(e)
        return null
      })
  }
}

export default RequirementRepository
