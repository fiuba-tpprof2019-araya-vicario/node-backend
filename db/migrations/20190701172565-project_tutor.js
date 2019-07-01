export async function up (queryInterface, Sequelize) {
  return [
    await queryInterface.createTable('Project_tutors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      project_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER,
      tutor_type: {
        type: Sequelize.ENUM,
        values: [
          'Tutor',
          'Co-tutor'
        ]
      }
    }),
    await queryInterface.addConstraint(
      'Project_tutors',
      ['project_id'],
      {
        type: 'foreign key',
        name: 'project_tutor_project_id_fk',
        references: {
          table: 'Projects',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ),
    await queryInterface.addConstraint(
      'Project_tutors',
      ['user_id'],
      {
        type: 'foreign key',
        name: 'project_tutor_user_id_fk',
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
  return queryInterface.dropTable('Project_tutors')
}
