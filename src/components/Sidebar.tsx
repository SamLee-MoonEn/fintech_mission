import { useRecoilValue } from 'recoil'

import { handleGoogleLogin } from '../helper/firebaseAuth'
import { userState } from '../store/userInfo'
import googleIcon from '../assets/GoogleLogIn.png'

export default function Sidebar() {
  const userInfo = useRecoilValue(userState)
  const handleLogOut = () => {
    sessionStorage.removeItem('USER_UID')
  }
  return (
    <div className="drawer-side">
      <label htmlFor="drawer" className="drawer-overlay"></label>
      {userInfo ? (
        <ul className="p-4 w-80 bg-base-100 text-base-content">
          <li className="btn btn-outline w-full mb-1">
            <a href="/accountinfo" className="w-full pt-4 pb-4">
              계좌정보
            </a>
          </li>
          <li className="btn btn-outline w-full mb-1">
            <a href="/expenseinfo" className="w-full pt-4 pb-4">
              지출정보
            </a>
          </li>
          <li className="btn btn-outline w-full mb-1">
            <a href="/stockinfo" className="w-full pt-4 pb-4">
              주식정보
            </a>
          </li>
          <li className="btn btn-outline w-full mb-1">
            <a href="/exchangerateinfo" className="w-full pt-4 pb-4">
              환율정보
            </a>
          </li>
          <li className="btn btn-outline w-full mb-1">
            <a href="/" onClick={handleLogOut} className="w-full pt-4 pb-4">
              로그아웃
            </a>
          </li>
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
