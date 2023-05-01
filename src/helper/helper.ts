export function createRandomAccountNum() {
  return `${Math.floor(Math.random() * 10000)}-${Math.floor(
    Math.random() * 10000000,
  )}-${Math.floor(Math.random() * 100000)}`
}

export function shuffleNum(nums: number[]) {
  let numLength = nums.length
  while (numLength) {
    let randomIdx = Math.floor(numLength-- * Math.random())
    let temp = nums[randomIdx]
    nums[randomIdx] = nums[numLength]
    nums[numLength] = temp
  }
  return nums
}
