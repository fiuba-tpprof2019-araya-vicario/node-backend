export default (sequelize) => {
  const UserProfile = sequelize.define('UserProfile', {
  }, {
    underscored: true,
    tableName: 'User_profiles'
  })

  return UserProfile
}
