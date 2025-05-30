// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhico7sUYg_FveF5TLJttAbRd3q4EchUI",
  authDomain: "chattingapp-e7d7d.firebaseapp.com",
  projectId: "chattingapp-e7d7d",
  storageBucket: "chattingapp-e7d7d.firebasestorage.app",
  messagingSenderId: "368799061105",
  appId: "1:368799061105:web:38f795461bdd1e074837d0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export default auth;
export default firebaseConfig;