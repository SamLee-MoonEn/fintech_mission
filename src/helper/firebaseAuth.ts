import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { getDatabase, ref, get, push, child, update } from 'firebase/database'

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
  // const newAccountKey = push(child(ref(firebasedb), 'Account')).key
  const updates:any ={};
  updates[`${userUid}/Account/`+accountNum] = accountData
  update(ref(firebasedb), updates)
  // push(ref(firebasedb, `${userUid}/Account`), accountData)
}


// Account 정보 불러오기. any type 변경 필요
const getAccountInfo = async (userUid: string) => {
  const data = await get(child(ref(firebasedb), `${userUid}/Account`))
  try{
    if (data.exists()) {
      const accountList = data.val()
      return accountList
    } else {
      console.log('data없음')
      return {}
    }
  } catch(err){
    console.error(err)
  }
}
// Account 입금 기능
const addDeposit = async (userUid:string, accountNum:string, deposit:number) => {
  const data = await get(child(ref(firebasedb), `${userUid}/Account/${accountNum}/balance`))
  const updates:any = {}
  updates[`${userUid}/Account/${accountNum}/balance`] = data.val() + deposit
  update(ref(firebasedb), updates)
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
  addDeposit
}
