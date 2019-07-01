import { STRING } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectType = sequelize.define('ProjectType', {
    name: STRING
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Project_types'
  })

  return ProjectType
}
