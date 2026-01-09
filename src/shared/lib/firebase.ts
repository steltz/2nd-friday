import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDsv4qNfKYDDcPu94LTV5_r9hbWxZVqMNA',
  authDomain: 'second-friday.firebaseapp.com',
  projectId: 'second-friday',
  storageBucket: 'second-friday.firebasestorage.app',
  messagingSenderId: '959925431886',
  appId: '1:959925431886:web:8a91e6c24d6bdaa2c39d1f',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
