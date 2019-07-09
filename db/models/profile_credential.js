export default (sequelize) => {
  const ProfileCredential = sequelize.define('ProfileCredential', {
  }, {
    underscored: true,
    tableName: 'Profile_credentials'
  })

  return ProfileCredential
}
