// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'; 
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuxr4qXwXBRTejMdgYjYJzSI2qdhfsypg",
  authDomain: "netflixclone-817d0.firebaseapp.com",
  projectId: "netflixclone-817d0",
  storageBucket: "netflixclone-817d0.appspot.com",
  messagingSenderId: "758482054626",
  appId: "1:758482054626:web:313324c25595e267bb1dbb",
  measurementId: "G-VLPN4SLCRZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const storage = firebase.storage();

export default storage