import { useRecoilValue } from 'recoil'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getInterestedExchangeRateFromFirebase } from '../helper/firebaseAuth'
import ExchangeRateModal from '../components/ExchangeRateModal'
import { userState } from '../store/userInfo'
import ExchangeRateCard from '../components/cards/ExchangeRateCard'

export default function ExchangeRateInfo() {
  const userUid = useRecoilValue(userState)
  const queryClient = useQueryClient()

  const { isLoading, isError, error, data }: any = useQuery(
    'exchangeRateData',
    () => {
      return getInterestedExchangeRateFromFirebase(userUid)
    },
  )

  const updateInterestedStockMutation = useMutation(
    getInterestedExchangeRateFromFirebase,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('exchangeRateData')
      },
    },
  )
  const handleUpdateExchangeRate = async () => {
    updateInterestedStockMutation.mutate(userUid)
  }

  if (isLoading) {
    return <div>...Loading</div>
  }
  if (isError) {
    console.error(error)
    return <div>문제발생</div>
  }

  return (
    <div className="max-w-full md:max-w-[80%] ml-auto mr-auto">
      <div className="flex w-full h-96 items-center mt-24 flex-col">
        <div className="w-8/12">
          {Object.values(data).map((v: any) => (
            <ExchangeRateCard
              key={v['환율코드']}
              exchangeCode={v['환율코드']}
              updateExchangeRate={handleUpdateExchangeRate}
            />
          ))}
          <label
            htmlFor="new-exchange-rate"
            className="btn w-full bg-primary text-primary-content shadow-xl items-center text-3xl h-20"
          >
            관심 환율 추가 +
          </label>
          <ExchangeRateModal updateExchangeRate={handleUpdateExchangeRate}/>
        </div>
      </div>
    </div>
  )
}
