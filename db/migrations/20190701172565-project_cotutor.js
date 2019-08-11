export async function up (queryInterface, Sequelize) {
  return [
    await queryInterface.createTable('Project_cotutors', {
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      project_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER
    }),
    await queryInterface.addConstraint(
      'Project_cotutors',
      ['project_id'],
      {
        type: 'foreign key',
        name: 'project_cotutor_project_id_fk',
        references: {
          table: 'Projects',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ),
    await queryInterface.addConstraint(
      'Project_cotutors',
      ['user_id'],
      {
        type: 'foreign key',
        name: 'project_cotutor_user_id_fk',
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
  return queryInterface.dropTable('Project_cotutors')
}
