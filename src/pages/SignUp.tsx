import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { auth, createUserWithEmailAndPassword } from '../firebaseAuth'

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()
  const signUp: SubmitHandler<FieldValues> = async (data) => {
    if (data.password !== data.passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )
      console.log(user)
    } catch (err) {
      console.log(err)
    }
    console.log(data)
  }

  return (
    <div className=" max-w-full md:max-w-[80%] h-screen ml-auto mr-auto">
      <div className="flex w-full h-full items-center justify-center flex-col">
        <form onSubmit={handleSubmit(signUp)}>
          <div>
            <label
              htmlFor="email"
              className="inline-block w-24 md:w-36 mb-4 text-sm md:text-lg"
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
              className="inline-block w-24 md:w-36 text-sm md:text-lg"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              className="border w-48 md:w-56 text-sm md:text-lg pl-1"
              placeholder="6자리 이상 입력해주세요."
              {...register('password')}
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="passwordCheck"
              className="inline-block w-24 md:w-36 text-sm md:text-lg"
            >
              비밀번호 확인
            </label>
            <input
              id="passwordCheck"
              type="password"
              className="border w-48 md:w-56 text-sm md:text-lg pl-1"
              placeholder="6자리 이상 입력해주세요."
              {...register('passwordCheck')}
            />
          </div>
          <button className="w-full flex justify-center items-center bg-slate-500 h-8 text-lg text-white mt-4">
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}
