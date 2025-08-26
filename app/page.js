"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
} from "react-icons/ai";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          user: { email: loginEmail, password: loginPassword },
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.user.role === "Admin") {
          router.push("/dashboard");
        } else if (data.user.role === "User") {
          router.push("/udashboard");
        } else {
          setMessage("Unknown role, cannot route.");
          setMessageType("error");
        }
      } else {
        setMessage(data.message);
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Server error. Please try again.");
      setMessageType("error");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (
      !registerName ||
      !registerEmail ||
      !registerPassword ||
      !registerConfirmPassword
    ) {
      setMessage("Please fill in all fields for registration.");
      setMessageType("error");
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          user: {
            name: registerName,
            email: registerEmail,
            password: registerPassword,
          },
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Registration successful! You can now log in.");
        setMessageType("success");

        setTimeout(() => {
          setIsLogin(true);
          setMessage("");
          setRegisterName("");
          setRegisterEmail("");
          setRegisterPassword("");
          setRegisterConfirmPassword("");
        }, 1500);
      } else {
        setMessage(data.message);
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Server error. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="flex pt-16 flex-col min-h-screen bg-gray-100 font-inter">

      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-50 shadow-lg px-4 sm:px-6 py-3 flex justify-between items-center ">
        <h1 className="text-lg sm:text-xl font-bold text-blue-700">My Blog</h1>
        <div className="flex gap-2 sm:gap-4">
          <button onClick={() => setIsLogin(true)} className={`px-3 py-1 rounded-md transition-all shadow-sm hover:shadow-md ${isLogin ? "bg-blue-600 text-white font-semibold" : "text-blue-600 hover:bg-blue-100"}`}>
            Login
          </button>
          <button onClick={() => setIsLogin(false)} className={`px-3 py-1 rounded-md transition-all shadow-sm hover:shadow-md ${!isLogin ? "bg-blue-600 text-white font-semibold" : "text-blue-600 hover:bg-blue-100"}`}>
            Sign Up
          </button>
        </div>
      </nav>


      <main className="flex-grow flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl h-auto md:h-[550px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-blue-600 text-white flex items-center justify-center p-4 sm:p-8 text-center">
            <div className="flex flex-col items-center max-w-sm">
              {isLogin ? (
                <>
                  <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-4">
                    New here?
                  </h2>
                  <p className="mb-6 sm:mb-8 text-base sm:text-lg opacity-90">
                    Create an account and start your journey today.
                  </p>
                  <button
                    onClick={() => setIsLogin(false)}
                    className="bg-blue-500 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 active:scale-95"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-4">
                    Welcome Back!
                  </h2>
                  <p className="mb-6 sm:mb-8 text-base sm:text-lg opacity-90">
                    Already have an account? Sign In to continue.
                  </p>
                  <button
                    onClick={() => setIsLogin(true)}
                    className="bg-blue-500 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 active:scale-95"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-y-auto">
            <div className="w-full max-w-md px-4 sm:px-6 py-6 sm:py-8 rounded-lg">
              <h2 className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center text-gray-800 dark:text-white">
                {isLogin ? "Login" : "Sign Up"}
              </h2>

              {message && (
                <div className={`mb-4 p-3 rounded-lg text-center shadow-md ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {message}
                </div>
              )}

              {isLogin ? (
                <form className="space-y-6" onSubmit={handleLoginSubmit}>
                  <div className="relative">
                    <AiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      placeholder="Email"
                      value={loginEmail}
                      required
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 shadow-sm hover:shadow-md focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <AiOutlineLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPasswordLogin ? "text" : "password"}
                      placeholder="Password"
                      value={loginPassword}
                      required
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 pr-12 shadow-sm hover:shadow-md focus:outline-none"
                    />
                    <button type="button" onClick={() => setShowPasswordLogin(!showPasswordLogin)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {showPasswordLogin ? (<AiOutlineEyeInvisible size={20} /> ) : (<AiOutlineEye size={20} />)}
                    </button>
                  </div>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-blue-600 hover:underline text-right block mt-2">
                    Forgot your password?
                  </a>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
                    Sign In
                  </button>
                </form>
              ) : (
                <form className="space-y-6" onSubmit={handleRegisterSubmit}>
                  <div className="relative">
                    <AiOutlineUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Name"
                      value={registerName}
                      required
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 shadow-sm hover:shadow-md focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <AiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      placeholder="Email"
                      value={registerEmail}
                      required
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 shadow-sm hover:shadow-md focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <AiOutlineLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPasswordRegister ? "text" : "password"}
                      placeholder="Password"
                      value={registerPassword}
                      required
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 pr-12 shadow-sm hover:shadow-md focus:outline-none"
                    />
                    <button type="button" onClick={() => setShowPasswordRegister(!showPasswordRegister)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {showPasswordRegister ? (<AiOutlineEyeInvisible size={20} />) : (<AiOutlineEye size={20} />)}
                    </button>
                  </div>
                  <div className="relative">
                    <AiOutlineLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={registerConfirmPassword}
                      required
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 pr-12 shadow-sm hover:shadow-md focus:outline-none"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {showConfirmPassword ? (<AiOutlineEyeInvisible size={20} />) : (<AiOutlineEye size={20} />)}
                    </button>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
                    Sign Up
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-blue-50 shadow-inner text-blue-700 text-center py-3 sm:py-4 text-sm sm:text-base">
        <p className="font-medium">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </p>
      </footer>
    </div>
  );
}