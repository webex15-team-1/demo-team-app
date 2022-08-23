// 必要な関数を import
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyBELfbuxjohIts918uKBFAEYm3dI-Bfr5g",
  authDomain: "fir-team-app-1dec7.firebaseapp.com",
  projectId: "fir-team-app-1dec7",
  storageBucket: "fir-team-app-1dec7.appspot.com",
  messagingSenderId: "689854903598",
  appId: "1:689854903598:web:b8d973961960921b22b6bf",
  measurementId: "G-8H7TDR0V8P",
}

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig)
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)
