export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Project_request_tutors', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'accepted', 'rejected']
    },
    type: {
      type: Sequelize.ENUM,
      values: ['tutor', 'cotutor']
    },
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    project_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Project_request_tutors')
}
