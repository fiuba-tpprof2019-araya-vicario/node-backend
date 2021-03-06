import InterestRepository from './interestRepository'
import UserRepository from '../user/userRepository'

const MAX_SIMILARS = 3

export const getInterests = async () => {
  return InterestRepository.getInterests()
    .then(interests => {
      return Promise.resolve(interests)
    })
}

export const getUserInterests = async (userId) => {
  return InterestRepository.getUserInterests(userId)
    .then(userInterests => {
      return Promise.resolve(userInterests)
    })
}

export const editUserInterests = async (userId, interests) => {
  console.log('InterestRepository::updateUserInterests')
  let sum = interests.reduce((total, interest) => total + interest.original_score, 0)
  let count = await InterestRepository.getInterestCount()
  let prom = sum / count
  let interestsAux = interests.map(interest => { return { user_id: userId, interest_id: interest.id, score: interest.original_score - prom, original_score: interest.original_score } })
  let response = await InterestRepository.updateUserInterests(userId, interestsAux)
  let normScore = Math.sqrt(interestsAux.reduce((total, interestAux) => total + (interestAux.score * interestAux.score), 0))
  let updateResponse = await UserRepository.updateUserNormScore(userId, normScore)
  console.log('norm_score: ', normScore)
  console.log('updateResponse: ', updateResponse)
  return Promise.resolve(response)
}

export const getSimilarUsers = async (userId, type) => {
  let usersRandom = await UserRepository.getRandomUsersForUser(userId, type)

  if (usersRandom.length < MAX_SIMILARS) return usersRandom
  let mainUser = await UserRepository.getUserWithInterest(userId)
  console.log('mainUser: ', mainUser)
  console.log('mainUser.dataValues.UserInterests: ', mainUser.dataValues.UserInterests)
  console.log('mainUser.UserInterests: ', mainUser.UserInterests)
  let usersMoreSimilar = []
  for (let user of usersRandom) {
    var score = 0
    for (let interest of mainUser.UserInterests) {
      console.log('main interest: ', interest)
      let userInterest = user.dataValues.UserInterests.find(ui => ui.interest_id === interest.interest_id)
      if (userInterest != null) score += interest.score * userInterest.score
    }
    let result = score / (mainUser.norm_score * user.norm_score)
    console.log('similarity: ', result)
    if (result > 0.6) {
      usersMoreSimilar.push(user)
      if (usersMoreSimilar.length === MAX_SIMILARS) break
    }
  }
  // console.log('usersMoreSimilar: ', usersMoreSimilar)
  return usersMoreSimilar
}
