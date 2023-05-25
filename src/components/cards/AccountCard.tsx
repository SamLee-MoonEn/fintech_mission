import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { userState } from '../../store/userInfo'
import { addDeposit, payment } from '../../API/firebaseAuth'
import DepositModal from '../modals/DepositModal'
import TransferModal from '../modals/TransferModal'
import QRPaymentCard from './QRPaymentCard'

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
  const [amount, setAmount] = useState<number>(0)

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempAmount = Number(e.target.value)
    if (isNaN(tempAmount)) {
      alert('숫자를 입력해 주세요.')
      setAmount(0)
      return
    }
    setAmount(tempAmount)
  }

  const handleAddDeposit = () => {
    if (amount !== undefined) {
      addDeposit(userInfo, accountNum, amount)
      updateAccount()
    } else {
      alert('입금 금액을 입력해주세요.')
    }
    setAmount(0)
  }

  const handlePayment = () => {
    if (amount !== undefined) {
      payment(userInfo, accountNum, amount)
      updateAccount()
    } else {
      alert('지불 금액을 입력해주세요.')
    }
    setAmount(0)
  }

  const resetAmount = () => {
    setAmount(0)
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
            depositAmount={amount}
            resetDeposit={resetAmount}
            handleAddDeposit={handleAddDeposit}
            handleDepositAmount={handleAmount}
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
            transferAmount={amount}
            resetTransferAmount={resetAmount}
            handleTransferAmount={handleAmount}
            updateAccount={updateAccount}
            modalId={`transfer${cardIdx}`}
          />
          <label
            htmlFor={`QR${cardIdx}`}
            className="btn btn-primary text-xl mt-4 w-36"
          >
            QR 결제
          </label>
          <QRPaymentCard
            accountNum={accountNum}
            amount={amount}
            idx={cardIdx}
            handlePayment={handlePayment}
            handlePaymentAmount={handleAmount}
            resetAmount={resetAmount}
          />
        </div>
      </div>
    </div>
  )
}
