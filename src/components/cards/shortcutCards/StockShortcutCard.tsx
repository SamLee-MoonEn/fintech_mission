import { useEffect, useState } from 'react'

import { fetchStockData } from '../../../helper/stockAPI'
import { useRecoilValue } from 'recoil'
import { userState } from '../../../store/userInfo'
import { getInterestedStockInfoFromFirebase } from '../../../helper/firebaseAuth'

interface StockType {
  종목명: string
  종목코드: string
}

export default function StockShortcutCard({ data }: { data: string }) {
  const [stockInfo, setStockInfo] = useState<string>('0')
  const [stockName, setStockName] = useState<string>('')
  const userUid = useRecoilValue(userState)

  const handlegetInterestedStockInfoFromFirebase = async () => {
    const result = await getInterestedStockInfoFromFirebase(userUid)
    setStockName(result[data].종목명)
  }
  const getStockData = async () => {
    const result = await fetchStockData(data, 1)
    setStockInfo(result[0])
  }
  useEffect(() => {
    getStockData()
    handlegetInterestedStockInfoFromFirebase()
  }, [])

  return (
    <a
      href="/stockinfo"
      className="btn btn-outline border-slate-400 border-solid border-2 h-36"
    >
      <div className="block w-full">
        <div className="mb-4 text-left text-lg">{stockName}</div>
        <div className="flex justify-end">
          <div className="text-right text-2xl">전일 종가</div>
          <div className="text-right text-2xl ml-4">
            {Number(stockInfo[2]).toLocaleString()} 원
          </div>
        </div>
      </div>
    </a>
  )
}
