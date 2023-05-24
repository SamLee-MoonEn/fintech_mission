import { Chart, GoogleChartWrapperChartType } from 'react-google-charts'
import { useEffect, useState } from 'react'

export default function ExpenseChartCard({
  transectionsData,
  accountNum,
}: any) {
  if (!transectionsData.length) {
    return (
      <div className="card w-full bg-white border-2 border-solid border-slate-600 text-primary-content mb-4">
        <div className="card-body">
          <h2 className=" card-title text-black">지출정보 {accountNum}</h2>
          <div className=" h-24 flex justify-center items-center text-black">
            <h2>지출 데이터가 없습니다.</h2>
          </div>
        </div>
      </div>
    )
  }
  const [data, setData] = useState<string[][]>([])
  const [chartType, setChartType] = useState('ColumnChart')
  const [isPercent, setIsPercent] = useState(false)
  const initialData = [['날짜', '입금', '출금', '지출'], ...transectionsData]

  useEffect(() => {
    setData([['날짜', '입금', '출금', '지출'], ...transectionsData])
  }, [])

  const handleDataFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (Number(e.target.value) === 0) {
      setData([['날짜', '입금', '출금', '지출'], ...transectionsData])
      return
    }
    const filteredData = initialData.map((v) => {
      return [v[0], v[Number(e.target.value)]]
    })
    setData(filteredData)
  }

  const handleChartType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    if (e.target.value === 'ColumnChartPercent') {
      setChartType('ColumnChart')
      setIsPercent(true)
    } else {
      setChartType(e.target.value)
      setIsPercent(false)
    }
  }

  const option: any = {
    width: '100%',
    height: 300,
    hAxis: {
      title: '',
    },
    vAxis: {
      title: '',
    },
    isStacked: isPercent ? 'percent' : 'absolute',
    legend: {
      position: 'none',
    },
  }

  return (
    <div className="card w-full bg-white border-2 border-solid border-slate-600 text-primary-content mb-4">
      <div className="card-body">
        <h2 className=" card-title text-black">지출정보 {accountNum}</h2>
        <div className="flex justify-end">
          <form className="text-black">
            <select
              placeholder="표시 정보 선택"
              name="표시 정보 선택"
              onChange={handleDataFilter}
              id={`dataType${accountNum}`}
              className="mr-2"
            >
              <option value={0}>전체</option>
              <option value={1}>입금</option>
              <option value={2}>송금</option>
              <option value={3}>지출</option>
            </select>
            <select
              placeholder="표시 차트 선택"
              name="표시 차트 선택"
              onChange={handleChartType}
              id={`chartType${accountNum}`}
            >
              <option value="ColumnChart">막대 차트</option>
              <option value="ColumnChartPercent">막대 차트(100%)</option>
              <option value="LineChart">선 차트</option>
            </select>
          </form>
        </div>
        <Chart
          chartType={chartType as GoogleChartWrapperChartType}
          loader={<div className=" h-36 text-black">...Loading Chart</div>}
          data={data}
          options={option}
        />
      </div>
    </div>
  )
}
