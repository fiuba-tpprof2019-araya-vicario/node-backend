import { INTEGER } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectStudent = sequelize.define('ProjectStudent', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    underscored: true,
    tableName: 'Profile_students'
  })

  return ProjectStudent
}
