import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
    apiKey: "AIzaSyD2pnN-S4I6x0B0fN0zG66L63cbZtfvXEQ",
    authDomain: "saas-project-4f1c5.firebaseapp.com",
    projectId: "saas-project-4f1c5",
    storageBucket: "saas-project-4f1c5.appspot.com",
    messagingSenderId: "435913812774",
    appId: "1:435913812774:web:d61f47a2e299d8e9ddefe7",
    measurementId: "G-JD7LYV6NZG"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const functions = getFunctions(app)

export { db, auth, functions }