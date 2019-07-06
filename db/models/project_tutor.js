import { INTEGER, ENUM } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectTutor = sequelize.define('ProjectTutor', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tutor_type: {
      type: ENUM,
      values: [
        'Tutor',
        'Co-tutor'
      ]
    }
  }, {
    underscored: true,
    tableName: 'Profile_tutors'
  })

  return ProjectTutor
}
