import { useEffect, useState } from 'react'

import { fetchStockData } from '../../../API/stockAPI'
import { useRecoilValue } from 'recoil'
import { userState } from '../../../store/userInfo'
import { getInterestedStockInfoFromFirebase } from '../../../API/firebaseAuth'
import Loading from '../../Loading'

export default function StockShortcutCard({
  data,
  removeCard,
}: {
  data: string
  removeCard: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const [stockInfo, setStockInfo] = useState<string>('0')
  const [stockName, setStockName] = useState<string>('')
  const [displayLoading, setDisplayLoading] = useState(true)
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
    setTimeout(() => {
      setDisplayLoading(false)
    }, 2000)
  }, [displayLoading])

  return (
    <a
      href="/stockinfo"
      className="relative btn btn-outline border-slate-400 border-solid border-2 h-36"
    >
      <div className="block w-full">
        {displayLoading ? (
          <Loading />
        ) : (
          <>
            <button
              onClick={removeCard}
              className=" btn btn-sm bg-transparent text-transparent text-black border-0 hover:bg-red-400 hover:text-white absolute top-3 right-3"
            >
              X
            </button>
            <div className="mb-4 text-left text-lg">{stockName}</div>
            <div className="flex justify-end">
              <div className="text-right text-2xl">전일 종가</div>
              <div className="text-right text-2xl ml-4">
                {Number(stockInfo[2]).toLocaleString()} 원
              </div>
            </div>
          </>
        )}
      </div>
    </a>
  )
}
