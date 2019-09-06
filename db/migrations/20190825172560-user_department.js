export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('User_departments', {
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    user_id: Sequelize.INTEGER,
    department_id: Sequelize.INTEGER
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('User_departments')
}
