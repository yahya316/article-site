// import Link from "next/link";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-12 pb-6">
//       <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-0 px-6 xl:px-0">

//         <div className="flex flex-col items-start lg:w-1/4">
//           <h2 className="text-3xl font-bold mb-2">Motivation Blog</h2>
//           <p className="text-gray-400 max-w-sm">
//             Inspiring you every day with quotes, wisdom, and motivation to stay positive.
//           </p>
//         </div>

//         <div className="flex flex-grow justify-center gap-16 lg:gap-54">
//           <div className="flex flex-col gap-3">
//             <Link href="/about" className="hover:text-indigo-400 transition-colors font-medium">
//               About
//             </Link>
//             <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors font-medium">
//               Privacy Policy
//             </Link>
//             <Link href="/terms" className="hover:text-indigo-400 transition-colors font-medium">
//               Terms & Conditions
//             </Link>
//           </div>

//           <div className="flex flex-col gap-3">
//             <Link href="/contact" className="hover:text-indigo-400 transition-colors font-medium">
//               Contact
//             </Link>
//             <Link href="/articles" className="hover:text-indigo-400 transition-colors font-medium">
//               Blog
//             </Link>
//             <Link href="/careers" className="hover:text-indigo-400 transition-colors font-medium">
//               Careers
//             </Link>
//           </div>
//         </div>

//         <div className="flex gap-5 mt-4 lg:mt-0 lg:w-1/4 lg:justify-end">
//           <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//             <FaFacebookF className="text-white hover:text-indigo-400 transition-colors text-lg lg:text-xl" />
//           </Link>
//           <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//             <FaTwitter className="text-white hover:text-indigo-400 transition-colors text-lg lg:text-xl" />
//           </Link>
//           <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//             <FaInstagram className="text-white hover:text-indigo-400 transition-colors text-lg lg:text-xl" />
//           </Link>
//           <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//             <FaLinkedinIn className="text-white hover:text-indigo-400 transition-colors text-lg lg:text-xl" />
//           </Link>
//         </div>
//       </div>

//       <div className="border-t border-gray-700 mt-10"></div>

//       <div className="mt-6 text-center text-gray-500 text-sm px-6 xl:px-0">
//         &copy; {new Date().getFullYear()} Motivation Blog. All rights reserved.
//       </div>
//     </footer>
//   );
// }



import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    const socialLinks = [
        { icon: FaFacebookF, href: 'https://facebook.com' },
        { icon: FaTwitter, href: 'https://twitter.com' },
        { icon: FaInstagram, href: 'https://instagram.com' },
        { icon: FaLinkedinIn, href: 'https://linkedin.com' },
    ];
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-8 sm:pt-12 pb-2">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 px-4 sm:px-6 lg:px-8">

                {/* Branding */}
                <div className="flex flex-col items-start md:w-1/4">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Motivation Blog</h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-sm">
                        Inspiring you every day with quotes, wisdom, and motivation to stay positive.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-row flex-grow justify-center gap-20 md:gap-50">
                    <div className="flex flex-col gap-2 sm:gap-3 text-sm sm:text-base">
                        <Link href="/about" className="hover:text-indigo-400 transition-colors font-medium">
                            About
                        </Link>
                        <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors font-medium">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-indigo-400 transition-colors font-medium">
                            Terms & Conditions
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 sm:gap-3 text-sm sm:text-base">
                        <Link href="/udashboard" className="hover:text-indigo-400 transition-colors font-medium">
                            Home
                        </Link>
                        <Link href="/articles" className="hover:text-indigo-400 transition-colors font-medium">
                            Articles
                        </Link>
                        <Link href="/contact" className="hover:text-indigo-400 transition-colors font-medium">
                            Contact
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-4 mt-4 md:mt-0 md:w-1/4 md:justify-end">
                    <div className="flex gap-4">
                        {socialLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-indigo-400 transition-colors text-base sm:text-lg"
                            >
                                <link.icon />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8"></div>

            <div className="mt-2 text-center text-gray-500 text-xs sm:text-sm px-4 sm:px-0">
                &copy; {new Date().getFullYear()} Motivation Blog. All rights reserved.
            </div>
        </footer>
    );
}
