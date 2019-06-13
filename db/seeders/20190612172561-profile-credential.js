
export function up (queryInterface) {
  return queryInterface.bulkInsert('Profile_credentials', [{
    profile_id: 1,
    credential_id: 1
  },
  {
    profile_id: 1,
    credential_id: 2
  },
  {
    profile_id: 1,
    credential_id: 3
  },
  {
    profile_id: 1,
    credential_id: 4
  },
  {
    profile_id: 2,
    credential_id: 1
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
