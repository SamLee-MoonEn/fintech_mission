import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { userState } from '../store/userInfo'
import { addDeposit } from '../helper/firebaseAuth'
import DepositModal from './DepositModal'
import TransferModal from './TransferModal'

interface accountProps {
  accountNum: string
  balance: string
  cardIdx: number
  updateAccount: () => void
}

export default function AccountCard({
  accountNum,
  balance,
  cardIdx,
  updateAccount,
}: accountProps) {
  const userInfo = useRecoilValue(userState)
  const [depositAmount, setDepositAmount] = useState<number>(0)
  const [transferAmount, setTransferAmount] = useState<number>(0)

  const handleDepositAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value)
    if (isNaN(amount)) {
      alert('숫자를 입력해 주세요.')
      setDepositAmount(0)
      return
    }
    setDepositAmount(amount)
  }

  const handleTransferAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value)
    if (isNaN(amount)) {
      alert('숫자를 입력해 주세요.')
      setTransferAmount(0)
      return
    }
    setTransferAmount(amount)
  }

  const handleAddDeposit = () => {
    if (depositAmount !== undefined) {
      addDeposit(userInfo, accountNum, depositAmount)
      updateAccount()
    } else {
      alert('입금 금액을 입력해주세요.')
    }
    setDepositAmount(0)
  }

  const resetAmount = () => {
    setDepositAmount(0)
    setTransferAmount(0)
  }
  return (
    <div className=" card w-full bg-neutral text-primary-content shadow-xl mb-10">
      <div className="card-body">
        <h2 className="card-title text-3xl">계좌번호 {accountNum}</h2>
        <p className=" text-right text-2xl">잔액 {balance} 원</p>
        <div className="card-actions justify-end">
          <label
            htmlFor={`addDeposit${cardIdx}`}
            className="btn btn-primary text-xl mt-4 w-36"
          >
            입금
          </label>
          <DepositModal
            accountNum={accountNum}
            depositAmount={depositAmount}
            resetDeposit={resetAmount}
            handleAddDeposit={handleAddDeposit}
            handleDepositAmount={handleDepositAmount}
            modalId={`addDeposit${cardIdx}`}
          />
          <label
            htmlFor={`transfer${cardIdx}`}
            className="btn btn-primary text-xl mt-4 w-36"
          >
            송금
          </label>
          <TransferModal
            accountNum={accountNum}
            transferAmount={transferAmount}
            resetTransferAmount={resetAmount}
            handleTransferAmount={handleTransferAmount}
            updateAccount={updateAccount}
            modalId={`transfer${cardIdx}`}
          />
        </div>
      </div>
    </div>
  )
}
