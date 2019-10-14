const Requirement = require('../../db/models').Requirement
const User = require('../../db/models').User

class RequirementRepository {
  static getById (requirementId) {
    return Requirement.findByPk(requirementId)
  }

  static getAll () {
    return Requirement.findAll({
      include: [ { model: User, as: 'Creator', attributes: { exclude: ['google_id'] } } ]
    })
  }

  static create (creatorId, name, description, fileDriveId, fileUrl, fileName) {
    return Requirement.create({
      name,
      description,
      creator_id: creatorId,
      status: 'inactive',
      file_drive_id: fileDriveId,
      file_url: fileUrl,
      file_name: fileName
    })
      .then(requirement => {
        return requirement.dataValues.id
      })
  }

  static edit (creatorId, requirementId, name, description, fileDriveId, fileUrl, fileName) {
    return Requirement.update(
      { name,
        description,
        file_drive_id: fileDriveId,
        file_url: fileUrl,
        file_name: fileName },
      { where: { id: requirementId },
        include: [ { model: User, as: 'Creator', where: { id: creatorId } } ] }
    )
      .then((result) => {
        if (result[0] > 0) return Requirement.findByPk(requirementId, { include: [ { model: User, as: 'Creator' } ] })
        else return null
      })
  }

  static delete (id) {
    return Requirement.destroy({
      where: { id }
    })
      .then((result) => {
        if (result > 0) return id
        else return null
      })
  }

  static isRequirementCreator (creatorId, requirementId) {
    return Requirement.findOne({ where: { id: requirementId }, include: [ { model: User, as: 'Creator', where: { id: creatorId } } ] })
      .then(requirement => {
        return requirement != null
      })
  }
}

export default RequirementRepository
