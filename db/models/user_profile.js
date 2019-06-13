import { INTEGER } from 'sequelize'

export default function (sequelize) {
  const UserProfile = sequelize.define('User_profiles', {
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
