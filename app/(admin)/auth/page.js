// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   AiOutlineEye,
//   AiOutlineEyeInvisible,
//   AiOutlineMail,
//   AiOutlineLock,
//   AiOutlineUser,
// } from "react-icons/ai";

// export default function App() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPasswordLogin, setShowPasswordLogin] = useState(false);
//   const [showPasswordRegister, setShowPasswordRegister] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const [registerName, setRegisterName] = useState("");
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");
//   const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");

//   const router = useRouter();

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     setMessage("");
//     setMessageType("");

//     const ADMIN_EMAIL = "abc@gmail.com";
//     const ADMIN_PASSWORD = "123";

//     if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
//       router.push("/dashboard");
//     } else {
//       setMessage("Invalid email or password.");
//       setMessageType("error");
//     }
//   };

//   const handleRegisterSubmit = (e) => {
//     e.preventDefault();
//     setMessage("");
//     setMessageType("");

//     if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
//       setMessage("Please fill in all fields for registration.");
//       setMessageType("error");
//       return;
//     }

//     if (registerPassword !== registerConfirmPassword) {
//       setMessage("Passwords do not match.");
//       setMessageType("error");
//       return;
//     }

//     setMessage("Registration successful! You can now log in.");
//     setMessageType("success");

//     setTimeout(() => {
//       setIsLogin(true);
//       setMessage("");
//       setRegisterName("");
//       setRegisterEmail("");
//       setRegisterPassword("");
//       setRegisterConfirmPassword("");
//     }, 1500);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 font-inter">
//       <nav className="bg-blue-50 shadow-lg px-6 py-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-blue-700 hover:scale-105 transition-transform cursor-pointer">
//           My Blog
//         </h1>
//         <div className="flex gap-4">
//           <button onClick={() => setIsLogin(true)}
//             className={`px-3 py-1 rounded-md transition-all shadow-sm hover:shadow-md ${isLogin ? "bg-blue-600 text-white font-semibold" : "text-blue-600 hover:bg-blue-100"}`}>
//             Login
//           </button>
//           <button onClick={() => setIsLogin(false)}
//             className={`px-3 py-1 rounded-md transition-all shadow-sm hover:shadow-md ${!isLogin ? "bg-blue-600 text-white font-semibold" : "text-blue-600 hover:bg-blue-100"}`}>
//             Sign Up
//           </button>
//         </div>
//       </nav>

//       <main className="flex-grow flex items-center justify-center p-4">
//         <div className="relative w-full max-w-5xl h-[550px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex transform transition-all duration-700 ease-in-out">
//           <div
//             className={`absolute top-0 h-full w-1/2 bg-blue-600 text-white flex items-center justify-center p-8 text-center transition-all duration-700 ease-in-out z-20 ${isLogin ? "left-0 rounded-r-none" : "left-1/2 rounded-l-none"} md:rounded-r-2xl md:rounded-l-2xl`}>
//             <div className="flex flex-col items-center max-w-sm px-4">
//               {isLogin ? (
//                 <>
//                   <h2 className="text-4xl font-extrabold mb-4">New here?</h2>
//                   <p className="mb-8 text-lg opacity-90">
//                     Create an account and start your journey with us today.
//                   </p>
//                   <button onClick={() => setIsLogin(false)}
//                     className="bg-blue-500 text-white px-10 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 active:scale-95">
//                     Sign Up
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <h2 className="text-4xl font-extrabold mb-4">Welcome Back!</h2>
//                   <p className="mb-8 text-lg opacity-90">
//                     Already have an account? Sign In to continue.
//                   </p>
//                   <button onClick={() => setIsLogin(true)}
//                     className="bg-blue-500 text-white px-10 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 active:scale-95">
//                     Sign In
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           <div className={`absolute top-0 h-full w-1/2 flex items-center justify-center p-8 transition-all duration-700 ease-in-out z-10 ${isLogin ? "right-0 opacity-100" : "-right-full opacity-0 pointer-events-none"} bg-white dark:bg-gray-800 rounded-l-2xl`}>
//             <div className="w-full max-w-md px-6 py-8 rounded-lg">
//               <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
//                 Login
//               </h2>
//               {message && (
//                 <div className={`mb-4 p-3 rounded-lg text-center shadow-md ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                   {message}
//                 </div>
//               )}
//               <form className="space-y-6" onSubmit={handleLoginSubmit}>
//                 <div className="relative">
//                   <AiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input type="email" placeholder="Email" value={loginEmail} required
//                     onChange={(e) => setLoginEmail(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 shadow-sm hover:shadow-md focus:outline-none" />
//                 </div>
//                 <div className="relative">
//                   <AiOutlineLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input type={showPasswordLogin ? "text" : "password"} placeholder="Password" value={loginPassword} required
//                     onChange={(e) => setLoginPassword(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 pr-12 shadow-sm hover:shadow-md focus:outline-none" />
//                   <button type="button" onClick={() => setShowPasswordLogin(!showPasswordLogin)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
//                     {showPasswordLogin ? (<AiOutlineEyeInvisible size={20} />) : (<AiOutlineEye size={20} />)}
//                   </button>
//                 </div>
//                 <a href="/auth" onClick={(e) => e.preventDefault()} className="text-sm text-blue-600 hover:underline text-right block mt-2">
//                   Forgot your password?
//                 </a>
//                 <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
//                   Sign In
//                 </button>
//               </form>
//             </div>
//           </div>

