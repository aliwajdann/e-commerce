
// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth'; // optional if using auth

const firebaseConfig = {
  apiKey: "AIzaSyBAlZUkSEcSJ1dMDU6XNzqiqriVRR1hj-0",
  authDomain: "ecommerce-site-436e6.firebaseapp.com",
  projectId: "ecommerce-site-436e6",
  storageBucket: "ecommerce-site-436e6.firebasestorage.app",
  messagingSenderId: "319950691099",
  appId: "1:319950691099:web:a628c032841b8fe04cd1be"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
// const auth = getAuth(app); // optional

export { db };
