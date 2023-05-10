import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { userState } from '../store/userInfo'
import {addDeposit} from '../helper/firebaseAuth'
import DepositModal from './DepositModal'

interface accountProps {
  accountNum: string
  balance: string
  accountKey:string
}

export default function AccountCard({ accountNum, balance}: accountProps) {
  const userInfo = useRecoilValue(userState)
  const [deposit, setDeposit ] = useState<number>(0)
  const handleDeposit = (e:React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(Number(e.target.value))
  }
  const handleAddDeposit = () => {
    if(deposit !== undefined){
      addDeposit(userInfo, accountNum, deposit)
    } else {
      alert('입금 금액을 입력해주세요.')
    }
    setDeposit(0)
  }
  const resetDeposit = () => {
    setDeposit(0)
  }
  return (
    <div className=" card w-full bg-neutral text-primary-content shadow-xl mb-10">
      <div className="card-body">
        <h2 className="card-title text-3xl">계좌번호 {accountNum}</h2>
        <p className=" text-right text-2xl">잔액 {balance} 원</p>
        <div className="card-actions justify-end">
          <label htmlFor='addDeposit' className="btn btn-primary text-xl mt-4 w-36">입금</label>
          <DepositModal accountNum={accountNum} deposit={deposit} resetDeposit={resetDeposit} handleAddDeposit={handleAddDeposit} handleDeposit={handleDeposit}/>
          <button className="btn btn-primary text-xl mt-4 w-36">송금</button>
        </div>
      </div>
    </div>
  )
}
