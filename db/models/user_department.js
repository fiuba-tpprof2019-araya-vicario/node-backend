export default (sequelize) => {
  const UserDepartment = sequelize.define('UserDepartment', {
  }, {
    underscored: true,
    tableName: 'User_departments'
  })

  return UserDepartment
}
