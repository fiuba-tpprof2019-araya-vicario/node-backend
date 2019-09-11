import { ENUM } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectRequestStudent = sequelize.define('ProjectRequestStudent', {
    status: {
      type: ENUM,
      values: ['pending', 'accepted', 'rejected']
    }
  }, {
    underscored: true,
    tableName: 'Project_request_students'
  })

  ProjectRequestStudent.prototype.pending = function () {
    return this.status === 'pending'
  }

  ProjectRequestStudent.associate = function (models) {
    ProjectRequestStudent.belongsTo(models.Project, {
      foreignKey: {
        name: 'project_id',
        allowNull: false,
        unique: true
      }
    })

    ProjectRequestStudent.belongsTo(models.User, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
        unique: true
      }
    })
  }

  return ProjectRequestStudent
}
