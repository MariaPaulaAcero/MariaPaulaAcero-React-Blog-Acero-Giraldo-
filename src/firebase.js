// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getFirestore, collection, getDoc } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdmy4g4JyfUK3nZzY1X4eafF_gnaCwGvk",
  authDomain: "blogpeliculas-6336b.firebaseapp.com",
  projectId: "blogpeliculas-6336b",
  storageBucket: "blogpeliculas-6336b.appspot.com",
  messagingSenderId: "1000762458991",
  appId: "1:1000762458991:web:51f5e807164f3c00f8de9a",
  measurementId: "G-9PVRQTGRXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default firebaseConfig;