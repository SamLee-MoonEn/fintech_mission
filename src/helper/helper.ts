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

export function dateFormatMaker(date: Date) {
  const dateFormat =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 < 9
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    '-' +
    (date.getDate() < 9 ? '0' + date.getDate() : date.getDate())
  return dateFormat
}
export function dateTimeFormatMaker(date: Date) {
  const dateFormat = `${date.getFullYear()}${
    date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }${
    date.getDate() < 9 ? '0' + date.getDate() : date.getDate()
  }${date.getHours()}${date.getMonth()}${
    date.getSeconds() < 9 ? '0' + date.getSeconds() : date.getSeconds()
  }`

  return dateFormat
}
