import { useEffect, useState } from 'react'

import { shuffleNum } from '../helper/helper'
import KeyButton from './KeyButton'

export default function PasswordKeypad( {newPassword ,onChangePassword}:{ newPassword: string,onChangePassword:(password: string) => void}) {
  const PASSWORD_MAX_LENGTH = 6
 

  const numsInit = Array.from({ length: 10 }, (_, idx) => idx)
  const [nums, setNums] = useState(shuffleNum(numsInit))
  const [password, setPassword] = useState('')

  useEffect(() => {setPassword(newPassword)}, [newPassword])

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = password
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length === PASSWORD_MAX_LENGTH) {
      return
    }
    onChangePassword(password+e.currentTarget.getAttribute('data-value'))
  }

  const deletePassword = (e: React.FormEvent) => {
    e.preventDefault()
    onChangePassword(
      password.slice(0, password.length === 0 ? 0 : password.length - 1),
    )
  }
  const clearPassowrd = (e: React.FormEvent) => {
    e.preventDefault()
    onChangePassword('')
  }

  return (
    <div className="flex mb-4">
      <input
        className=" placeholder:text-slate-800 input input-disabled"
        type="password"
        onChange={handlePassword}
        value={password}
        placeholder="계좌 비밀번호"
      />
      <label htmlFor="my-modal" className="btn text-3xl ml-10">
        ⌨️
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className="modal cursor-pointer">
        <label htmlFor="" className="modal-box relative w-96">
          <input
            className="input input-bordered w-full mb-2"
            type="password"
            onChange={handlePassword}
            value={password}
            placeholder="6자리 비밀번호를 입력해 주세요"
          />
          <div className="grid grid-cols-3 text-center">
            {nums.map((v, idx) => {
              return idx === nums.length - 1 ? (
                <>
                  <button
                    key='clear'
                    onClick={clearPassowrd}
                    className="btn btn-outline m-1"
                  >
                    Clear
                  </button>
                  <KeyButton
                    key={idx}
                    onClick={handlePasswordChange}
                    value={v}
                  />
                </>
              ) : (
                <KeyButton key={idx} onClick={handlePasswordChange} value={v} />
              )
            })}
            <button onClick={deletePassword} className="btn btn-outline m-1">
              ←
            </button>
          </div>
          <label htmlFor="my-modal" className="btn w-full text-xl">
            입력완료
          </label>
        </label>
      </label>
    </div>
  )
}
