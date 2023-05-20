import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { getInterestedStockInfoFromFirebase } from '../helper/firebaseAuth'
import { userState } from '../store/userInfo'

import StockModal from '../components/StockModal'
import StockInfoCard from '../components/StockInfoCard'

export default function StockInfo() {
  const userUid = useRecoilValue(userState)
  const [stockInfoList, setStockInfoList] = useState<any>([])

  const getInterestedStockInfo = async () => {
    const tempStockInfo = await getInterestedStockInfoFromFirebase(userUid)
    setStockInfoList(Object.values(tempStockInfo))
  }

  useEffect(() => {
    getInterestedStockInfo()
  }, [])

  return (
    <div className="max-w-full md:max-w-[80%] ml-auto mr-auto">
      <div className="flex w-full h-96 items-center mt-24 flex-col">
        <div className="w-8/12">
          {stockInfoList.map((v: { 종목명: string; 종목코드: string }) => {
            return (
              <StockInfoCard
                stockCode={v['종목코드']}
                stockName={v['종목명']}
                key={v['종목코드']}
              />
            )
          })}

          <label
            htmlFor="new-interested-stock"
            className="btn w-full bg-neutral text-primary-content shadow-xl items-center text-3xl h-20"
          >
            관심 주식 추가 +
          </label>
          <StockModal />
        </div>
      </div>
    </div>
  )
}
