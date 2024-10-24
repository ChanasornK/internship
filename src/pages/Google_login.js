import React from "react";
import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { Button } from "flowbite-react";
import { auth, googleProvider } from "./test";
const Google_login = () => {
  const [user, setUser] = useState(null);
  const [str, setStr] = useState("Hello");
  const [textBtn, setTextbtn] = useState("Login Google");
  const [photoURL, setPhotoURL] = useState("");

  const loginAction = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(function (result) {
        if (!result) return;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(result.user);
        setUser(result.user);
        setStr("Is Login ....");
        setTextbtn("Logout");
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        if (errorCode === "auth/account-exists-with-different-credential") {
          alert(
            "You have already signed up with a different auth provider for that email."
          );
        } else {
          console.log(error);
        }
      });
  };
  return (
    <div>
      <Button color="black" onClick={loginAction}>
        {textBtn}
      </Button>
      <p>
        {str}
        {user ? "=>" : ""}
        {user?.email}
      </p>
    </div>
  );
};

export default Google_login;
