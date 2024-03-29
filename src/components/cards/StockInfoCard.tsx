import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Chart } from 'react-google-charts'

import { fetchStockData } from '../../API/stockAPI'
import { removeInterestedStockInfoFromFirebase } from '../../API/firebaseAuth'
import { userState } from '../../store/userInfo'
import Loading from '../Loading'
import { useMutation, useQueryClient } from 'react-query'

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
  const [displayLoading, setDisplayLoading] = useState(true)
  const queryClient = useQueryClient()

  const updateInterestedStockMutation = useMutation(
    removeInterestedStockInfoFromFirebase,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('stockData')
      },
    },
  )
  const getStockData = async (stockCount: number) => {
    const result = await fetchStockData(stockCode, stockCount)

    setStockDataList(result)
  }
  const removeStockInfo = () => {
    updateInterestedStockMutation.mutate({ userUid, stockCode })
  }
  useEffect(() => {
    getStockData(stockCount)
    let isLoading = setTimeout(() => {
      setDisplayLoading(false)
    }, 2000)
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
    <>
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
          {displayLoading ? (
            <div className="w-full flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div style={{ width: '110%' }}>
              <Chart
                chartType={'CandlestickChart'}
                loader={
                  <div className=" h-36 text-black">...Loading Chart</div>
                }
                data={data}
                options={option}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
