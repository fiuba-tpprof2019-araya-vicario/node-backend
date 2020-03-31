import { Op } from 'sequelize'

const Project = require('../../db/models').Project
const State = require('../../db/models').State
const Presentation = require('../../db/models').Presentation

const STATUS_PRESENTATION = {
  CREATED: 'created',
  ACCEPTED: 'accepted'
}

class PresentationRepository {
  static getPresentationById (id) {
    return Presentation.findByPk(id)
  }

  static existPresentation (id) {
    return Presentation.count({
      where: { id }
    })
      .then(count => {
        if (count > 0) {
          return true
        }
        return false
      })
  }

  static edit (presentationId, data, isAdmin) {
    let updatePresentationObject = {}

    if (data.description !== undefined) updatePresentationObject.description = data.description
    if (data.presentation_visible !== undefined && isAdmin)
      updatePresentationObject.presentation_visible = data.presentation_visible
    if (data.documentation_visible !== undefined && isAdmin)
      updatePresentationObject.documentation_visible = data.documentation_visible
    return Presentation.update(
      updatePresentationObject,
      { where: { id: presentationId } }
    )
      .then(() => {
        return presentationId
      })
  }

  static updatePresentation (presentationId, driveId, link, name) {
    return Presentation.update(
      { presentation_drive_id: driveId, presentation_url: link, presentation_name: name },
      { where: { id: presentationId } }
    )
  }

  static updateDocumentation (presentationId, driveId, link, name) {
    return Presentation.update(
      { documentation_drive_id: driveId, documentation_url: link, documentation_name: name },
      { where: { id: presentationId } }
    )
  }

  static async createPresentation (projectId) {
    let presentation = await Presentation.create({ status: STATUS_PRESENTATION.CREATED })
    await Project.update(
      { presentation_id: presentation.dataValues.id },
      { where: { id: projectId } })
    return presentation.dataValues.id
  }

  static async isProjectCreator (presentationId, creatorId) {
    return Project.findOne({ where: { presentation_id: presentationId, creator_id: creatorId, state_id: State.pendingPublication() } })
      .then(project => {
        return project != null
      })
  }

  static async canSubmitPresentation (presentationId) {
    return Presentation.findOne({ where: { id: presentationId, presentation_url: { [Op.ne]: null }, documentation_url: { [Op.ne]: null }, status: STATUS_PRESENTATION.CREATED } })
      .then(presentation => {
        return presentation != null
      })
  }

  static acceptPresentation (presentationId) {
    return Presentation.update(
      { status: STATUS_PRESENTATION.ACCEPTED },
      { where: { id: presentationId } }
    )
  }

  static getProjectByPresentationId (presentationId) {
    return Project.findOne({ where: { presentation_id: presentationId } })
  }
}

export default PresentationRepository
