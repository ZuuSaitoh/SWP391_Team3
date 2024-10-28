// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyACdd9ZiBdoLdVQOCqibFaP_ZMhXz2u8Rk",
    authDomain: "koi-pond-building.firebaseapp.com",
    projectId: "koi-pond-building",
    storageBucket: "koi-pond-building.appspot.com",
    messagingSenderId: "338855789898",
    appId: "1:338855789898:web:972e5dc015ad1520ea2db3",
    measurementId: "G-VSWLPJ4ZC7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { storage, googleProvider };