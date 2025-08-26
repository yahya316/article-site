"use client";
import { useState, useEffect, useRef } from "react";
import {
    FaBars,
    FaTachometerAlt,
    FaFileAlt,
    FaUsers,
    FaCog,
    FaChartBar,
    FaTimes,
    FaSearch,
    FaBell,
    FaUserCircle,
} from "react-icons/fa";

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [desktopOpen, setDesktopOpen] = useState(true);
    const [searchFocus, setSearchFocus] = useState(false);

    const sidebarRef = useRef(null);

    const [inputValue, setInputValue] = useState('');
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log('Enter was pressed! The input value is:', inputValue);
            alert('You submitted: ' + inputValue);
            setInputValue('');
        }
    };

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target) &&
                window.innerWidth >= 768
            ) {
                if (desktopOpen && !collapsed) setDesktopOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [desktopOpen, collapsed]);

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
            {/* Sidebar */}
            {(desktopOpen || sidebarOpen) && (
                <div
                    ref={sidebarRef}
                    className={`fixed md:static z-40 h-full flex flex-col bg-white shadow-xl
            transform transition-all duration-500 ease-in-out
            ${collapsed ? "w-20" : "w-64"}
            ${sidebarOpen
                            ? "translate-x-0 opacity-100"
                            : "md:translate-x-0 md:opacity-100 -translate-x-full opacity-0"
                        }
          `}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between h-16 px-4 border-b">
                        {!collapsed && (
                            <h1 className="font-bold text-xl text-indigo-600 transition-all duration-300">
                                Admin
                            </h1>
                        )}
                        <button
                            onClick={() =>
                                window.innerWidth < 768
                                    ? setSidebarOpen(false)
                                    : setDesktopOpen(false)
                            }
                            className="p-2 rounded-md hover:bg-gray-100 active:scale-90 transition"
                        >
                            <FaTimes />
                        </button>
                    </div>


                    <nav className="flex-1 p-4 space-y-2">
                        {[
                            { href: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
                            { href: "/dashboard/content", icon: <FaFileAlt />, label: "Content" },
                            { href: "/dashboard/users", icon: <FaUsers />, label: "Users" },
                            { href: "/dashboard/analytics", icon: <FaChartBar />, label: "Analytics" },
                            { href: "/dashboard/settings", icon: <FaCog />, label: "Settings" },
                            { href: "/dashboard/profile", icon: <FaUserCircle />, label: "Profile" },
                        ].map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                className="flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-indigo-50 hover:text-indigo-600 active:scale-95"
                            >
                                {item.icon}
                                {!collapsed && <span>{item.label}</span>}
                            </a>
                        ))}
                    </nav>


                    {/* Collapse Button */}
                    <div className="p-4 border-t">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="w-full py-2 text-sm font-medium rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition"
                        >
                            {collapsed ? "➕ Expand" : "➖ Collapse"}
                        </button>
                    </div>
                </div>
            )}

            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black z-30 md:hidden transition-opacity duration-500 ease-in-out
          ${sidebarOpen ? "opacity-40" : "opacity-0 pointer-events-none"}
        `}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="h-16 flex items-center justify-between px-4 md:px-6">
                        {/* Left */}
                        <div className="flex items-center gap-3 md:gap-4">
                            {/* Mobile menu button */}
                            <button
                                className="md:hidden p-2 rounded-md hover:bg-gray-100 active:scale-90 transition"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <FaBars />
                            </button>

                            {/* Desktop menu reopen button */}
                            {!desktopOpen && (
                                <button
                                    className="hidden md:block p-2 rounded-md hover:bg-gray-100 active:scale-90 transition"
                                    onClick={() => setDesktopOpen(true)}
                                >
                                    <FaBars />
                                </button>
                            )}

                            <h2 className="font-semibold text-base md:text-lg text-gray-700 truncate">
                                Dashboard
                            </h2>
                        </div>

                        {/* Right (desktop) */}
                        <div className="flex items-center gap-2 md:gap-4">
                            {/* Search bar (desktop only) */}
                            <div
                                className={`hidden sm:flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg border transition-all duration-500 ease-in-out
          ${searchFocus
                                        ? "w-56 border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50"
                                        : "w-36 border-gray-300 bg-gray-100"
                                    }`}
                            >
                                <FaSearch className="text-gray-500 text-sm md:text-base" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent outline-none text-xs md:text-sm flex-1"
                                    onFocus={() => setSearchFocus(true)}
                                    onBlur={() => setSearchFocus(false)}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>

                            <button className="relative p-2 rounded-full hover:bg-gray-100 active:scale-90 transition">
                                <FaBell className="text-gray-600" size={18} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            <button className="p-2 rounded-full hover:bg-gray-100 active:scale-90 transition">
                                <FaUserCircle className="text-gray-600" size={26} />
                            </button>
                        </div>
                    </div>

                    {/* Search bar (MOBILE only, under header) */}
                    <div className="px-4 pb-3 sm:hidden">
                        <div
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-500 ease-in-out
        ${searchFocus
                                    ? "border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50"
                                    : "border-gray-300 bg-gray-100"
                                }`}
                        >
                            <FaSearch className="text-gray-500 text-base" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none text-sm flex-1"
                                onFocus={() => setSearchFocus(true)}
                                onBlur={() => setSearchFocus(false)}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                </header>


                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="text-gray-500">Your dashboard content...</div>
                </main>
            </div>
        </div>
    );
}
