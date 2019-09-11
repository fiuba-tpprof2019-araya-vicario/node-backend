export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Profile_credentials', {
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    profile_id: Sequelize.INTEGER,
    credential_id: Sequelize.INTEGER
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Profile_credentials')
}
