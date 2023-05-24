import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { getDatabase, ref, get, child, update } from 'firebase/database'

import { dateFormatMaker, dateTimeFormatMaker } from './helper'

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_API_ID,
} = import.meta.env

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_API_ID,
}
const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth()
const firebasedb = getDatabase(firebaseApp)

// 새로운 Account 만들기
const createNewAccount = (
  userUid: string,
  accountNum: string,
  password: string,
) => {
  const accountData = {
    accountNum: `${accountNum}`,
    password,
    balance: 0,
    transactions: {},
  }
  const updates: any = {}
  updates[`${userUid}/Account/` + accountNum] = accountData
  update(ref(firebasedb), updates)
}

// Account 정보 불러오기. any type 변경 필요
const getAccountInfo = async (userUid: string) => {
  const data = await get(child(ref(firebasedb), `${userUid}/Account`))
  try {
    if (data.exists()) {
      const accountList = data.val()
      return accountList
    } else {
      console.log('data없음')
      return {}
    }
  } catch (err) {
    console.error(err)
  }
}
// Account 입금 기능
const addDeposit = async (
  userUid: string,
  accountNum: string,
  depositAmount: number,
) => {
  try {
    const data = await get(
      child(ref(firebasedb), `${userUid}/Account/${accountNum}/balance`),
    )
    const balance = data.val()
    // 입금 시에 입력하는 키 값 날짜 형식으로 생성.(yyyy-MM-dd)
    const newTransectionKey = dateFormatMaker(new Date())
    // 기존에 키 값 가져오기.
    const transactionsData = await get(
      child(
        ref(firebasedb),
        `${userUid}/Account/${accountNum}/transection/` + newTransectionKey,
      ),
    )
    const updates: any = {}
    // 잔액 처리
    updates[`${userUid}/Account/${accountNum}/balance`] =
      balance + depositAmount
    // 기존의 키값이 있는지 확인. 있는 경우 기존 데이터에 입금 추가
    // [날짜, 입금, 출금, 지출]
    if (transactionsData.exists()) {
      updates[
        `${userUid}/Account/${accountNum}/transection/` + newTransectionKey
      ] = [
        newTransectionKey,
        transactionsData.val()[1] + depositAmount,
        transactionsData.val()[2],
        transactionsData.val()[3],
      ]
      update(ref(firebasedb), updates)
      return
    }
    // 기존의 키 값이 없는 경우에는 새로 생성.
    // [날짜, 입금, 출금, 지출]
    updates[
      `${userUid}/Account/${accountNum}/transection/` + newTransectionKey
    ] = [newTransectionKey, depositAmount, 0, 0]
    update(ref(firebasedb), updates)
  } catch (err) {
    console.log(err)
  }
}

// Account 출금 기능
const accountTransfer = async (
  userUid: string,
  accountNum: string,
  transferAmount: number,
  password: string,
) => {
  try {
    const accountPassword = await get(
      child(ref(firebasedb), `${userUid}/Account/${accountNum}/password`),
    )
    if (accountPassword.val() !== password) {
      return 'wrongPassword'
    }
    const data = await get(
      child(ref(firebasedb), `${userUid}/Account/${accountNum}/balance`),
    )
    const balance = data.val()
    if (balance < transferAmount) {
      return 'noBalance'
    }
    // 출금 시에 입력하는 키 값 날짜 형식으로 생성.(yyyy-MM-dd)
    const newTransectionKey = dateFormatMaker(new Date())
    // 기존에 키 값 가져오기.
    const transactionsData = await get(
      child(
        ref(firebasedb),
        `${userUid}/Account/${accountNum}/transection/` + newTransectionKey,
      ),
    )
    const updates: any = {}
    // 잔액 처리
    updates[`${userUid}/Account/${accountNum}/balance`] =
      balance - transferAmount
    // 기존의 키값이 있는지 확인. 있는 경우 기존 데이터에 출금 추가.
    // [날짜, 입금, 출금, 지출]
    if (transactionsData.exists()) {
      updates[
        `${userUid}/Account/${accountNum}/transection/` + newTransectionKey
      ] = [
        dateFormatMaker(new Date()),
        transactionsData.val()[1],
        transactionsData.val()[2] + transferAmount,
        transactionsData.val()[3],
      ]
      update(ref(firebasedb), updates)
      return 'success'
    }
    // 기존의 키 값이 없는 경우에는 새로 생성.
    // [날짜, 입금, 출금, 지출]
    updates[
      `${userUid}/Account/${accountNum}/transection/` + newTransectionKey
    ] = [newTransectionKey, 0, transferAmount, 0]
    update(ref(firebasedb), updates)
    return 'success'
  } catch (err) {
    console.log(err)
    return 'error'
  }
}
// QR 지출 기록 기능
const payment = async (userUid: string, accountNum: string, amount: number) => {
  try {
    const data = await get(
      child(ref(firebasedb), `${userUid}/Account/${accountNum}/balance`),
    )
    const balance = data.val()
    // 입금 시에 입력하는 키 값 날짜 형식으로 생성.(yyyy-MM-dd)
    const newTransectionKey = dateFormatMaker(new Date())
    // 기존에 키 값 가져오기.
    const transactionsData = await get(
      child(
        ref(firebasedb),
        `${userUid}/Account/${accountNum}/transection/` + newTransectionKey,
      ),
    )
    const updates: any = {}
    // 잔액 처리
    updates[`${userUid}/Account/${accountNum}/balance`] = balance - amount
    // 기존의 키값이 있는지 확인. 있는 경우 기존 데이터에 입금 추가
    // [날짜, 입금, 출금, 지출]
    if (transactionsData.exists()) {
      updates[
        `${userUid}/Account/${accountNum}/transection/` + newTransectionKey
      ] = [
        newTransectionKey,
        transactionsData.val()[1],
        transactionsData.val()[2],
        transactionsData.val()[3] + amount,
      ]
      update(ref(firebasedb), updates)
      return
    }
    // 기존의 키 값이 없는 경우에는 새로 생성.
    // [날짜, 입금, 출금, 지출]
    updates[
      `${userUid}/Account/${accountNum}/transection/` + newTransectionKey
    ] = [newTransectionKey, 0, 0, amount]
    update(ref(firebasedb), updates)
  } catch (err) {
    console.log(err)
  }
}

