import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { userState } from '../store/userInfo'
import { accountTransfer } from '../helper/firebaseAuth'
import PasswordKeypad from './PasswordKeypad'

interface Props {
  accountNum: string
  transferAmount: number
  resetTransferAmount: () => void
  handleTransferAmount: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TransferModal({
  accountNum,
  transferAmount,
  resetTransferAmount,
  handleTransferAmount,
}: Props) {
  const userInfo = useRecoilValue(userState)
  const [transferPassword, setTransferPassword] = useState('')

  const handleTransferPassword = (password: string) => {
    setTransferPassword(password)
  }

  const handleResetTransferModal = () => {
    resetTransferAmount()
    setTransferPassword('')
  }

  const handleAccountTransfer = () => {
    accountTransfer(userInfo, accountNum, transferAmount, transferPassword)
    handleResetTransferModal()
  }

  return (
    <>
      <input type="checkbox" id="transfer" className="modal-toggle" />
      <div className="modal">
        <div className=" overflow-visible relative bg-white p-10 rounded-xl">
          <label
            htmlFor="transfer"
            className="btn btn-square btn-outline absolute right-2 top-2"
            onClick={handleResetTransferModal}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-black mb-4">
            계좌번호 {accountNum}
          </h3>
          <div className="ml-auto flex justify-end items-center mb-4">
            <input
              className="input input-bordered text-black h-10 flex-1"
              value={transferAmount}
              onChange={handleTransferAmount}
            ></input>
            <p className="ml-4 text-black text-xl flex-grow-0">원</p>
          </div>
          <PasswordKeypad
            modalFor="transferkeypad"
            newPassword={transferPassword}
            onChangePassword={handleTransferPassword}
          />
          <label
            htmlFor="transfer"
            className="btn btn-primary text-xl w-full"
            onClick={handleAccountTransfer}
          >
            송금
          </label>
        </div>
      </div>
    </>
  )
}
