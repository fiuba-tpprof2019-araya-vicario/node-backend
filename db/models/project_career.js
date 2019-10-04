import { ENUM, TEXT } from 'sequelize'

export default (sequelize) => {
  const ProjectCareer = sequelize.define('ProjectCareer', {
    reject_reason: {
      type: TEXT
    },
    status: {
      type: ENUM,
      values: ['pending', 'accepted', 'rejected']
    }
  }, {
    underscored: true,
    tableName: 'Project_careers'
  })

  ProjectCareer.associate = function (models) {
    ProjectCareer.belongsTo(models.Project, {
      foreignKey: {
        name: 'project_id',
        allowNull: false,
        unique: true
      }
    })

    ProjectCareer.belongsTo(models.Career, {
      foreignKey: {
        name: 'career_id',
        allowNull: false,
        unique: true
      }
    })
  }

  return ProjectCareer
}
