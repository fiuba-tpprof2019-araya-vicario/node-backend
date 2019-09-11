export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('User_profiles', {
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    profile_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('User_profiles')
}
