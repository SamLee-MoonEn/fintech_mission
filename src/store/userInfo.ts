import { atom, selector } from 'recoil'
import { getAccountInfo } from '../API/firebaseAuth'

export const userState = atom({
  key: 'user',
  default: '',
  effects: [
    ({ setSelf, onSet }) => {
      sessionStorage.getItem('USER_UID') &&
        setSelf(sessionStorage.getItem('USER_UID') as string)
      onSet((v) => sessionStorage.setItem('USER_UID', `${v}`))
    },
  ],
})

// 추후 로그인 시 Account 정보를 받아오도록 변경 필요
export const userAccountList = selector({
  key: 'accountList',
  get: async ({ get }) => {
    const userUid = get(userState)
    const accounts = await getAccountInfo(userUid)
    return accounts
  },
})

export const userTransectionsInfo = selector({
  key: 'transectionsInfo',
  get: async ({ get }) => {
    const accountsInfo = await get(userAccountList)
    const transectionsList = []
    for (let key in accountsInfo) {
      if (accountsInfo.hasOwnProperty(key)) {
        const account = accountsInfo[key]
        if (account.hasOwnProperty('transection')) {
          const transactions = account.transection
          const transactionsList = Object.values(transactions)
          transectionsList.push(transactionsList)
        } else {
          transectionsList.push([])
        }
      }
    }
    return transectionsList
  },
})
