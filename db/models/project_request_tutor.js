import { ENUM } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectRequestTutor = sequelize.define('ProjectRequestTutor', {
    status: {
      type: ENUM,
      values: ['pending', 'accepted', 'rejected']
    },
    accepted_proposal: {
      type: ENUM,
      values: ['pending', 'accepted', 'rejected']
    },
    type: {
      type: ENUM,
      values: ['tutor', 'cotutor']
    }
  }, {
    underscored: true,
    tableName: 'Project_request_tutors'
  })

  ProjectRequestTutor.prototype.pending = function () {
    return this.status === 'pending'
  }

  ProjectRequestTutor.prototype.isTutor = function () {
    return this.type === 'tutor'
  }

  ProjectRequestTutor.associate = function (models) {
    ProjectRequestTutor.belongsTo(models.Project, {
      foreignKey: { name: 'project_id' }
    })

    ProjectRequestTutor.belongsTo(models.User, {
      foreignKey: { name: 'user_id' }
    })
  }

  return ProjectRequestTutor
}
