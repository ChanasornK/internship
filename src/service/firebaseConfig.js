import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail, // เพิ่มการนำเข้าตรงนี้
  linkWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBylDDHpDgZq-D57rfekXxjXqzI957fJKs",
  authDomain: "form-f8d6c.firebaseapp.com",
  projectId: "form-f8d6c",
  storageBucket: "form-f8d6c.appspot.com",
  messagingSenderId: "665618886236",
  appId: "1:665618886236:web:f0d6eb14df7c3524d44099",
  measurementId: "G-YKFHSVSZEL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Set up providers
export const googleProvider = new GoogleAuthProvider();
export const fbProvider = new FacebookAuthProvider();

// Function for Facebook authentication
export const FacebookAuth = async () => {
  try {
    const fbAuth = await signInWithPopup(auth, fbProvider);
    return fbAuth;
  } catch (error) {
    throw error; // Handle errors here if needed
  }
};

// Function for Google authentication
export const GoogleAuth = async () => {
  try {
    const googleAuth = await signInWithPopup(auth, googleProvider);
    return googleAuth;
  } catch (error) {
    throw error; // Handle errors here if needed
  }
};

// Export functions for linking credentials, etc.
export { fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider };
