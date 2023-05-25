import { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { payment } from '../../../helper/firebaseAuth'
import { userState } from '../../../store/userInfo'
import QRPaymentCard from '../QRPaymentCard'

interface AccountTypes {
  accountNum: string
  balance: number
  password: string
}

export default function QRShortcutCard({
  data,
  updateAccount,
}: {
  data: AccountTypes
  updateAccount: () => void
}) {
  const [amount, setAmount] = useState<number>(0)
  const userUid = useRecoilValue(userState)

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempAmount = Number(e.target.value)
    if (isNaN(tempAmount)) {
      alert('숫자를 입력해 주세요.')
      setAmount(0)
      return
    }
    setAmount(tempAmount)
  }

  const handlePayment = () => {
    if (amount !== undefined) {
      payment(userUid, data.accountNum, amount)
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
    <>
      <label htmlFor={`QR${data.accountNum}`} className=" cursor-pointer">
        <div className="card border-slate-400 h-36">
          <div className="card-body btn btn-outline border-slate-400 border-solid border-2">
            <div className="card-title text-3xl">QR 결제</div>
            <div className=" card-actives text-sm">
              지출계좌번호 : {data.accountNum}
            </div>
          </div>
        </div>
      </label>
      <QRPaymentCard
        accountNum={data.accountNum}
        amount={amount}
        idx={data.accountNum}
        handlePayment={handlePayment}
        resetAmount={resetAmount}
        handlePaymentAmount={handleAmount}
      />
    </>
  )
}
