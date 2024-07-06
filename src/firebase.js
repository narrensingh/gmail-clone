// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDqKoQs6Jcsw3E0O47Tr1Lw4ZeCKlyKHY0',
  authDomain: 'clone-be1d1.firebaseapp.com',
  projectId: 'clone-be1d1',
  storageBucket: 'clone-be1d1.appspot.com',
  messagingSenderId: '240710111576',
  appId: '1:240710111576:web:d8a9ac8d8ea80991b9d52d',
  measurementId: 'G-2WJM291HPT',
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, provider, auth };
