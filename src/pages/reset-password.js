import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setToken(router.query.token);
    }
  }, [router.isReady, router.query.token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error resetting password");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content="Enter your new password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Enter New Password</h1>
        <form onSubmit={handleResetPassword}>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        {message && <p>{message}</p>}
      </main>
    </div>
  );
}
