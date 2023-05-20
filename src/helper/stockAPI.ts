import axios from 'axios'

export const fetchStockData = async (stockCode: string, stockCount: number) => {
  try {
    const response = await axios.get(
      'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo',
      {
        params: {
          likeIsinCd: stockCode,
          numOfRows: stockCount,
          resultType: 'json',
          serviceKey:
            'ytj1pbLOunGrhLDAAyAE2MZUzFBMKulAgaXYzRkch0GJPL3iKzhZhUIlPdKrmvi0IztbY+pjpvnLkiUDnjvMMw==',
        },
      },
    )
    const result = await setStockDataToList(
      response.data.response.body.items.item,
    )
    return result
  } catch (error) {
    console.error(error)
  }
}

// 전달 받은 주식 정보를 react google chart에서 쓸 수 있도록 배열로 변경.
const setStockDataToList = (stockData: any) => {
  const stockDate = stockData.map((v: any) => v['basDt'])
  const stockOpen = stockData.map((v: any) => Number(v['mkp']))
  const stockClose = stockData.map((v: any) => Number(v['clpr']))
  const stockHigh = stockData.map((v: any) => Number(v['hipr']))
  const stockLow = stockData.map((v: any) => Number(v['lopr']))
  const stockDataList: any = []
  for (let i = stockDate.length - 1; i >= 0; i--) {
    stockDataList.push([
      stockDate[i],
      stockLow[i],
      stockOpen[i],
      stockClose[i],
      stockHigh[i],
    ])
  }
  return stockDataList
}

export const fetchTickerSymbolSearcher = async (searchValue: string) => {
  try {
    const response = await axios.get('src/helper/KoreaStockList.json')
    if (searchValue === '') {
      return []
    }
    const regex = new RegExp(searchValue, 'gi')
    const result = response.data
    const filteredResult = result.filter((item: any) =>
      regex.test(item['종목명']),
    )
    return filteredResult
  } catch (error) {
    console.error(error)
  }
}
