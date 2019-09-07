export default (sequelize) => {
  const ProjectCareer = sequelize.define('ProjectCareer', {
  }, {
    underscored: true,
    tableName: 'Project_careers'
  })

  return ProjectCareer
}