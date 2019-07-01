export function up (queryInterface, Sequelize) {
  return queryInterface.createTable('States', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    name: Sequelize.STRING,
    description: Sequelize.STRING
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('States')
}
