import { INTEGER } from 'sequelize'

export default function (sequelize) {
  const ProfileCredential = sequelize.define('ProfileCredential', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    underscored: true,
    tableName: 'profile_credential'
  })

  return ProfileCredential
}
