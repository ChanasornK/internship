// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYLS1B-rR9NgPhk82Ycch66BWEh5UT6cg",
  authDomain: "otp-login-542e3.firebaseapp.com",
  projectId: "otp-login-542e3",
  storageBucket: "otp-login-542e3.appspot.com",
  messagingSenderId: "873129071053",
  appId: "1:873129071053:web:2f727642b9d3747bf8b484",
  measurementId: "G-X1RLGJK22L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
