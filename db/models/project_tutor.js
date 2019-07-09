import { ENUM } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectTutor = sequelize.define('ProjectTutor', {
    tutor_type: {
      type: ENUM,
      values: [
        'Tutor',
        'Co-tutor'
      ]
    }
  }, {
    underscored: true,
    tableName: 'Project_tutors'
  })

  return ProjectTutor
}
