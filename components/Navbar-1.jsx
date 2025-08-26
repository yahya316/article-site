import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4">
      <div className="mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-4 text-2xl font-black tracking-tight text-gray-900 transition-colors duration-300"
        >
          <FiBookOpen className="text-gray-900" size={28} />
          My Blog
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/udashboard"
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/articles"
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
