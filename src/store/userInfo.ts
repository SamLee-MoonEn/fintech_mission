import { atom } from 'recoil'

export const authState = atom({
  key: 'authState',
  default: {
    user: null,
    loading: true,
  },
})
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
