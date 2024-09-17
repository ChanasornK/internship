import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { IoArrowUndoCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { IoMdMail } from "react-icons/io";
export default function Home() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const goLogin = () => {
    router.push("./Login");
  };
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

      // Set timeout to clear the message after 1 minute
      setTimeout(() => {
        setMessage("");
      }, 60000);
    } catch (error) {
      setMessage("Error sending reset link");
      console.error(error);

      // Set timeout to clear the error message after 1 minute
      setTimeout(() => {
        setMessage("");
      }, 60000);
    }
  };

  return (
    <>
      <Head>
        <title>Reset_Password</title>
        <link
          rel="icon"
          href="https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/458802193_443422025395135_5023098190288504627_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHGsvhUqiFI2qfwLotyWmZhEHd1t-B62SgQd3W34HrZKE4xCsI1KQ3Ujgl8xM6tYkfrHIPiZqWI6QkxmepUb6zn&_nc_ohc=QOH9wPGvvU0Q7kNvgG3q1YJ&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=AIjsg8BkR9RPCPVN4o52Vzj&oh=03_Q7cD1QHZnrRI-bLWf-7dxyKZ1kf1jHuINieX_YjZdvCUTAXf3Q&oe=6710882F"
          className="Kuromi "
        />
      </Head>
      <div className="w-full h-screen bg-gradient-to-t from-blue-200 to-pink-200">
        <div className=" pt-10 ml-10">
          <button onClick={goLogin}>
            <IoArrowUndoCircleOutline className="text-4xl" />
          </button>
        </div>
        <Head>
          <title>Reset Password</title>
          <meta name="description" content="Reset your password" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="flex justify-center pt-20 font-semibold text-3xl">
            Reset Password
          </h1>
          <form
            onSubmit={handleForgotPassword}
            className="flex flex-col items-center mt-10"
          >
            <div className="flex flex-col w-80">
              <label htmlFor="email" className="mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-black bg-[#f4f6f8] focus:ring-purple-600 focus:border-purple-600 hover:border-purple-600 text-center focus:ring-1 focus:outline-none  font-medium rounded-lg text-base px-5 py-2.5 inline-flex items-center justify-center  mb-2 w-full h-12"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-7 flex items-center justify-center hover:bg-blue-600 hover:shadow-lg"
            >
              <IoMdMail className="text-white mr-2 text-lg" />
              Send Link To Gmail
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-green-500">{message}</p>
          )}
        </main>
      </div>
    </>
  );
}
