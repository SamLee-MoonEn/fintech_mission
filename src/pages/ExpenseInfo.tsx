import { useEffect, useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { userState, userTransectionsInfo } from '../store/userInfo'
import ChartCard from '../components/ChartCard'

export default function ExpenseInfo() {
  const userTransectionsInfoLoadable =
    useRecoilValueLoadable(userTransectionsInfo)
  const [transectionList, setTransectionList]: any = useState([
    '날짜',
    '입금',
    '출금',
    '지출',
  ])
  const transectionDataList =
    userTransectionsInfoLoadable.state === 'hasValue'
      ? userTransectionsInfoLoadable.contents
      : []

  // useEffect(() => {
  //   if (userTransectionsInfoLoadable.state === 'hasValue') {
  //     const transectionDataList = userTransectionsInfoLoadable.contents
  //     setTransectionList([[...transectionList], ...transectionDataList[0]])
  //   }
  //   console.log(transectionList)
  // }, [userTransectionsInfoLoadable])

  return (
    <div className="max-w-full md:max-w-[80%] ml-auto mr-auto">
      <div className="flex w-full h-96 items-center mt-24 flex-col">
        <div className="w-8/12">
          {transectionDataList.map((v, idx) => (
            <ChartCard transectionsData={v} key={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}
