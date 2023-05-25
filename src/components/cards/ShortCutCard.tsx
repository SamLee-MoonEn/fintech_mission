import { useRecoilValue } from 'recoil'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getAccountInfo } from '../../helper/firebaseAuth'
import { userState } from '../../store/userInfo'
import AccountShortcutCard from './shortcutCards/AccountShortcutCard'
import ExpenseShortcutCard from './shortcutCards/ExpenseShortcutCard'
import QRShortcutCard from './shortcutCards/QRShortcutCard'
import { useEffect } from 'react'

export default function ShortCutCard({
  detailInfo,
  type,
}: {
  detailInfo: string
  type: string
}) {
  const userUid = useRecoilValue(userState)
  const queryClient = useQueryClient()

  const { isLoading, isError, error, data }: any = useQuery(
    'accountDataforShortcut',
    () => {
      return getAccountInfo(userUid)
    },
  )

  // useMudataion을 이용해서 데이터 업데이트 시 서버에서 데이터 받아오기
  const updateAccountMutation = useMutation(getAccountInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('accountDataforShortcut')
    },
  })

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (isError) {
    console.error(error)
    return <div>문제발생</div>
  }

  const updateShortcut = async () => {
    setTimeout(() => {
      updateAccountMutation.mutate(userUid)
    }, 1000)
  }

  return (
    <>
      {(() => {
        switch (type) {
          case 'QR':
            return (
              <QRShortcutCard
                data={data[detailInfo]}
                updateAccount={updateShortcut}
                key={`${detailInfo}-${Math.floor(Math.random() * 1000)}`}
              />
            )
          case 'Account':
            return (
              <AccountShortcutCard
                data={data[detailInfo]}
                key={`${detailInfo}-${Math.floor(Math.random() * 1000)}`}
              />
            )
          case 'Expense':
            return (
              <ExpenseShortcutCard
                data={data[detailInfo]}
                key={`${detailInfo}-${Math.floor(Math.random() * 1000)}`}
              />
            )
          default:
            return (
              <div className="card card-bordered border-2 border-solid border-slate-400 h-36">
                <div className="card-body">
                  <div className="card-title">{detailInfo}</div>
                  <div className=" card-actions">{type}</div>
                </div>
              </div>
            )
        }
      })()}
    </>
  )
}
