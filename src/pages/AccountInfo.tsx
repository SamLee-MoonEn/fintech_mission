import { useEffect, useState, useRef } from 'react'
import { useRecoilValue } from 'recoil'

import { userState } from '../store/userInfo'
import { createNewAccount, getAccountInfo } from '../helper/firebaseAuth'
import { createRandomAccountNum } from '../helper/helper'
import AccountCard from '../components/AccountCard'
import PasswordKeypad from '../components/PasswordKeypad'

interface accountProps {
  accountNum: string
  balance: number
}

export default function AccountInfo() {
  const userInfo = useRecoilValue(userState)
  const newAccountModalToggle = useRef<HTMLInputElement>(null)

  const [accountList, setAccountList] = useState([])
  const [accountKeyList, setAccountKeyList] = useState<string[]>([])
  const [newAccountNum, setNewAccountNum] = useState('')
  const [newPassword, setNewPassword ] = useState('')

  const creatNewAccountNum = () => {
    setNewAccountNum(createRandomAccountNum())
  }
  const handleNewPassword = (password:string) => {
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
    createNewAccount(userInfo, newAccountNum, newPassword)
    setNewPassword('')
    if (newAccountModalToggle.current !== null) {
      newAccountModalToggle.current.checked = false
    }
  }

  const tempGetAccountInfo = async () => {
    const accounts = await getAccountInfo(userInfo)
    setAccountList(Object.values(accounts))
    setAccountKeyList(Object.keys(accounts))
  }
  useEffect(() => {
    tempGetAccountInfo()
  }, [])

  return (
    <div className=" max-w-full md:max-w-[80%] ml-auto mr-auto">
      <div className="flex w-full items-center mt-24 flex-col">
        <div className="w-8/12">
          {accountList.map((v: accountProps, idx) => (
            <AccountCard
              key={v.accountNum}
              accountNum={v.accountNum}
              balance={v.balance.toLocaleString()}
              accountKey={accountKeyList[idx]}
            />
          ))}
          <label
            htmlFor="new-account"
            className="btn w-full bg-neutral text-primary-content shadow-xl items-center text-3xl h-20"
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
          <div className="modal ">
            <div className="overflow-visible bg-white p-20 rounded-xl relative flex flex-col">
              <label
                htmlFor="new-account"
                className="btn btn-square btn-outline absolute right-2 top-2"
                onClick={handleReset}
              >
                x
              </label>
              <div className="text-2xl mb-4">계좌번호 {newAccountNum}</div>
              <PasswordKeypad newPassword={newPassword} onChangePassword={handleNewPassword}/>
              <button onClick={handleCreateNewAccount} className="btn text-2xl">
                계좌 생성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
