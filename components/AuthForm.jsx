// 'use client';

// import { useState } from 'react';
// import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // Import the useRouter hook

// export default function AuthForm({ formType }) {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(''); // State for displaying login errors
//   const router = useRouter(); // Initialize the router

//   const isLogin = formType === 'login';
  
//   // Fake login credentials for demonstration purposes
//   const ADMIN_EMAIL = 'abc@gmail.com';
//   const ADMIN_PASS = '123';

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError(''); // Clear any previous errors

//     if (isLogin) {
//       // Login logic
//       if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
//         // Redirect to the dashboard on successful login
//         router.push('/dashboard');
//       } else {
//         // Set an error message for invalid credentials
//         setError('Invalid email or password.');
//       }
//     } else {
//       // Registration logic
//       console.log('Registering with:', { fullName, email, password });
//       // In a real app, you would send this to a registration API
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
//       <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
//           {isLogin ? 'Log in' : 'Create an account'}
//         </h2>
//         {error && (
//           <div className="mb-4 text-center text-red-500 font-medium">
//             {error}
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {!isLogin && (
//             <div className="relative">
//               <input
//                 id="fullName"
//                 name="fullName"
//                 type="text"
//                 autoComplete="name"
//                 required
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 placeholder="Full Name"
//                 className="w-full px-4 py-2 pl-10 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
//               />
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
//             </div>
//           )}

//           <div className="relative">
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="w-full px-4 py-2 pl-10 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
//             />
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
//           </div>

//           <div className="relative">
//             <input
//               id="password"
//               name="password"
//               type={showPassword ? 'text' : 'password'}
//               autoComplete={isLogin ? 'current-password' : 'new-password'}
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               className="w-full px-4 py-2 pl-10 pr-10 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
//             />
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-sm leading-5"
//               aria-label={showPassword ? 'Hide password' : 'Show password'}
//             >
//               {showPassword ? (
//                 <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200" />
//               ) : (
//                 <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200" />
//               )}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
//           >
//             {isLogin ? 'Log In' : 'Sign Up'}
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
//           {isLogin ? (
//             <>
//               Don't have an account?{' '}
//               <Link href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             <>
//               Already have an account?{' '}
//               <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
//                 Log in
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthForm({ formType }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isLogin = formType === "login";

  const ADMIN_EMAIL = "abc@gmail.com";
  const ADMIN_PASS = "123";

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        router.push("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      console.log("Registering:", { fullName, email, password });
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        {isLogin ? "Login" : "Register"}
      </h2>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        )}

        <div className="relative">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray-400" />
            ) : (
              <Eye className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
