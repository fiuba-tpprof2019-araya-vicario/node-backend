const Interest = require('../../db/models').Interest
const UserInterest = require('../../db/models').UserInterest

class InterestRepository {
  static getInterests () {
    return Interest.findAll()
  }

  static getUserInterests (userId) {
    console.log('InterestRepository::getUserInterests')
    return UserInterest.findAll({
      where: { user_id: userId },
      include: [ { model: Interest } ]
    })
  }

  static async updateUserInterests (userId, interests) {
    await UserInterest.destroy({ where: { user_id: userId } })
    return UserInterest.bulkCreate(interests, { returning: true })
  }

  static getInterestCount(){
    return Interest.count()
  }
}

export default InterestRepository
