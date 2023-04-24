export function createRandomAccountNum() {
  return `${Math.floor(Math.random()*10000)}-${Math.floor(Math.random()*10000000)}-${Math.floor(Math.random()*100000)}`
}
