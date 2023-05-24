import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { QRCodeSVG } from 'qrcode.react'

import { userState } from '../../store/userInfo'
import { addDeposit } from '../../helper/firebaseAuth'
import DepositModal from '../modals/DepositModal'
import TransferModal from '../modals/TransferModal'

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
          <label htmlFor={'QR'} className="btn btn-primary text-xl mt-4 w-36">
            QR 결제
          </label>
          <input type="checkbox" id={`QR`} className="modal-toggle" />
          <div className="modal">
            <div className=" overflow-visible relative bg-white p-14 rounded-xl">
              <label
                htmlFor={`QR`}
                className="btn btn-square btn-outline absolute right-2 top-2"
              >
                ✕
              </label>
              <div className="flex flex-col justify-center items-center mb-4">
                <h3 className="text-lg font-bold text-black mb-4">
                  계좌번호 {accountNum}
                </h3>
                <QRCodeSVG value={accountNum} size={256} />
              </div>
              <div className="ml-auto flex justify-end items-center mb-4">
                <input
                  className="input input-bordered text-black h-10 flex-1"
                  value={transferAmount}
                  onChange={handleTransferAmount}
                ></input>
                <p className="ml-4 text-black text-xl flex-grow-0">원</p>
              </div>
              <label htmlFor={`QR`} className="btn btn-primary text-xl w-full">
                지출
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
