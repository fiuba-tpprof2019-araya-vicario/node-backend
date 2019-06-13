import { INTEGER } from 'sequelize'

export default function (sequelize) {
  const UserProfile = sequelize.define('UserProfile', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    underscored: true,
    tableName: 'User_profile'
  })

  return UserProfile
}
