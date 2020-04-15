export function up (queryInterface) {
  return queryInterface.bulkInsert('User_interests', [{
    user_id: 1,
    interest_id: 1,
    score: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 1,
    interest_id: 2,
    score: -2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 2,
    interest_id: 1,
    score: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 2,
    interest_id: 2,
    score: -2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 3,
    interest_id: 1,
    score: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 3,
    interest_id: 2,
    score: -2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 4,
    interest_id: 3,
    score: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 4,
    interest_id: 2,
    score: -2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 5,
    interest_id: 3,
    score: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 5,
    interest_id: 2,
    score: -2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 6,
    interest_id: 3,
    score: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    user_id: 6,
    interest_id: 2,
    score: -2,
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