// 거래 리스트 정보 불러오기
const getTransectionsInfo = async (userUid: string, accountNum: string) => {
  const data = await get(
    child(ref(firebasedb), `${userUid}/Account/${accountNum}/transection/`),
  )
  try {
    if (data.exists()) {
      const transectionsList = data.val()
      return transectionsList
    } else {
      console.log('data없음')
      return {}
    }
  } catch (err) {
    console.error(err)
  }
}
// 관심 주식 정보 DB에 저장
const setInterestedStockInfoToFirebase = (
  userUid: string,
  stockCode: string,
  stockName: string,
) => {
  const stockData = {
    종목코드: stockCode,
    종목명: stockName,
  }
  try {
    const updates: any = {}
    updates[`${userUid}/Stock/` + stockCode] = stockData
    update(ref(firebasedb), updates)
  } catch (e) {
    console.error(e)
  }
}

// 관심 주식 정보 가져오기
const getInterestedStockInfoFromFirebase = async (userUid: string) => {
  try {
    const data = await get(child(ref(firebasedb), `${userUid}/Stock`))
    if (data.exists()) {
      const stockList = data.val()
      return stockList
    } else {
      console.log('data없음')
      return []
    }
  } catch (err) {
    console.error(err)
  }
}
// 관심 주식 삭제
const removeInterestedStockInfoFromFirebase = async (
  userUid: string,
  stockCode: string,
) => {
  try {
    const updates: any = {}
    updates[`${userUid}/Stock/` + stockCode] = null
    update(ref(firebasedb), updates)
  } catch (e) {
    console.error(e)
  }
}

// 관심 환율 정보 DB에 저장
const setInterestedExchangeRateToFirebase = (
  userUid: string,
  curCode: string,
) => {
  const exchangeRateData = {
    환율코드: curCode,
  }
  try {
    const updates: any = {}
    updates[`${userUid}/Currency/` + curCode] = exchangeRateData
    update(ref(firebasedb), updates)
  } catch (e) {
    console.error(e)
  }
}
// 관심 환율 정보 가져오기
const getInterestedExchangeRateFromFirebase = async (userUid: string) => {
  try {
    const data = await get(child(ref(firebasedb), `${userUid}/Currency`))
    if (data.exists()) {
      const exchangeRateList = data.val()
      return exchangeRateList
    } else {
      console.log('data없음')
      return []
    }
  } catch (err) {
    console.error(err)
  }
}
// 관심 환율 삭제
const removeInterestedExchangeRateFromFirebase = async (
  userUid: string,
  curCode: string,
) => {
  try {
    const updates: any = {}
    updates[`${userUid}/Currency/` + curCode] = null
    update(ref(firebasedb), updates)
  } catch (e) {
    console.error(e)
  }
}
// Shortcut Card 정보 DB에 저장
const setShortcutDataToFirebase = (
  userUid: string,
  shortcutCardType: string,
  detailInfo: string,
) => {
  try {
    const newShortcutKey = dateTimeFormatMaker(new Date())
    const shortcutInfo = {
      shortcutCardType: shortcutCardType,
      detailInfo: detailInfo,
    }
    const updates: any = {}
    updates[`${userUid}/Shortcut/` + newShortcutKey] = shortcutInfo
    update(ref(firebasedb), updates)
  } catch (e) {
    console.error(e)
  }
}
// Shortcut Card 정보 DB에서 가져오기
const getShortcutDataFromFirebase = async (userUid: string) => {
  try {
    const data = await get(child(ref(firebasedb), `${userUid}/Shortcut`))
    if (data.exists()) {
      const ShortcutCardList = data.val()
      return ShortcutCardList
    } else {
      console.log('data없음')
      return []
    }
  } catch (err) {
    console.error(err)
  }
}

// Google 로그인
const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const curUserInfo = await signInWithPopup(auth, provider)
    return curUserInfo
  } catch (err) {
    console.log(err)
  }
}

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  createNewAccount,
  handleGoogleLogin,
  getAccountInfo,
  addDeposit,
  payment,
  accountTransfer,
  getTransectionsInfo,
  setInterestedStockInfoToFirebase,
  getInterestedStockInfoFromFirebase,
  removeInterestedStockInfoFromFirebase,
  setInterestedExchangeRateToFirebase,
  getInterestedExchangeRateFromFirebase,
  removeInterestedExchangeRateFromFirebase,
  setShortcutDataToFirebase,
  getShortcutDataFromFirebase,
}
