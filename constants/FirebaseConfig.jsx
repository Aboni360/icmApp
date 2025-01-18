// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "church-app-1b037.firebaseapp.com",
  projectId: "church-app-1b037",
  storageBucket: "church-app-1b037.firebasestorage.app",
  messagingSenderId: "514438133410",
  appId: "1:514438133410:web:1c51da89d08e0c2f9b09fb",
  measurementId: "G-MCLEQCX5BK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