//           <div className={`absolute top-0 h-full w-1/2 flex items-center justify-center p-8 transition-all duration-700 ease-in-out z-10 ${isLogin ? "left-full opacity-0 pointer-events-none" : "left-0 opacity-100"}bg-white dark:bg-gray-800 rounded-r-2xl`}>
//             <div className="w-full max-w-md px-6 py-8 rounded-lg">
//               <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
//                 Sign Up
//               </h2>
//               {message && (
//                 <div className={`mb-4 p-3 rounded-lg text-center shadow-md ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//                   {message}
//                 </div>
//               )}
//               <form className="space-y-6" onSubmit={handleRegisterSubmit}>
//                 <div className="relative">
//                   <AiOutlineUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input type="text" placeholder="Name" value={registerName} required
//                     onChange={(e) => setRegisterName(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 shadow-sm hover:shadow-md focus:outline-none"/>
//                 </div>
//                 <div className="relative">
//                   <AiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input type="email" placeholder="Email" value={registerEmail} required
//                     onChange={(e) => setRegisterEmail(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 shadow-sm hover:shadow-md focus:outline-none"/>
//                 </div>
//                 <div className="relative">
//                   <AiOutlineLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input type={showPasswordRegister ? "text" : "password"} placeholder="Password" value={registerPassword} required
//                     onChange={(e) => setRegisterPassword(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 pr-12 shadow-sm hover:shadow-md focus:outline-none"/>
//                   <button type="button" onClick={() => setShowPasswordRegister(!showPasswordRegister)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
//                     {showPasswordRegister ? (<AiOutlineEyeInvisible size={20} />) : (<AiOutlineEye size={20} />)}
//                   </button>
//                 </div>

//                 <div className="relative">
//                   <AiOutlineLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={registerConfirmPassword} required
//                     onChange={(e) => setRegisterConfirmPassword(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 pr-12 shadow-sm hover:shadow-md focus:outline-none"/>
//                   <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
//                     {showConfirmPassword ? (<AiOutlineEyeInvisible size={20} />) : (<AiOutlineEye size={20} />)}
//                   </button>
//                 </div>

//                 <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
//                   Sign Up
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer className="bg-blue-50 shadow-inner text-blue-700 text-center py-4">
//         <p className="font-medium">
//           © {new Date().getFullYear()} My Blog. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }



























