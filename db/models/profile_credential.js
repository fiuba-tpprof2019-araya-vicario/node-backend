import { INTEGER } from 'sequelize'

module.exports = (sequelize) => {
  const ProfileCredential = sequelize.define('ProfileCredential', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    underscored: true,
    tableName: 'Profile_credentials'
  })

  return ProfileCredential
}
