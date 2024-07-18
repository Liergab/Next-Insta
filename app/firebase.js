// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-v2-56eba.firebaseapp.com",
  projectId: "x-next-v2-56eba",
  storageBucket: "x-next-v2-56eba.appspot.com",
  messagingSenderId: "278844968915",
  appId: "1:278844968915:web:77b6ee52b33208f6952926",
  measurementId: "G-GPLZ9SS52V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);