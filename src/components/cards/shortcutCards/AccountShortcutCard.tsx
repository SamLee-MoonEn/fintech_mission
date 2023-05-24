import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { getAccountInfo } from '../../../helper/firebaseAuth'
import { userState } from '../../../store/userInfo'

interface AccountTypes {
  accountNum: string
  balance: number
  password: string
}

export default function AccountShortcutCard({
  accountNum,
}: {
  accountNum: string
}) {
  const userUid = useRecoilValue(userState)
  const [accountInfo, setAccountInfo] = useState<AccountTypes>()

  const handleGetAccountInfo = async () => {
    const temp: { [key: string]: AccountTypes } = await getAccountInfo(userUid)
    setAccountInfo(temp[accountNum])
  }

  useEffect(() => {
    handleGetAccountInfo()
  }, [])
  return (
    <div className="card card-bordered border-2 border-solid border-slate-400 h-36">
      <div className="card-body">
        <div className="card-title">{accountInfo?.accountNum}</div>
        <div className="">
          잔고 {accountInfo?.balance.toLocaleString()}원
        </div>
      </div>
    </div>
  )
}
