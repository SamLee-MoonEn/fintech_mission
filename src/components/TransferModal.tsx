import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { userState } from '../store/userInfo'
import { accountTransfer } from '../helper/firebaseAuth'
import PasswordKeypad from './PasswordKeypad'
import TransferStateModal from './TransferStateModal'

interface Props {
  accountNum: string
  transferAmount: number
  resetTransferAmount: () => void
  handleTransferAmount: (e: React.ChangeEvent<HTMLInputElement>) => void
  updateAccount: () => void
  modalId: string
}

export default function TransferModal({
  accountNum,
  transferAmount,
  resetTransferAmount,
  handleTransferAmount,
  updateAccount,
  modalId,
}: Props) {
  const userInfo = useRecoilValue(userState)
  const [transferPassword, setTransferPassword] = useState('')
  const [transferState, setTransferState] = useState<string>('')

  const handleTransferPassword = (password: string) => {
    setTransferPassword(password)
  }

  const handleResetTransferModal = () => {
    resetTransferAmount()
    setTransferPassword('')
  }

  const handleAccountTransfer = async () => {
    setTransferState(
      await accountTransfer(
        userInfo,
        accountNum,
        transferAmount,
        transferPassword,
      ),
    )
    updateAccount()
    handleResetTransferModal()
  }
  const handleResetState = () => {
    setTransferState('')
  }

  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className=" overflow-visible relative bg-white p-10 rounded-xl">
          <label
            htmlFor={modalId}
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
            modalFor={`keypad${modalId}`}
            newPassword={transferPassword}
            onChangePassword={handleTransferPassword}
          />
          <label
            htmlFor={modalId}
            className="btn btn-primary text-xl w-full"
            onClick={handleAccountTransfer}
          >
            송금
          </label>
        </div>
      </div>
      <TransferStateModal
        state={transferState}
        handleReset={handleResetState}
      />
    </>
  )
}
