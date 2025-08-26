// 'use client';

// import { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';

// export default function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   // Function to toggle the visibility of the password
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real application, you would handle authentication here (e.g., API call to a backend)
//     console.log('Form submitted with:', { email, password });
//     // You could navigate to the dashboard here upon successful login
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
//       <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Admin Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email Input Field */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//             >
//               Email Address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
//             />
//           </div>

//           {/* Password Input Field with Toggle */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 autoComplete="current-password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Login Button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
//             >
//               Log In
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Fake login credentials for demo
  const ADMIN_EMAIL = "abc@gmail.com";
  const ADMIN_PASS = "123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      router.push('/dashboard'); 
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Admin Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
