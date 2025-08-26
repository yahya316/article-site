"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaTachometerAlt,
  FaFileAlt,
  FaUsers,
  FaCog,
  FaChartBar,
  FaTimes, FaBell, FaUserCircle,
} from "react-icons/fa";

export default function AdminDashboard({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {(desktopOpen || sidebarOpen) && (
        <div
          className={`fixed md:static z-40 h-full flex flex-col bg-white shadow-xl transform transition-all duration-500 ease-in-out
            ${collapsed ? "w-20" : "w-64"}
            ${sidebarOpen ? "translate-x-0 opacity-100" : "md:translate-x-0 md:opacity-100 -translate-x-full opacity-0"}`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b">
            {!collapsed && (
              <h1 className="font-bold text-xl text-indigo-600 transition-all duration-300">
                Admin
              </h1>
            )}
            <button onClick={() => window.innerWidth < 768 ? setSidebarOpen(false) : setDesktopOpen(false) } className="p-2 rounded-md hover:bg-gray-100 active:scale-90 transition">
              <FaTimes />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {[
              {
                href: "/dashboard",
                icon: <FaTachometerAlt />,
                label: "Dashboard",
              },
              {
                href: "/dashboard/content",
                icon: <FaFileAlt />,
                label: "Content",
              },
              { href: "/dashboard/users", icon: <FaUsers />, label: "Users" },
              {
                href: "/dashboard/analytics",
                icon: <FaChartBar />,
                label: "Analytics",
              },
              {
                href: "/dashboard/settings",
                icon: <FaCog />,
                label: "Settings",
              },
              {
                href: "/dashboard/profile",
                icon: <FaUserCircle />,
                label: "Profile",
              },
            ].map((item, idx) => (
              <Link key={idx} href={item.href} className="flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-95">
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button onClick={() => setCollapsed(!collapsed)} className="w-full py-2 text-sm font-medium rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition">
              {collapsed ? "Expand" : "Collapse"}
            </button>
          </div>
        </div>
      )}

      <div onClick={() => setSidebarOpen(false)} className={`fixed inset-0 bg-black z-30 md:hidden transition-opacity duration-500 ease-in-out ${sidebarOpen ? "opacity-40" : "opacity-0 pointer-events-none"}`}/>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b relative">
          <div className="h-16 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-3 md:gap-4">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-md hover:bg-gray-100 active:scale-90 transition">
                <FaBars />
              </button>

              {!desktopOpen && (
                <button onClick={() => setDesktopOpen(true)} className="hidden md:block p-2 rounded-md hover:bg-gray-100 active:scale-90 transition">
                  <FaBars />
                </button>
              )}

              <h2 className="font-semibold text-base md:text-lg text-gray-700 truncate">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-2 md:gap-4 relative">
              <div className="hidden sm:flex">
                <SearchBar />
              </div>

              <button className="relative p-2 rounded-full hover:bg-gray-100 active:scale-90 transition">
                <FaBell className="text-gray-600" size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="p-2 rounded-full hover:bg-gray-100 active:scale-90 transition">
                  <FaUserCircle className="text-gray-600" size={26} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 z-50">
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                      onClick={() => setProfileOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                      onClick={() => {
                        setProfileOpen(false);
                        alert("Logging out...");
                        router.push("/");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-4 pb-3 sm:hidden">
            <SearchBar />
          </div>
        </header>

        <main className="flex-1 p-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
