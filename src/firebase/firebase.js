
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat/app";

import 'firebase/compat/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByMNfElW7edwWYJjgJwRXZ8zy0RRyfw6s",
  authDomain: "restaurant-a1e85.firebaseapp.com",
  projectId: "restaurant-a1e85",
  storageBucket: "restaurant-a1e85.appspot.com",
  messagingSenderId: "1089255913800",
  appId: "1:1089255913800:web:a0191305204f6dd5995b7d",
  measurementId: "G-7FWZ4TVCWD"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
