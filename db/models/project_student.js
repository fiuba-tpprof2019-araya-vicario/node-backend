import { ENUM } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectStudent = sequelize.define('ProjectStudent', {
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
