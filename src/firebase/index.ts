// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5MXh-fBRYHrieP3fG_SDOaLRNechqD0c",
  authDomain: "mobile-2223-gb.firebaseapp.com",
  projectId: "mobile-2223-gb",
  storageBucket: "mobile-2223-gb.appspot.com",
  messagingSenderId: "406478157623",
  appId: "1:406478157623:web:180a596d55ffd0eb4cccb2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
