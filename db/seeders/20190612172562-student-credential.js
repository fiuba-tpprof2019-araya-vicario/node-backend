// STUDENT 2

// 'CREATE_PROJECTS' 1
// 'EDIT_PROJECTS' 2
// 'GET_PROJECTS' 3
// 'GET_USERS' 5

export function up (queryInterface) {
  return queryInterface.bulkInsert('Profile_credentials', [{
    profile_id: 2,
    credential_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 2,
    credential_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 2,
    credential_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 2,
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
