// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBr3pyZfOiJEScaiHG6TJhxTz4tjSr2yao",
  authDomain: "booz-auth.firebaseapp.com",
  projectId: "booz-auth",
  storageBucket: "booz-auth.appspot.com",
  messagingSenderId: "532824881771",
  appId: "1:532824881771:web:745d12d9a173907b120f2e",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
