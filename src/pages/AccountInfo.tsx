import { useState, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { userState } from '../store/userInfo'
import { createNewAccount, getAccountInfo } from '../helper/firebaseAuth'
import { createRandomAccountNum } from '../helper/helper'
import AccountCard from '../components/cards/AccountCard'
import PasswordKeypad from '../components/PasswordKeypad'

export default function AccountInfo() {
  const [newAccountNum, setNewAccountNum] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const userUid = useRecoilValue(userState)

  const queryClient = useQueryClient()

  const newAccountModalToggle = useRef<HTMLInputElement>(null)

  //useQuery 사용
  const { isLoading, isError, error, data }: any = useQuery(
    'accountData',
    () => {
      return getAccountInfo(userUid)
    },
  )
  // useMudataion을 이용해서 데이터 업데이트 시 서버에서 데이터 받아오기
  const updateAccountMutation = useMutation(getAccountInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('accountData')
    },
  })

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (isError) {
    console.error(error)
    return <div>문제발생</div>
  }

  const handleUpdateAccount = async () => {
    setTimeout(() => {
      updateAccountMutation.mutate(userUid)
    }, 500)
  }

  const creatNewAccountNum = () => {
    setNewAccountNum(createRandomAccountNum())
  }
  const handleNewPassword = (password: string) => {
    setNewPassword(password)
  }

  const handleReset = () => {
    setNewPassword('')
  }

  const handleCreateNewAccount = () => {
    if (newPassword.length !== 6) {
      alert('비밀번호는 6자리입니다.')
      return
    }
    createNewAccount(userUid, newAccountNum, newPassword)
    setNewPassword('')
    handleUpdateAccount()
    if (newAccountModalToggle.current !== null) {
      newAccountModalToggle.current.checked = false
    }
  }

  return (
    <div className=" max-w-full md:max-w-[80%] ml-auto mr-auto">
      <div className="flex w-full items-center mt-24 flex-col">
        <div className="w-8/12">
          {Object.values(data).map((v: any, idx) => (
            <AccountCard
              key={v.accountNum}
              accountNum={v.accountNum}
              balance={v.balance.toLocaleString()}
              cardIdx={idx}
              updateAccount={handleUpdateAccount}
            />
          ))}
          <label
            htmlFor="new-account"
            className="btn w-full bg-primary text-primary-content shadow-xl items-center text-3xl h-20"
            onClick={creatNewAccountNum}
          >
            계좌추가 +
          </label>
          <input
            type="checkbox"
            id="new-account"
            className="modal-toggle"
            ref={newAccountModalToggle}
          />
          <div className="modal">
            <div className="overflow-visible bg-white p-20 rounded-xl relative flex flex-col">
              <label
                htmlFor="new-account"
                className="btn btn-square btn-outline absolute right-2 top-2"
                onClick={handleReset}
              >
                x
              </label>
              <div className="text-2xl mb-4">계좌번호 {newAccountNum}</div>
              <PasswordKeypad
                modalFor="account"
                newPassword={newPassword}
                onChangePassword={handleNewPassword}
                key="password"
              />
              <button
                onClick={handleCreateNewAccount}
                className="btn text-2xl bg-primary"
              >
                계좌 생성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
