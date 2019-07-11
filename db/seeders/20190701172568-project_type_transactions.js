export function up (queryInterface) {
  return queryInterface.bulkInsert('Project_type_transactions', [{
    project_type_id: 1,
    primary_state_id: 1,
    secondary_state_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type_id: 1,
    primary_state_id: 2,
    secondary_state_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type_id: 1,
    primary_state_id: 3,
    secondary_state_id: 4,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type_id: 1,
    primary_state_id: 4,
    secondary_state_id: 5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type_id: 1,
    primary_state_id: 5,
    secondary_state_id: 6,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type_id: 1,
    primary_state_id: 6,
    secondary_state_id: 7,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type_id: 2,
    primary_state_id: 1,
    secondary_state_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type_id: 2,
    primary_state_id: 2,
    secondary_state_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type_id: 2,
    primary_state_id: 3,
    secondary_state_id: 4,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type_id: 2,
    primary_state_id: 4,
    secondary_state_id: 5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type_id: 2,
    primary_state_id: 5,
    secondary_state_id: 6,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type_id: 2,
    primary_state_id: 6,
    secondary_state_id: 7,
    created_at: new Date(),
    updated_at: new Date()
  }], {})
}
export function down () {
  /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkDelete('Person', null, {})
  */
}
