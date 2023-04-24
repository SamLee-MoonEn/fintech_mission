import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import cx from 'clsx'

import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setInitialAccount,
} from '../helper/firebaseAuth'

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm()
  const [email, setEmail] = useState('')
  const [emailCheckMessege, setemailCheckMessege] = useState('')
  const [isAlert, setIsAlert] = useState(true)
  const navigate = useNavigate()

  const signUp: SubmitHandler<FieldValues> = async (data) => {
    if (!!isAlert) {
      alert('이메일 중복 체크를 해주세요.')
      return
    }
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
      setInitialAccount(user)
      reset()
      setemailCheckMessege('')
      setIsAlert(true)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const checkEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const methods = await signInWithEmailAndPassword(
        auth,
        email,
        'jlkurfehn1!@$89fyahsd@!#4rfhui',
      )
    } catch ({ code }: any) {
      switch (code) {
        case 'auth/wrong-password':
          setemailCheckMessege('이미 사용 중인 이메일입니다.')
          setIsAlert(true)
          break
        case 'auth/user-not-found':
          setemailCheckMessege('사용해도 되는 이메일입니다.')
          setIsAlert(false)
          break
        case 'auth/invalid-email':
          setemailCheckMessege('이메일을 입력해주세요.')
          setIsAlert(true)
          break
        default:
          console.error(code)
          break
      }
    }
  }

  return (
    <div className=" max-w-full md:max-w-[80%] h-screen ml-auto mr-auto">
      <div className="flex w-full h-full items-center justify-center flex-col">
        <form onSubmit={handleSubmit(signUp)}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="inline-block w-24 md:w-36 text-sm md:text-lg"
            >
              아이디
            </label>
            <input
              id="email"
              type="email"
              className="border w-48 md:w-56 text-sm md:text-lg pl-1"
              placeholder="이메일을 입력해주세요."
              {...register('email')}
              onChange={handleChangeValue}
            />
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="bg-slate-700 w-36 h-8 text-white text-sm md:text-base"
              onClick={checkEmail}
            >
              이메일 중복 체크
            </button>
            <p
              className={cx(
                'p-2 text-xs md:text-base',
                isAlert === true ? ' text-red-600' : 'text-green-500',
              )}
            >
              {emailCheckMessege}
            </p>
          </div>
          <div className="mt-2">
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
          <button className="w-full flex justify-center items-center bg-slate-700 h-8 text-lg text-white mt-4">
            회원가입
          </button>
        </form>
      </div>
    </div>
  )
}
