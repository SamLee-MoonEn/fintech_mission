import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { userState } from '../store/userInfo'
import { createNewAccount, getAccountInfo } from '../helper/firebaseAuth'
import AccountCard from '../components/AccountCard'

interface accountProps {
  accountNum: string
  balance: number
}

export default function AccountInfo() {
  const userInfo = useRecoilValue(userState)
  const [accountList, setAccountList] = useState([])

  const tempGetAccountInfo = async () => {
    const accounts = await getAccountInfo(userInfo)
    setAccountList(Object.values(accounts))
  }
  useEffect(() => {
    tempGetAccountInfo()
    console.log(accountList)
  }, [])

  return (
    <div className=" max-w-full md:max-w-[80%] ml-auto mr-auto">
      <div className="flex w-full items-center mt-24 flex-col">
        <div className="w-8/12">
          {accountList.map((v: accountProps) => (
            <AccountCard
              key={v.accountNum}
              accountNum={v.accountNum}
              balance={v.balance}
            />
          ))}
          <button className="card w-full bg-neutral text-primary-content shadow-xl items-center">
            <div className="card-body">
              <h2 className="card-title text-lg md:text-3xl">계좌 추가 +</h2>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
