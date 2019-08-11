export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Project_students', {
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    project_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Project_students')
}
