// TUTOR 3

// 'GET_PROJECTS' 3
// 'EDIT_TUTOR_REQUESTS 8
// 'EDIT_REQUIREMENTS 10

export function up (queryInterface) {
  return queryInterface.bulkInsert('Profile_credentials', [{
    profile_id: 3,
    credential_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 3,
    credential_id: 8,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 3,
    credential_id: 10,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 3,
    credential_id: 5,
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
