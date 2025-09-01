// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6ESDsR55c9akmJXGa-CxQdhlHNW9nNys",
  authDomain: "login-app-6abe7.firebaseapp.com",
  projectId: "login-app-6abe7",
  storageBucket: "login-app-6abe7.firebasestorage.app",
  messagingSenderId: "329311806938",
  appId: "1:329311806938:web:9b34208f22e78bdec84ce3",
  measurementId: "G-KTVBWVWLEH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// const analytics = getAnalytics(app);