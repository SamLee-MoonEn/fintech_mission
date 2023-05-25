import { useRecoilValue } from 'recoil'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import {
  getAccountInfo,
  removeShortcutDataFromFirebase,
} from '../../API/firebaseAuth'
import { userState } from '../../store/userInfo'
import AccountShortcutCard from './shortcutCards/AccountShortcutCard'
import ExpenseShortcutCard from './shortcutCards/ExpenseShortcutCard'
import QRShortcutCard from './shortcutCards/QRShortcutCard'
import StockShortcutCard from './shortcutCards/StockShortcutCard'
import ExchangeRateShortcutCard from './shortcutCards/ExchangeRateShortcutCard'

export default function ShortCutCard({
  detailInfo,
  type,
  deleteKey,
}: {
  detailInfo: string
  type: string
  deleteKey: string
}) {
  const userUid = useRecoilValue(userState)
  const queryClient = useQueryClient()

  const { isLoading, isError, error, data }: any = useQuery(
    'accountDataforShortcut',
    () => {
      return getAccountInfo(userUid)
    },
    { notifyOnChangeProps: ['data'] },
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

  const handleremoveShortcutDataFromFirebase = () => {
    removeShortcutDataFromFirebase(userUid, deleteKey)
    updateShortcut()
  }

  return (
    <>
      {(() => {
        switch (type) {
          case 'QR':
            return (
              <QRShortcutCard
                removeCard={handleremoveShortcutDataFromFirebase}
                data={data[detailInfo]}
                updateAccount={updateShortcut}
                key={`${detailInfo}-${Math.floor(Math.random() * 1000)}`}
              />
            )
          case 'Account':
            return (
              <AccountShortcutCard
                removeCard={handleremoveShortcutDataFromFirebase}
                data={data[detailInfo]}
                key={`${detailInfo}-${Math.floor(Math.random() * 1000)}`}
              />
            )
          case 'Expense':
            return (
              <ExpenseShortcutCard
                removeCard={handleremoveShortcutDataFromFirebase}
                data={data[detailInfo]}
                key={`${detailInfo}-${Math.floor(Math.random() * 1000)}`}
              />
            )
          case 'Stock':
            return (
              <StockShortcutCard
                removeCard={handleremoveShortcutDataFromFirebase}
                data={detailInfo}
                key={`${detailInfo}-${Math.floor(Math.random() * 1000)}`}
              />
            )
          case 'Currency':
            return (
              <ExchangeRateShortcutCard
                removeCard={handleremoveShortcutDataFromFirebase}
                data={detailInfo}
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
