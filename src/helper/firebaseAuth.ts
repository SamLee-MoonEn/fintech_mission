import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { getDatabase, ref, get, push, child } from 'firebase/database'

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

  push(ref(firebasedb, `${userUid}/Account`), accountData)
}

// any type 변경 필요
const getAccountInfo = async (userUid: string) => {
  const data = await get(child(ref(firebasedb), `${userUid}/Account`))
  if (data.exists()) {
    const accountList = data.val()
    return accountList
  } else {
    console.log('data없음')
    return {}
  }
}

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
}
