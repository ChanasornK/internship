import { useState } from "react";
import {
  auth,
  FacebookAuth,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  EmailAuthProvider,
} from "./service/firebaseConfig";

export default function Home() {
  const [user, setUser] = useState(null);

  // Function to handle login with Facebook
  const loginWithFacebook = async () => {
    try {
      const result = await FacebookAuth();
      const user = result.user;
      setUser({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Error details:", error);

      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData?.email;
        const pendingCredential = error.credential;

        if (pendingCredential) {
          fetchSignInMethodsForEmail(auth, email)
            .then((methods) => {
              if (
                methods.includes(
                  EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
                )
              ) {
                const password = prompt("Enter your password for this email:");
                const credential = EmailAuthProvider.credential(
                  email,
                  password
                );

                return linkWithCredential(auth.currentUser, credential);
              } else if (methods.includes("google.com")) {
                alert(
                  "Please log in using Google and then link your Facebook account in the settings."
                );
              }
            })
            .then(() => {
              return linkWithCredential(auth.currentUser, pendingCredential);
            })
            .then(() => {
              setUser(auth.currentUser);
            })
            .catch((error) => {
              console.error("Error during account linking:", error);
            });
        } else {
          alert(
            "It seems your Facebook account is already linked with another provider. Please log in with that provider and then link your Facebook account."
          );
        }
      } else {
        console.error("Error during Facebook authentication:", error);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!user ? (
        <>
          <button onClick={loginWithFacebook}>Login with Facebook</button>
        </>
      ) : (
        <>
          <h1>Welcome, {user.name}!</h1>
          <img src={user.photoURL} alt="Profile Picture" width={100} />
          <p>Email: {user.email}</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </>
      )}
    </div>
  );
}
