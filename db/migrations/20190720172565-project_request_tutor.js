export async function up (queryInterface, Sequelize) {
  return [
    await queryInterface.createTable('Project_request_tutors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'accepted', 'rejected']
      },
      type: {
        type: Sequelize.ENUM,
        values: ['tutor', 'cotutor']
      },
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      project_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER
    }),
    await queryInterface.addConstraint(
      'Project_request_tutors',
      ['project_id'],
      {
        type: 'foreign key',
        name: 'project_request_tutor_project_id_fk',
        references: {
          table: 'Projects',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ),
    await queryInterface.addConstraint(
      'Project_request_tutors',
      ['user_id'],
      {
        type: 'foreign key',
        name: 'project_request_tutor_user_id_fk',
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
  return queryInterface.dropTable('Project_request_tutors')
}
