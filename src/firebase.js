// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpQ4looAjxBzviUNDMQopgYM8fpPxZphg",
  authDomain: "api-blog-peliculas.firebaseapp.com",
  projectId: "api-blog-peliculas",
  storageBucket: "api-blog-peliculas.appspot.com",
  messagingSenderId: "577297182460",
  appId: "1:577297182460:web:4ac4715f099ac9c49ff179"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);