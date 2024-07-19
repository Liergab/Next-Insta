// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  //  "x-next-v2-56eba.firebaseapp.com",
  projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //  "x-next-v2-56eba",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // "x-next-v2-56eba.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // "278844968915",
  appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID ,
  //  "1:278844968915:web:77b6ee52b33208f6952926",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  // "G-GPLZ9SS52V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);