import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-epGVgaQ-0gdki_uB-Dbm-qkc2pcqNo4",
  authDomain: "uee-job-finder-project.firebaseapp.com",
  projectId: "uee-job-finder-project",
  storageBucket: "uee-job-finder-project.appspot.com",
  messagingSenderId: "122421237502",
  appId: "1:122421237502:web:0da7833527355e4e46b7af",
  measurementId: "G-FG1JW11Z0X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
