import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'

import { handleGoogleLogin } from '../helper/firebaseAuth'
import { userState } from '../store/userInfo'
import googleIcon from '../assets/GoogleLogIn.png'

export default function Sidebar() {
  const userInfo = useRecoilValue(userState)

  return (
    <div className="drawer-side">
      <label htmlFor="drawer" className="drawer-overlay"></label>
      {userInfo ? (
        <ul className="p-4 w-80 bg-base-100 text-base-content">
          <a href='/accountinfo'>계좌정보</a>
          <li>지출정보</li>
          <li>주식정보</li>
          <li>환율정보</li>
          <li>로그아웃</li>
        </ul>
      ) : (
        <ul className="menu p-4 w-80 bg-base-100 text-base-content ">
          <li>
            <a href="/signup" className="h-14 text-lg">
              회원가입
            </a>
          </li>
          <li>
            <button onClick={handleGoogleLogin}>
              <img
                src={googleIcon}
                alt="구글 로그인"
                className="w-8 shadow-lg rounded-full overflow-hidden"
              />
              구글 로그인
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
