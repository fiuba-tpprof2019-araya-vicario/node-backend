import { INTEGER } from 'sequelize'

module.exports = (sequelize) => {
  const UserProfile = sequelize.define('UserProfile', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    underscored: true,
    tableName: 'User_profiles'
  })

  return UserProfile
}
