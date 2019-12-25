export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('User_interests', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    score: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    interest_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Interests',
        key: 'id'
      }
    },
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('User_interests')
}
