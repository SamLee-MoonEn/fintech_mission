import { useRecoilValue } from 'recoil'
import { useState } from 'react'

import { EXCHANGE_RATE_CODE } from '../helper/exchangeRateAPI'
import { userState } from '../store/userInfo'
import { setInterestedExchangeRateToFirebase } from '../helper/firebaseAuth'

export default function ExchangeRateModal({
  updateExchangeRate,
}: {
  updateExchangeRate: () => void
}) {
  const userUid = useRecoilValue(userState)

  const [exchangeRateValue, setExchangeRateValue] = useState('')

  const handleSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExchangeRateValue(e.target.value)
  }
  const setInterestedExchangeRate = () => {
    setInterestedExchangeRateToFirebase(userUid, exchangeRateValue)
    updateExchangeRate()
  }
  return (
    <>
      <input type="checkbox" id="new-exchange-rate" className="modal-toggle" />
      <div className="modal">
        <div className="overflow-visible bg-white p-20 rounded-xl relative flex flex-col">
          <label
            htmlFor="new-exchange-rate"
            className="btn btn-square btn-outline absolute right-2 top-2"
          >
            x
          </label>
          <div>
            <form className="w-full">
              <select
                defaultValue="default"
                className="w-full mb-4"
                onChange={handleSelectValue}
              >
                <option value="default" disabled hidden>
                  관심 환율을 선택해주세요.
                </option>
                {EXCHANGE_RATE_CODE.map((v) => (
                  <option
                    key={v['cur_unit']}
                    value={v['cur_unit']}
                  >{`${v['cur_unit']} ${v['cur_nm']}`}</option>
                ))}
              </select>
            </form>
            <label
              htmlFor="new-exchange-rate"
              className="btn btn-primary text-xl mt-4 w-full"
              onClick={setInterestedExchangeRate}
            >
              추가
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
