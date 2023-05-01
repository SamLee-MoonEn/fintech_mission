import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

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

const createNewAccount = (user: User, accountNum: string) => {
  set(ref(firebasedb, `${user.uid}/Account `), {
    account: {
      accountNum: `${accountNum}`,
      password: 0,
      balance: 0,
      transactions: {},
    },
  })
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
}
