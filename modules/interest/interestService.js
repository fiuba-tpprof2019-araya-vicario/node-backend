import InterestRepository from './interestRepository'

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

export const editUserInterests = async (interestId, status, proposalStatus) => {
  // if (proposalStatus != null) return modifyProposalStatusInterestStudent(interestId, proposalStatus)
  // else return modifyStatusInterestStudent(interestId, status)
}
