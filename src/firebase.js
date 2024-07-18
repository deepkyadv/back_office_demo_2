// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyDJPtzace0T_CEYEp3WKuaYfJkUQivRDjA",
//   authDomain: "mytodos-cd17f.firebaseapp.com",
//   projectId: "mytodos-cd17f",
//   storageBucket: "mytodos-cd17f.appspot.com",
//   messagingSenderId: "70123116169",
//   appId: "1:70123116169:web:860d4a550eab0b7f3c5858"
// };

// export const app = initializeApp(firebaseConfig);
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDJPtzace0T_CEYEp3WKuaYfJkUQivRDjA",
    authDomain: "mytodos-cd17f.firebaseapp.com",
    projectId: "mytodos-cd17f",
    storageBucket: "mytodos-cd17f.appspot.com",
    messagingSenderId: "70123116169",
    appId: "1:70123116169:web:860d4a550eab0b7f3c5858"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
