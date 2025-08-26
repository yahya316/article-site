// import Link from 'next/link';
// import {FiBookOpen } from "react-icons/fi";
// export default function Navbar() {
//   return (
//     <nav className="absolute w-full top-0 left-0 z-20 px-6 py-4">
//       <div className="mx-auto flex justify-between items-center">
//         <Link href="/" className="flex items-center gap-4 text-2xl font-black tracking-tight text-white transition-colors duration-300">
//           <FiBookOpen className="text-white" size={28} />
//           My Blog
//         </Link>

//         <div className="hidden md:flex items-center space-x-8">
//           <Link href="/" className="text-white hover:text-gray-300 font-medium transition-colors duration-300">
//             Home
//           </Link>
//           <Link href="/articles" className="text-white hover:text-gray-300 font-medium transition-colors duration-300">
//             Blog
//           </Link>
//           <Link href="/about" className="text-white hover:text-gray-300 font-medium transition-colors duration-300">
//             About
//           </Link>
//           <Link href="/contact" className="text-white hover:text-gray-300 font-medium transition-colors duration-300">
//             Contact
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }


"use client"
import Link from 'next/link';
import { FiBookOpen, FiMenu, FiX } from "react-icons/fi";
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const LinkPages = ["Home", "Articles", "About", "Contact"]
  return (
    <nav className="absolute w-full top-0 left-0 z-20 px-6 py-4 bg-transparent">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight text-white transition-colors duration-300">
          <FiBookOpen className="text-white" size={28} />
          My Blog
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {LinkPages.map((item) => (
            <Link key={item} href={item === "Home" ? "/udashboard" : `/${item.toLowerCase()}`} className="text-white hover:text-gray-300 font-medium transition-colors duration-300">
              {item}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-black/70 backdrop-blur-sm rounded-lg p-4">
          {LinkPages.map((item) => (
            <Link key={item} href={item === "Home" ? "/udashboard" : `/${item.toLowerCase()}`} className="text-white hover:text-gray-300 font-medium text-lg transition-colors duration-300" onClick={() => setIsOpen(false)} >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
