import { STRING } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectHistory = sequelize.define('ProjectHistory', {
    comment: STRING
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Project_history'
  })

  ProjectHistory.associate = function (models) {
    ProjectHistory.belongsTo(models.Project, {
      foreignKey: {
        name: 'project_id',
        allowNull: false,
        unique: true
      }
    })

    ProjectHistory.belongsTo(models.State, {
      foreignKey: {
        name: 'state_id',
        allowNull: false,
        unique: true
      }
    })

    ProjectHistory.belongsTo(models.User, {
      foreignKey: {
        name: 'created_by',
        allowNull: false,
        unique: true
      }
    })
  }

  return ProjectHistory
}
