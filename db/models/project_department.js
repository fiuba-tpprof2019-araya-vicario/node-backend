export default (sequelize) => {
  const ProjectDepartment = sequelize.define('ProjectDepartment', {
  }, {
    underscored: true,
    tableName: 'Project_departments'
  })

  return ProjectDepartment
}