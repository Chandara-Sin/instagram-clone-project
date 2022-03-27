// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC8poOzzV2w_1FADPnswt8QDGczZwZ8G3M',
  authDomain: 'instagram-clone-project-c5327.firebaseapp.com',
  projectId: 'instagram-clone-project-c5327',
  storageBucket: 'instagram-clone-project-c5327.appspot.com',
  messagingSenderId: '374520054487',
  appId: '1:374520054487:web:dca0bf4d28e39716e56692',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
