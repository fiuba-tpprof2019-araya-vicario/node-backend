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
}

export default InterestRepository
