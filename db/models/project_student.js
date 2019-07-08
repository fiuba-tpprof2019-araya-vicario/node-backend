import { INTEGER, ENUM } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectStudent = sequelize.define('ProjectStudent', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_type: {
      type: ENUM,
      values: [
        'Creador',
        'Integrante'
      ]
    }
  }, {
    underscored: true,
    tableName: 'Project_students'
  })

  return ProjectStudent
}
