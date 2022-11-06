import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvrzaBjC5yIVHLEqe81O-7JeQwQEJjOz8",
  authDomain: "react-native-crud-8d9fc.firebaseapp.com",
  projectId: "react-native-crud-8d9fc",
  storageBucket: "react-native-crud-8d9fc.appspot.com",
  messagingSenderId: "651893596469",
  appId: "1:651893596469:web:5fd42fc854888ccb06ac7c",
  measurementId: "G-DMNVMT54LC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
