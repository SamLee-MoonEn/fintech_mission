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
    <a
      href="/accountinfo"
      className="btn btn-outline border-slate-400 border-solid border-2 h-36"
    >
      <div className="block w-full">
        <div className="mb-4 text-left text-lg">
          계좌번호 {accountInfo?.accountNum}
        </div>
        <div className="text-right text-2xl">
          잔고 {accountInfo?.balance.toLocaleString()}원
        </div>
      </div>
    </a>
  )
}
