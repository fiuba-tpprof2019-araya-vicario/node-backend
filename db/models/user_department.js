export default (sequelize) => {
  const UserCareer = sequelize.define('UserCareer', {
  }, {
    underscored: true,
    tableName: 'User_careers'
  })

  return UserCareer
}
