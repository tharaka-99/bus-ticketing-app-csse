import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADZV8n3tsUmJ5fihy20cwuhGspIwgmYtI",
  authDomain: "csse-bus-ticketing-a0cb8.firebaseapp.com",
  projectId: "csse-bus-ticketing-a0cb8",
  storageBucket: "csse-bus-ticketing-a0cb8.appspot.com",
  messagingSenderId: "1041577967116",
  appId: "1:1041577967116:web:79cda2ccd748b1f5907829",
  measurementId: "G-RVH7P609KP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
