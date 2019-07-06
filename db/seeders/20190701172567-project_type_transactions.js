export function up (queryInterface) {
  return queryInterface.bulkInsert('Project_type_transactions', [{
    project_type_id: 1,
    primary_state_id: 1,
    secondary_state_id: 2
  },
  {
    project_type_id: 1,
    primary_state_id: 2,
    secondary_state_id: 3
  },
  {
    project_type_id: 1,
    primary_state_id: 3,
    secondary_state_id: 4
  },
  {
    project_type_id: 1,
    primary_state_id: 4,
    secondary_state_id: 5
  },
  {
    project_type_id: 1,
    primary_state_id: 5,
    secondary_state_id: 6
  },
  {
    project_type_id: 1,
    primary_state_id: 6,
    secondary_state_id: 7
  },
  {
    project_type_id: 2,
    primary_state_id: 1,
    secondary_state_id: 2
  },
  {
    project_type_id: 2,
    primary_state_id: 2,
    secondary_state_id: 3
  },
  {
    project_type_id: 2,
    primary_state_id: 3,
    secondary_state_id: 4
  },
  {
    project_type_id: 2,
    primary_state_id: 4,
    secondary_state_id: 5
  },
  {
    project_type_id: 2,
    primary_state_id: 5,
    secondary_state_id: 6
  },
  {
    project_type_id: 2,
    primary_state_id: 6,
    secondary_state_id: 7
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
