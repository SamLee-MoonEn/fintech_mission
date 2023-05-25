import { useEffect, useState } from 'react'

import { fetchExchageRateData } from '../../../helper/exchangeRateAPI'

interface ExchangeRateType {
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

export default function ExchangeRateShortcutCard({ data }: { data: string }) {
  const [exchangeRateData, setExchangeRateData] = useState<ExchangeRateType>()

  const getExchangeRateData = async () => {
    const result: ExchangeRateType[] = await fetchExchageRateData()
    const filteredResult = result.filter((v) => v['cur_unit'] === data)
    setExchangeRateData(filteredResult[0])
  }
  useEffect(() => {
    getExchangeRateData()
  }, [])
  return (
    <a
      href="/stockinfo"
      className="btn btn-outline border-slate-400 border-solid border-2 h-36"
    >
      <div className="block w-full">
        <div className="mb-4 text-left text-lg">{exchangeRateData?.cur_nm}</div>
        <div className="flex justify-end">
          <div className="text-right text-2xl">매매 기준율</div>
          <div className="text-right text-2xl ml-4">
            {Number(exchangeRateData?.deal_bas_r).toLocaleString()} 원
          </div>
        </div>
      </div>
    </a>
  )
}
