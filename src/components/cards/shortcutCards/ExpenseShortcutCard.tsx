import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { dateFormatMaker } from '../../../helper/helper'

interface AccountTypes {
  accountNum: string
  balance: number
  password: string
  transection: any
}

export default function ExpenseShortcutCard({ data }: { data: AccountTypes }) {
  const [todayExpenseInfo, setTodayExpenseInfo] = useState<string>()
  const today = dateFormatMaker(new Date())

  useEffect(() => {
    setTodayExpenseInfo(data.transection[today]?.[3]?.toLocaleString())
  }, [])

  return (
    <a
      href="/expenseInfo"
      className="btn btn-outline border-slate-400 border-solid border-2 h-36"
    >
      <div className="block w-full">
        <div className="mb-4 text-left text-lg">
          계좌 번호 {data.accountNum}
        </div>
        <div className="text-right text-2xl">
          {todayExpenseInfo
            ? `지출 ${todayExpenseInfo}`
            : '오늘의 지출정보가 없습니다.'}
        </div>
      </div>
    </a>
  )
}
