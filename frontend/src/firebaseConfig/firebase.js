// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2wsB2ZRB6_cAB-M0cS3OM2TiMfGRPkSE",
  authDomain: "mepcoconnect.firebaseapp.com",
  projectId: "mepcoconnect",
  storageBucket: "mepcoconnect.firebasestorage.app",
  messagingSenderId: "990385969458",
  appId: "1:990385969458:web:7bac69cd3aba360a591f2b",
  measurementId: "G-4DRXYKTVBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fbauth=getAuth();
export{fbauth}