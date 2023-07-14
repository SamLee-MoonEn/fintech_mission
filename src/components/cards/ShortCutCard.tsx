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
  const queryClient = useQueryClient()
  const userUid = useRecoilValue(userState)

  const { isLoading, isError, error, data }: any = useQuery(
    'accountDataforShortcut',
    () => {
      return getAccountInfo(userUid)
    },
    { notifyOnChangeProps: ['data'] },
  )
  const updateMainCard = useMutation(removeShortcutDataFromFirebase, {
    onSuccess: () => {
      queryClient.invalidateQueries('shortcutCardList')
    },
  })

  const handleremoveShortcutDataFromFirebase = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    updateMainCard.mutate({ userUid, code: deleteKey })
  }

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (isError) {
    console.error(error)
    return <div>문제발생</div>
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
