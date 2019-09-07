// COMISION 4

// 'GET_PROJECTS' 3
// 'APPROVE_PROJECTS 9

export function up (queryInterface) {
  return queryInterface.bulkInsert('Profile_credentials', [{
    profile_id: 4,
    credential_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 4,
    credential_id: 9,
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
