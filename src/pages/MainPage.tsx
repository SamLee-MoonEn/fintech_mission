import { useRecoilValue } from 'recoil'

import { userState } from '../store/userInfo'

export default function MainPage() {
  const userInfo = useRecoilValue(userState)
  return (
    <>
      <div>{userInfo}</div>
    </>
  )
}
