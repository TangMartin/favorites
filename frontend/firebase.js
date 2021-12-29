// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXmuTHd-bjbYOqm7IwU-aQpu6xsPtFuAk",
  authDomain: "restaurer-auth.firebaseapp.com",
  projectId: "restaurer-auth",
  storageBucket: "restaurer-auth.appspot.com",
  messagingSenderId: "164913148308",
  appId: "1:164913148308:web:34a5e5d38ab51001d65f81"
};

// Initialize Firebase
firebase.initializeApp(firebaseconfig);

export default firebase;