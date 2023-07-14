import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { fetchTickerSymbolSearcher } from '../../API/stockAPI'
import { setInterestedStockInfoToFirebase } from '../../API/firebaseAuth'
import { userState } from '../../store/userInfo'
import { useMutation, useQueryClient } from 'react-query'

export default function StockModal() {
  const userUid = useRecoilValue(userState)
  const [searchValue, setSearchValue] = useState('')
  const [searchData, setSearchData] = useState([])
  const queryClient = useQueryClient()

  const updateInterestedStockMutation = useMutation(
    setInterestedStockInfoToFirebase,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('stockData')
      },
    },
  )
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  const getStockData = async () => {
    const result = await fetchTickerSymbolSearcher(searchValue)
    setSearchData(result)
  }
  const resetInput = () => {
    setSearchValue('')
  }
  const setInterestedStockInfo = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLParagraphElement>,
  ) => {
    e.stopPropagation()
    try {
      if (
        !(
          e.target instanceof HTMLAnchorElement ||
          e.target instanceof HTMLParagraphElement
        )
      ) {
        return
      }

      if (!e.target.dataset['stockcode'] || !e.target.dataset['stockname']) {
        return
      }
      updateInterestedStockMutation.mutate({
        userUid,
        stockCode: e.target.dataset['stockcode'],
        stockName: e.target.dataset['stockname'],
      })
      resetInput()
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    getStockData()
  }, [searchValue])

  return (
    <>
      <input
        type="checkbox"
        id="new-interested-stock"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="overflow-visible bg-white p-20 rounded-xl relative flex flex-col">
          <label
            htmlFor="new-interested-stock"
            className="btn btn-square btn-outline absolute right-2 top-2"
            onClick={resetInput}
          >
            x
          </label>
          <div className="flex items-center relative">
            <label htmlFor="stock-search" className=" mr-4 text-2xl">
              주식 검색
            </label>
            <input
              type="text"
              className="input input-info w-80"
              placeholder="검색"
              onChange={handleChangeValue}
              value={searchValue}
              id="stock-search"
            />
            <ul className="absolute top-14 left-28 max-h-96 overflow-auto overflow-x-hidden border border-solid border-gray-300">
              {searchData.map((v) => {
                {
                  return (
                    <li
                      className="h-24 w-96 btn-outline bg-white cursor-pointer"
                      key={v['종목코드']}
                    >
                      <a
                        className="flex items-center justify-start h-full"
                        onClick={setInterestedStockInfo}
                        data-stockcode={v['종목코드']}
                        data-stockname={v['종목명']}
                      >
                        <p
                          className="ml-4 text-sm text-gray-400"
                          onClick={setInterestedStockInfo}
                          data-stockcode={v['종목코드']}
                          data-stockname={v['종목명']}
                        >
                          {v['종목코드']}
                        </p>
                        <p
                          className="ml-4 text-lg"
                          onClick={setInterestedStockInfo}
                          data-stockcode={v['종목코드']}
                          data-stockname={v['종목명']}
                        >
                          {v['종목명']}
                        </p>
                        <p
                          className="ml-auto mr-4 text-sm text-gray-400"
                          onClick={setInterestedStockInfo}
                          data-stockcode={v['종목코드']}
                          data-stockname={v['종목명']}
                        >
                          {v['시장구분']}
                        </p>
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
