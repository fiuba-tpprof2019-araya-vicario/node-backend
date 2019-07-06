
export function up (queryInterface) {
  return queryInterface.bulkInsert('User_profiles', [{
    user_id: 1,
    profile_id: 1
  },
  {
    user_id: 1,
    profile_id: 2
  },
  {
    user_id: 2,
    profile_id: 1
  },
  {
    user_id: 2,
    profile_id: 2
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
