import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { getAccountInfo } from '../../../helper/firebaseAuth'
import { userState } from '../../../store/userInfo'
import { dateFormatMaker } from '../../../helper/helper'

interface AccountTypes {
  accountNum: string
  balance: number
  password: string
  transection: any
}

export default function ExpenseShortcutCard({
  accountNum,
}: {
  accountNum: string
}) {
  const userUid = useRecoilValue(userState)
  const [todayExpenseInfo, setTodayExpenseInfo] = useState<string>()
  const today = dateFormatMaker(new Date())

  const handleGetAccountInfo = async () => {
    const temp: { [key: string]: AccountTypes } = await getAccountInfo(userUid)
    const todayExpense: number = temp[accountNum].transection[today]?.[3]
    setTodayExpenseInfo(todayExpense?.toLocaleString())
  }

  useEffect(() => {
    handleGetAccountInfo()
  }, [])

  return (
    <a
      href="/expenseInfo"
      className="btn btn-outline border-slate-400 border-solid border-2 h-36"
    >
      <div className="block w-full">
        <div className="mb-4 text-left text-lg">계좌 번호 {accountNum}</div>
        <div className="text-right text-2xl">
          {todayExpenseInfo
            ? `지출 ${todayExpenseInfo}`
            : '오늘의 지출정보가 없습니다.'}
        </div>
      </div>
    </a>
  )
}
