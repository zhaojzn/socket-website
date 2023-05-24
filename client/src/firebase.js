import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC97_YDP9t943YFz4WyASBB6kxUUkpgASA",
  authDomain: "online-site-57a39.firebaseapp.com",
  projectId: "online-site-57a39",
  storageBucket: "online-site-57a39.appspot.com",
  messagingSenderId: "447870963261",
  appId: "1:447870963261:web:04b96d02f73c967d782454"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();