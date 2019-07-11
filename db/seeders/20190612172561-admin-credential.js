// ADMIN 1

// 'CREATE_PROJECT' 1
// 'EDIT_PROJECT' 2
// 'GET_PROJECTS' 3
// 'CREATE_USER' 4
// 'GET_USERS' 5
// 'EDIT_USERS' 6
// 'CREATE_PROFILE' 7
// 'GET_PROFILES' 8
// 'EDIT_PROFILES 9

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
