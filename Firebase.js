// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1cr8qqLdvA5B7BsJvZpjOHhfO3BCDfyo",
  authDomain: "notes-app-9bba2.firebaseapp.com",
  projectId: "notes-app-9bba2",
  storageBucket: "notes-app-9bba2.appspot.com",
  messagingSenderId: "484169541718",
  appId: "1:484169541718:web:ebd70e19c548803df3f3f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)