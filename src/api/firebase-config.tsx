import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyDfnvqrHpPXojYeR1zKrZVExcB4NmxYybo",
  authDomain: "webexamen-11d9b.firebaseapp.com",
  projectId: "webexamen-11d9b",
  storageBucket: "webexamen-11d9b.appspot.com",
  messagingSenderId: "14365676341",
  appId: "1:14365676341:web:eb079d51caa8031d83327c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Inicializa y exporta db
