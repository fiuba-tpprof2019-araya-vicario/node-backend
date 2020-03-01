const Project = require('../../db/models').Project
const State = require('../../db/models').State
const Presentation = require('../../db/models').Presentation

class PresentationRepository {
  static getPresentationById (id) {
    return Project.findByPk(id)
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

  static edit (presentationId, data) {
    return Presentation.update(
      { description: data.description },
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
    let presentation = await Presentation.create({ status: 'created' })
    await Project.update(
      { presentation_id: presentation.dataValues.id },
      { where: { id: projectId } })
    return presentation.dataValues.id
  }

  static async isProjectCreator (presentationId, creatorId) {
    return Project.findOne({ where: { presentation_id: presentationId, creator_id: creatorId, state_id: State.pendingPresentation() } })
      .then(project => {
        return project != null
      })
  }
}

export default PresentationRepository
