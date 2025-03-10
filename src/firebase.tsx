import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB-HF9AtsGeQe0J6U-mj82m1bT_uWrJIfs",
  authDomain: "fir-e-commerce-app-29b1f.firebaseapp.com",
  projectId: "fir-e-commerce-app-29b1f",
  storageBucket: "fir-e-commerce-app-29b1f.firebasestorage.app",
  messagingSenderId: "1098295437799",
  appId: "1:1098295437799:web:ad4f83ed2c66fd7efe3542",
  measurementId: "G-7083S097BF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth: Auth = getAuth(app);

export { db };
export { auth }; 