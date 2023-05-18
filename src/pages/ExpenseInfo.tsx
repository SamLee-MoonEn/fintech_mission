import { useRecoilValueLoadable } from 'recoil'

import { userAccountList, userTransectionsInfo } from '../store/userInfo'
import ChartCard from '../components/ChartCard'

export default function ExpenseInfo() {
  const userTransectionsInfoLoadable =
    useRecoilValueLoadable(userTransectionsInfo)
  const accountList = useRecoilValueLoadable(userAccountList)
  const transectionDataList =
    userTransectionsInfoLoadable.state === 'hasValue'
      ? userTransectionsInfoLoadable.contents
      : []
  const accounts =
    accountList.state === 'hasValue' ? Object.keys(accountList.contents) : []

  return (
    <div className="max-w-full md:max-w-[80%] ml-auto mr-auto">
      <div className="flex w-full h-96 items-center mt-24 flex-col">
        <div className="w-8/12">
          {transectionDataList.map((v, idx) => (
            <ChartCard
              transectionsData={v}
              accountNum={accounts[idx]}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
