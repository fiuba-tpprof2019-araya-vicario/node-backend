export async function up (queryInterface, Sequelize) {
  return [
    await queryInterface.createTable('Profile_credentials', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      profile_id: Sequelize.INTEGER,
      credential_id: Sequelize.INTEGER
    }),
    await queryInterface.addConstraint(
      'Profile_credentials',
      ['credential_id'],
      {
        type: 'foreign key',
        name: 'profile_credential_credential_id_fk',
        references: {
          table: 'Credentials',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ),
    await queryInterface.addConstraint(
      'Profile_credentials',
      ['profile_id'],
      {
        type: 'foreign key',
        name: 'profile_credential_profile_fk',
        references: {
          table: 'Profiles',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    )
  ]
}
export function down (queryInterface) {
  return queryInterface.dropTable('Profile_credentials')
}
