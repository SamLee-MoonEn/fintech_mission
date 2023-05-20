import { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'

import { fetchStockData } from '../helper/stockAPI'
import StockModal from '../components/StockModal'

export default function StockInfo() {
  const [stockDataList, setStockDataList] = useState([])

  const getStockData = async () => {
    const result = await fetchStockData()

    setStockDataList(result)
  }

  useEffect(() => {
    getStockData()
  }, [])
  const data = [['date', '저', '시', '종', '고'], ...stockDataList]
  const option: any = {
    width: '100%',
    height: 300,
    hAxis: {
      title: '',
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
  }

  return (
    <div className="max-w-full md:max-w-[80%] ml-auto mr-auto">
      <div className="flex w-full h-96 items-center mt-24 flex-col">
        <div className="w-8/12">
          <div className="card w-full bg-white border-2 border-solid border-slate-600 text-primary-content mb-4">
            <div className="card-body">
              <h2 className=" card-title text-black">주식정보</h2>
              <Chart
                chartType={'CandlestickChart'}
                loader={
                  <div className=" h-36 text-black">...Loading Chart</div>
                }
                data={data}
                options={option}
              />
            </div>
          </div>
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
