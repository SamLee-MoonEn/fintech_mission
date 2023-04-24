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
  default: null,
})
