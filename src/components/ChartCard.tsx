import { Chart } from 'react-google-charts'

export default function ChartCard({ transectionsData }: any) {
  if (!transectionsData.length) {
    return (
      <div className="card w-full bg-white border-2 border-solid border-slate-600 text-primary-content mb-4">
        <div className="card-body">
          <h2 className=" card-title text-black">지출정보</h2>
          <div className=" h-24 flex justify-center items-center text-black">
            <h2>지출 데이터가 없습니다.</h2>
          </div>
        </div>
      </div>
    )
  }
  const data = [['날짜', '입금', '출금', '지출'], ...transectionsData]
  const chartType = 'ColumnChart'
  const option: any = {
    width: '100%',
    height: 300,
    hAxis: {
      title: '',
    },
    vAxis: {
      title: '',
    },
    isStacked: 'percent',
    legend: {
      position: 'none',
    },
  }
  return (
    <div className="card w-full bg-white border-2 border-solid border-slate-600 text-primary-content mb-4">
      <div className="card-body">
        <h2 className=" card-title text-black">지출정보</h2>
        <Chart
          chartType={chartType}
          loader={<div className=" h-36 text-black">...Loading Chart</div>}
          data={data}
          options={option}
        />
      </div>
    </div>
  )
}
