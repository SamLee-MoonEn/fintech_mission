import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { fetchExchageRateData } from '../../helper/exchangeRateAPI'
import { removeInterestedExchangeRateFromFirebase } from '../../helper/firebaseAuth'
import { userState } from '../../store/userInfo'

interface Props {
  bkpr: string
  cur_nm: string
  cur_unit: string
  deal_bas_r: string
  kftc_bkpr: string
  kftc_deal_bas_r: string
  result: number
  ten_dd_efee_r: string
  ttb: string
  tts: string
  yy_efee_r: string
}

const emptyCard = (
  <div className="card w-full  bg-neutral text-white mb-4">
    <div className="card-body">
      <div className="flex items-center">
        <h2 className=" card-title">환율 정보</h2>
        <h2 className=" card-title ml-auto">
          공휴일 혹은 평일 오전 11시 이전에는 데이터를 제공하지 않습니다.
        </h2>
        <button className="btn btn-success ml-4 text-white">삭제</button>
      </div>
    </div>
  </div>
)

export default function ExchangeRateCard({
  exchangeCode,
  updateExchangeRate,
}: {
  exchangeCode: string
  updateExchangeRate: () => void
}) {
  const userUid = useRecoilValue(userState)
  const [exchangeRateData, setExchangeRateData] = useState<Props>()

  const getExchangeRateData = async () => {
    const result: Props[] = await fetchExchageRateData()
    const filteredResult = result.filter((v) => v['cur_unit'] === exchangeCode)
    setExchangeRateData(filteredResult[0])
  }

  const removeExchangeRateData = async () => {
    removeInterestedExchangeRateFromFirebase(userUid, exchangeCode)
    updateExchangeRate()
  }

  useEffect(() => {
    getExchangeRateData()
  }, [])

  if (!exchangeRateData) {
    return emptyCard
  }

  return (
    <div className="card w-full bg-slate-500 text-white mb-4">
      <div className="card-body">
        <div className="flex items-center">
          <h2 className=" card-title ml-4 text-3xl">
            {exchangeRateData['cur_nm']}
          </h2>
          <div className=" divider-horizontal"></div>
          <div className="ml-auto flex flex-col items-end">
            <h2 className=" card-title ml-auto mb-2">
              송금 받으실 때: {exchangeRateData['ttb']} 원
            </h2>
            <h2 className=" card-title ml-auto mb-2">
              송금 보내실 때: {exchangeRateData['tts']} 원
            </h2>
            <h2 className=" card-title ml-auto">
              매매 기준율: {exchangeRateData['deal_bas_r']} 원
            </h2>
          </div>
          <button
            className="btn btn-success ml-10 text-white"
            onClick={removeExchangeRateData}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