"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { BiNotification } from "react-icons/bi";

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
  const [registerRole, setRegisterRole] = useState("User");
  const [registerStatus, setRegisterStatus] = useState("Active");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerLocation, setRegisterLocation] = useState("");
  const [registerBio, setRegisterBio] = useState("");
  const [registerNotifications, setRegisterNotifications] = useState(false);

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
        body: JSON.stringify({ action: "login", user: { email: loginEmail, password: loginPassword } }),
      });

      const data = await res.json();

      if (data.success) {
        // Route based on role
        if (data.user.role === "Admin") {
          router.push("/dashboard");
        } else if (data.user.role === "User") {
          router.push("/");
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

    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword || !registerPhone || !registerLocation || !registerBio) {
      setMessage("Please fill in all required fields for registration.");
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
            role: registerRole,
            status: registerStatus,
            phone: registerPhone,
            location: registerLocation,
            bio: registerBio,
            notifications: registerNotifications,
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
          setRegisterRole("User");
          setRegisterStatus("Active");
          setRegisterPhone("");
          setRegisterLocation("");
          setRegisterBio("");
          setRegisterNotifications(false);
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
    <div className="flex flex-col min-h-screen bg-gray-100 font-inter">
      <nav className="bg-blue-50 shadow-lg px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700 hover:scale-105 transition-transform cursor-pointer">
          My Blog
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-3 py-1 rounded-md transition-all shadow-sm hover:shadow-md ${
              isLogin ? "bg-blue-600 text-white font-semibold" : "text-blue-600 hover:bg-blue-100"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-3 py-1 rounded-md transition-all shadow-sm hover:shadow-md ${
              !isLogin ? "bg-blue-600 text-white font-semibold" : "text-blue-600 hover:bg-blue-100"
            }`}
          >
            Sign Up
          </button>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl h-[650px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex transform transition-all duration-700 ease-in-out">
          <div
            className={`absolute top-0 h-full w-1/2 bg-blue-600 text-white flex items-center justify-center p-8 text-center transition-all duration-700 ease-in-out z-20 ${
              isLogin ? "left-0 rounded-r-none" : "left-1/2 rounded-l-none"
            } md:rounded-r-2xl md:rounded-l-2xl`}
          >
            <div className="flex flex-col items-center max-w-sm px-4">
              {isLogin ? (
                <>
                  <h2 className="text-4xl font-extrabold mb-4">New here?</h2>
                  <p className="mb-8 text-lg opacity-90">
                    Create an account and start your journey with us today.
                  </p>
                  <button
                    onClick={() => setIsLogin(false)}
                    className="bg-blue-500 text-white px-10 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 active:scale-95"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-extrabold mb-4">Welcome Back!</h2>
                  <p className="mb-8 text-lg opacity-90">
                    Already have an account? Sign In to continue.
                  </p>
                  <button
                    onClick={() => setIsLogin(true)}
                    className="bg-blue-500 text-white px-10 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 active:scale-95"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>

          <div
            className={`absolute top-0 h-full w-1/2 flex items-center justify-center p-8 transition-all duration-700 ease-in-out z-10 ${
              isLogin ? "right-0 opacity-100" : "-right-full opacity-0 pointer-events-none"
            } bg-white dark:bg-gray-800 rounded-l-2xl`}
          >
            <div className="w-full max-w-md px-6 py-8 rounded-lg">
              <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
                Login
              </h2>
              {message && (
                <div
                  className={`mb-4 p-3 rounded-lg text-center shadow-md ${
                    messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}
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
                  <button
                    type="button"
                    onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPasswordLogin ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                  </button>
                </div>
                <a
                  href="/auth"
                  onClick={(e) => e.preventDefault()}
                  className="text-sm text-blue-600 hover:underline text-right block mt-2"
                >
                  Forgot your password?
                </a>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>

          <div
            className={`absolute top-0 h-full w-1/2 flex items-center justify-center p-8 transition-all duration-700 ease-in-out z-10 ${
              isLogin ? "left-full opacity-0 pointer-events-none" : "left-0 opacity-100"
            } bg-white dark:bg-gray-800 rounded-r-2xl`}
          >
            <div className="w-full max-w-md px-6 py-8 rounded-lg">
              <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
                Sign Up
              </h2>
              {message && (
                <div
                  className={`mb-4 p-3 rounded-lg text-center shadow-md ${
                    messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}
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
                  <button
                    type="button"
                    onClick={() => setShowPasswordRegister(!showPasswordRegister)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPasswordRegister ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
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
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                  </button>
                </div>
                <div className="relative">
                  <AiOutlinePhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={registerPhone}
                    required
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 shadow-sm hover:shadow-md focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <AiOutlineEnvironment className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Location"
                    value={registerLocation}
                    required
                    onChange={(e) => setRegisterLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 shadow-sm hover:shadow-md focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <AiOutlineInfoCircle className="absolute left-4 top-4 text-gray-400" size={20} />
                  <textarea
                    placeholder="Bio"
                    value={registerBio}
                    required
                    onChange={(e) => setRegisterBio(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-5 pl-12 py-3 shadow-sm hover:shadow-md focus:outline-none min-h-[100px]"
                  />
                </div>
                <div className="relative">
                  <label className="flex items-center space-x-2">
                    <BiNotification className="text-gray-400" size={20} />
                    <span className="text-gray-700">Enable Notifications</span>
                    <input
                      type="checkbox"
                      checked={registerNotifications}
                      onChange={(e) => setRegisterNotifications(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-blue-50 shadow-inner text-blue-700 text-center py-4">
        <p className="font-medium">
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </p>
      </footer>
    </div>
  );
}