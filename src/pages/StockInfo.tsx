import { useRecoilValue } from 'recoil'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getInterestedStockInfoFromFirebase } from '../API/firebaseAuth'
import { userState } from '../store/userInfo'

import StockModal from '../components/modals/StockModal'
import StockInfoCard from '../components/cards/StockInfoCard'

export default function StockInfo() {
  const userUid = useRecoilValue(userState)
  const queryClient = useQueryClient()

  //useQuery 사용
  const { isLoading, isError, error, data }: any = useQuery('stockData', () => {
    return getInterestedStockInfoFromFirebase(userUid)
  })

  //useMudataion을 이용해서 데이터 업데이트 시 서버에서 데이터 받아오기
  // const updateInterestedStockMutation = useMutation(
  //   getInterestedStockInfoFromFirebase,
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries('stockData')
  //     },
  //   },
  // )
  // const handleUpdateStock = async () => {
  //   updateInterestedStockMutation.mutate(userUid)
  // }

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
          {Object.values(data).map((v: any) => {
            return (
              <StockInfoCard
                stockCode={v['종목코드']}
                stockName={v['종목명']}
                key={v['종목코드']}
              />
            )
          })}

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
