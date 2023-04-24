import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import {
  auth,
  signInWithEmailAndPassword,
  handleGoogleLogin,
} from '../helper/firebaseAuth'
import googleIcon from '../assets/GoogleLogIn.png'

export default function LoginMain() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const login: SubmitHandler<FieldValues> = async (data) => {
    try {
      const curUserInfo = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )
    } catch ({ code }: any) {
      switch (code) {
        case 'auth/invalid-email':
          alert('이메일 형식에 맞지 않습니다.')
          break
        case 'auth/user-not-found':
          alert('사용자 정보가 없습니다.')
          break
        case 'auth/wrong-password':
          alert('비밀번호가 틀렸습니다.')
          break
        default:
          alert('알 수 없는 에러가 발생했습니다.')
          console.log(code)
          break
      }
    }
  }

  return (
    <div className=" max-w-full md:max-w-[80%] h-screen ml-auto mr-auto">
      <div className="flex w-full h-full items-center justify-center flex-col">
        <form onSubmit={handleSubmit(login)}>
          <div className="w-full flex justify-center">
            <div>
              <div>
                <label
                  htmlFor="email"
                  className="inline-block w-16 md:w-24 mb-4 text-sm md:text-lg"
                >
                  아이디
                </label>
                <input
                  id="email"
                  type="email"
                  className="border w-48 md:w-56 text-sm md:text-lg pl-1"
                  placeholder="이메일을 입력해주세요."
                  {...register('email')}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="inline-block w-16 md:w-24 text-sm md:text-lg"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  className="border w-48 md:w-56 text-sm md:text-lg"
                  {...register('password')}
                />
              </div>
            </div>
            <button
              type="submit"
              className="ml-4 p-4 border bg-gray-700 text-white text-sm md:text-lg"
            >
              로그인
            </button>
          </div>
        </form>
        <a
          href="/signup"
          className="mt-10 w-80 md:w-96 flex justify-center items-center h-10 bg-slate-700 text-white hover:bg-slate-500"
        >
          회원가입
        </a>
        <div className="mt-4 flex justify-between items-center">
          <button onClick={handleGoogleLogin}>
            <img
              src={googleIcon}
              alt="구글 로그인"
              className="w-20 shadow-lg rounded-full overflow-hidden"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
