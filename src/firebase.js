import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxrK7ASkcU0mb19GfTlXmSpexQDah7pWk",
  authDomain: "senior-living-2150f.firebaseapp.com",
  projectId: "senior-living-2150f",
  storageBucket: "senior-living-2150f.appspot.com",
  messagingSenderId: "942944243572",
  appId: "1:942944243572:web:e6906dddb476f4eac96621"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();