import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChmwKo956iE8_jiX4BXgkvkY_Ktq_gJNw",
  authDomain: "nextjs-message.firebaseapp.com",
  databaseURL: "https://nextjs-message-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nextjs-message",
  storageBucket: "nextjs-message.appspot.com",
  messagingSenderId: "705409477713",
  appId: "1:705409477713:web:46f7de261e97f39f4d9c70",
  measurementId: "G-Q92BK6BRTR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
