import { useEffect, useState } from 'react'
import { fetchTickerSymbolSearcher } from '../helper/stockAPI'

export default function StockModal() {
  const [searchValue, setSearchValue] = useState('')
  const [searchData, setSearchData] = useState([])

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
                    <li className="h-24 w-96 btn-outline bg-white ">
                      <div className="flex items-center justify-start h-full">
                        <h2 className="ml-4 text-sm text-gray-400">
                          {String(v['종목코드'])}
                        </h2>
                        <h2 className="ml-4 text-lg">{v['종목명']}</h2>
                        <h2 className="ml-auto mr-4 text-sm text-gray-400">
                          {v['시장구분']}
                        </h2>
                      </div>
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
