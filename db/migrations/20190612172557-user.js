export function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    surname: Sequelize.STRING,
    padron: Sequelize.INTEGER,
    google_id: Sequelize.STRING,
    similarity: Sequelize.FLOAT
  }).then(function () {
    return queryInterface.addIndex('Users', ['email'])
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Users')
}
