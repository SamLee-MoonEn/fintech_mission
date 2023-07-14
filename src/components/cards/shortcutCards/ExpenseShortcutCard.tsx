import { useEffect, useState } from 'react'

import { dateFormatMaker } from '../../../helper/helper'

interface AccountTypes {
  accountNum: string
  balance: number
  password: string
  transection: any
}

export default function ExpenseShortcutCard({
  data,
  removeCard,
}: {
  data: AccountTypes
  removeCard: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const [todayExpenseInfo, setTodayExpenseInfo] = useState<string>()
  const today = dateFormatMaker(new Date())

  useEffect(() => {
    setTodayExpenseInfo(data.transection[today]?.[3]?.toLocaleString())
  }, [today])

  return (
    <a
      href="/expenseInfo"
      className="relative btn bg-yellow-500 hover:bg-white hover:text-black hover:border-slate-400 hover:border-solid hover:border-1 h-36"
    >
      <div className="block w-full">
        <button
          onClick={removeCard}
          className=" btn btn-sm bg-transparent text-transparent text-black border-0 hover:bg-red-400 hover:text-white absolute top-3 right-3"
        >
          X
        </button>
        <div className="mb-4 text-left text-lg">
          계좌 번호 {data.accountNum}
        </div>
        <div className="text-right text-2xl">
          {todayExpenseInfo == '0' || todayExpenseInfo == undefined
            ? '오늘의 지출정보가 없습니다.'
            : `지출 ${Number(
                todayExpenseInfo.replaceAll(',', ''),
              ).toLocaleString('ko-kr')} 원`}
        </div>
      </div>
    </a>
  )
}
