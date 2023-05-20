import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Chart } from 'react-google-charts'

import { fetchStockData } from '../helper/stockAPI'
import { removeInterestedStockInfoFromFirebase } from '../helper/firebaseAuth'
import { userState } from '../store/userInfo'

export default function StockInfoCard({
  stockCode,
  stockName,
}: {
  stockCode: string
  stockName: string
}) {
  const userUid = useRecoilValue(userState)
  const [stockDataList, setStockDataList] = useState([])
  const [stockCount, setStocCount] = useState(100)

  const getStockData = async (stockCount: number) => {
    const result = await fetchStockData(stockCode, stockCount)

    setStockDataList(result)
  }
  const removeStockInfo = async () => {
    removeInterestedStockInfoFromFirebase(userUid, stockCode)
  }
  useEffect(() => {
    getStockData(stockCount)
  }, [stockCount])

  const handleStockCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setStocCount(Number(e.target.value))
  }

  const data = [['date', '저', '시', '종', '고'], ...stockDataList]
  const option: any = {
    width: '100%',
    height: 300,
    hAxis: {
      title: '',
      textStyle: {
        fontSize: 10,
      },
    },
    vAxis: {
      title: '',
    },
    legend: {
      position: 'none',
    },
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: '#0A7DF2' },
      risingColor: { strokeWidth: 0, fill: '#EE3739' },
    },
    backgroundColor: {
      fill: 'transparent',
    },
  }

  return (
    <div className="card w-full bg-white border-2 border-solid border-slate-600 text-primary-content mb-4">
      <div className="card-body">
        <div className="flex items-center">
          <h2 className=" card-title text-black">{stockName}</h2>
          <form className="text-black ml-auto">
            <select
              placeholder="표시 일봉 수"
              name="표시 일봉 수"
              id={`dataCount${stockCode}`}
              onChange={handleStockCount}
              className="w-16 text-center"
            >
              <option value={100}>100</option>
              <option value={50}>50</option>
              <option value={30}>30</option>
            </select>
          </form>
          <button
            onClick={removeStockInfo}
            className="btn btn-ghost ml-4 text-black"
          >
            삭제
          </button>
        </div>
        <div style={{ width: '110%' }}>
          <Chart
            chartType={'CandlestickChart'}
            loader={<div className=" h-36 text-black">...Loading Chart</div>}
            data={data}
            options={option}
          />
        </div>
      </div>
    </div>
  )
}
