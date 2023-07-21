import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB0N8Qu64BHUjFyIt_vM2GwhSOXZNzLWC0",
    authDomain: "game-catalogue-4cf57.firebaseapp.com",
    projectId: "game-catalogue-4cf57",
    storageBucket: "game-catalogue-4cf57.appspot.com",
    messagingSenderId: "547366651534",
    appId: "1:547366651534:web:d72d90e4d032d5cb416bdf"
};

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)

