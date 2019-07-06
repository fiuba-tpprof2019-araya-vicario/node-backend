export async function up (queryInterface, Sequelize) {
  return [
    await queryInterface.createTable('User_profiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      profile_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER
    }),
    await queryInterface.addConstraint(
      'User_profiles',
      ['profile_id'],
      {
        type: 'foreign key',
        name: 'user_profile_profile_id_fk',
        references: {
          table: 'Profiles',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ),
    await queryInterface.addConstraint(
      'User_profiles',
      ['user_id'],
      {
        type: 'foreign key',
        name: 'user_profile_user_id_fk',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    )
  ]
}
export function down (queryInterface) {
  return queryInterface.dropTable('User_profiles')
}
