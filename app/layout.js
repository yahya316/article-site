import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Motivation Blog",
  description: "Your daily dose of motivation and inspiration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}
