// ADMIN 1
// STUDENT 2
// TUTOR 3
// COMISION 4
// INTERESADO 5

export function up (queryInterface) {
  return queryInterface.bulkInsert('User_profiles', [{
    user_id: 1,
    profile_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 2,
    profile_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 3,
    profile_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 4,
    profile_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 5,
    profile_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 6,
    profile_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 7,
    profile_id: 4,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 8,
    profile_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 9,
    profile_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 9,
    profile_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 10,
    profile_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 10,
    profile_id: 1,
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
