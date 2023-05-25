import axios from 'axios'

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

export const fetchExchageRateData = async () => {
  try {
    const response = await axios.get('/api', {
      params: {
        authkey: 'XXmcviNkzbGTTXtMG32sfnLr9V5n9dMd',
        data: 'AP01',
      },
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173/',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const EXCHANGE_RATE_CODE = [
  {
    cur_unit: 'AED',
    cur_nm: '아랍에미리트 디르함',
  },
  {
    cur_unit: 'AUD',
    cur_nm: '호주 달러',
  },
  {
    cur_unit: 'BHD',
    cur_nm: '바레인 디나르',
  },
  {
    cur_unit: 'BND',
    cur_nm: '브루나이 달러',
  },
  {
    cur_unit: 'CAD',
    cur_nm: '캐나다 달러',
  },
  {
    cur_unit: 'CHF',
    cur_nm: '스위스 프랑',
  },
  {
    cur_unit: 'CNH',
    cur_nm: '위안화',
  },
  {
    cur_unit: 'DKK',
    cur_nm: '덴마아크 크로네',
  },
  {
    cur_unit: 'EUR',
    cur_nm: '유로',
  },
  {
    cur_unit: 'GBP',
    cur_nm: '영국 파운드',
  },
  {
    cur_unit: 'HKD',
    cur_nm: '홍콩 달러',
  },
  {
    cur_unit: 'IDR(100)',
    cur_nm: '인도네시아 루피아',
  },
  {
    cur_unit: 'JPY(100)',
    cur_nm: '일본 옌',
  },
  {
    cur_unit: 'KWD',
    cur_nm: '쿠웨이트 디나르',
  },
  {
    cur_unit: 'MYR',
    cur_nm: '말레이지아 링기트',
  },
  {
    cur_unit: 'NOK',
    cur_nm: '노르웨이 크로네',
  },
  {
    cur_unit: 'NZD',
    cur_nm: '뉴질랜드 달러',
  },
  {
    cur_unit: 'SAR',
    cur_nm: '사우디 리얄',
  },
  {
    cur_unit: 'SEK',
    cur_nm: '스웨덴 크로나',
  },
  {
    cur_unit: 'SGD',
    cur_nm: '싱가포르 달러',
  },
  {
    cur_unit: 'THB',
    cur_nm: '태국 바트',
  },
  {
    cur_unit: 'USD',
    cur_nm: '미국 달러',
  },
]
