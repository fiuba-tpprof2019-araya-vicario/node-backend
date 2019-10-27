// ADMIN 1

// 'CREATE_PROJECTS' 1
// 'EDIT_PROJECTS' 2
// 'GET_PROJECTS' 3
// 'EDIT_USERS' 4
// 'GET_USERS' 5
// 'EDIT_PROFILES' 6
// 'GET_PROFILES' 7
// 'EDIT_TUTOR_REQUESTS 8
// 'EDIT_REQUIREMENTS 10
// 'GET_REQUIREMENTS 11
// 'GET_DASHBOARD 12

export function up (queryInterface) {
  return queryInterface.bulkInsert('Profile_credentials', [{
    profile_id: 1,
    credential_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 1,
    credential_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 1,
    credential_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 1,
    credential_id: 4,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 1,
    credential_id: 5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 1,
    credential_id: 6,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 1,
    credential_id: 7,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 1,
    credential_id: 8,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 1,
    credential_id: 9,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 1,
    credential_id: 10,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 1,
    credential_id: 11,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    profile_id: 1,
    credential_id: 12,
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
