import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyDeI4dzHiBp7QwCv2C1iiGxytoPYOu3CFs",
    authDomain: "facebooklogin2-ecc30.firebaseapp.com",
    projectId: "facebooklogin2-ecc30",
    storageBucket: "facebooklogin2-ecc30.appspot.com",
    messagingSenderId: "631563447185",
    appId: "1:631563447185:web:4489bef80a2f3ce5054830",
    measurementId: "G-YMXBSC5PVL"
  };
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth(app);
  const FbAuthProvider = new FacebookAuthProvider();
  export const FacebookAuth = async () =>{
    const fbAuth = signInWithPopup(auth,FbAuthProvider);
    return fbAuth;
   }