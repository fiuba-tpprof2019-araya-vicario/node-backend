export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('User_careers', {
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    user_id: Sequelize.INTEGER,
    career_id: Sequelize.INTEGER
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('User_careers')
}
