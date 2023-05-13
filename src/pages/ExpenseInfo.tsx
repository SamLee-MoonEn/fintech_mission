import { Chart } from 'react-google-charts'

import { dataSet } from '../testdata'

export default function ExpenseInfo() {
  const data = dataSet
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
    <div className="max-w-full md:max-w-[80%] ml-auto mr-auto">
      <div className="flex w-full h-96 items-center mt-24 flex-col">
        <div className="w-8/12">
          <div className="card w-full bg-white border-2 border-solid border-slate-600 text-primary-content">
            <div className="card-body">
              <h2 className=" card-title text-black">지출정보</h2>
              <Chart
                chartType={chartType}
                loader={<div>Loading Chart</div>}
                data={data}
                options={option}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
