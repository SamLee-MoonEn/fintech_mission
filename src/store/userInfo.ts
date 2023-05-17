import { atom, selector } from 'recoil'
import { getAccountInfo } from '../helper/firebaseAuth'

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
