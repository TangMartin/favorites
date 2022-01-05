import Firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAzxDcXvqfR8x18muoc5rLscrEYuPQZDJs",
    authDomain: "favorites-auth.firebaseapp.com",
    projectId: "favorites-auth",
    storageBucket: "favorites-auth.appspot.com",
    messagingSenderId: "508927879376",
    appId: "1:508927879376:web:efcc773cd74060fa9456d5"
  };

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();