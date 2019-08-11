export function up (queryInterface) {
  return queryInterface.bulkInsert('Project_cotutors', [{
    user_id: 3,
    project_id: 1,
    tutor_type: 'Tutor'
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
