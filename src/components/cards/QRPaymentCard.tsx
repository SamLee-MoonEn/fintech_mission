import { useState } from 'react'

import { QRCodeSVG } from 'qrcode.react'
import TransferStateModal from '../modals/TransferStateModal'

export default function QRPaymentCard({
  accountNum,
  amount,
  idx,
  handlePayment,
  resetAmount,
  handlePaymentAmount,
}: {
  accountNum: string
  idx: number | string
  amount: number
  handlePayment: () => void
  resetAmount: () => void
  handlePaymentAmount: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <>
      <input type="checkbox" id={`QR${idx}`} className="modal-toggle" />
      <div className="modal">
        <div className=" overflow-visible relative bg-white p-14 rounded-xl">
          <label
            htmlFor={`QR${idx}`}
            className="btn btn-square btn-outline absolute right-2 top-2"
            onClick={resetAmount}
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
              value={amount.toLocaleString('ko-kr')}
              onChange={handlePaymentAmount}
            ></input>
            <p className="ml-4 text-black text-xl flex-grow-0">원</p>
          </div>
          <label
            htmlFor={`QR${idx}`}
            className="btn btn-primary text-xl w-full"
            onClick={handlePayment}
          >
            지출
          </label>
        </div>
      </div>
    </>
  )
}
