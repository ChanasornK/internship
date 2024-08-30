import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error sending reset link");
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Next.js Reset Password</title>
        <meta name="description" content="Reset your password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Reset Your Password</h1>
        <form onSubmit={handleForgotPassword}>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p>{message}</p>}
      </main>

      <footer>
        <Link href="/reset-password">Already have a reset token?</Link>
      </footer>
    </div>
  );
}
