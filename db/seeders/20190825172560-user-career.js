export function up (queryInterface) {
  return queryInterface.bulkInsert('User_careers', [{
    user_id: 1,
    career_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 2,
    career_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 3,
    career_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 4,
    career_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 5,
    career_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 6,
    career_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 7,
    career_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 7,
    career_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 8,
    career_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 9,
    career_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 10,
    career_id: 2,
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
