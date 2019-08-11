module.exports = (sequelize) => {
  const ProjectStudent = sequelize.define('ProjectStudent', {
  }, {
    underscored: true,
    tableName: 'Project_students'
  })

  return ProjectStudent
}
