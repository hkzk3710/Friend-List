import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyB3Yk6s20w6TdM3UN3fJcjBB2inALm5zmQ",
  authDomain: "friend-list-react.firebaseapp.com",
  projectId: "friend-list-react",
  storageBucket: "friend-list-react.appspot.com",
  messagingSenderId: "401185279435",
  appId: "1:401185279435:web:8d7ec4c1664e360840ba4e",
  measurementId: "G-NFHL7VCYEN",
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth: Auth = getAuth(app);
const provider: GoogleAuthProvider = new GoogleAuthProvider();
const db: Firestore = getFirestore(app);

// 型付きでエクスポート
export { analytics, auth, provider, db };
