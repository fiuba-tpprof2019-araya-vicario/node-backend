module.exports = (sequelize) => {
  const ProjectCotutor = sequelize.define('ProjectCotutor', {
  }, {
    underscored: true,
    tableName: 'Project_cotutors'
  })

  return ProjectCotutor
}
