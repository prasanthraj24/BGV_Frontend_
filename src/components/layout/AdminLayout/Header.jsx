
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaThLarge } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { RiSettings4Line } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const notifications = [
  { name: "User signed up", description: "Magic UI", time: "10m ago", icon: "👤", color: "#FFB800" },
  { name: "New message", description: "Magic UI", time: "5m ago", icon: "💬", color: "#FF3D71" },
  { name: "New event", description: "Magic UI", time: "2m ago", icon: "🗞️", color: "#1E86FF" },
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Admin/SignIn");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white text-gray-800 border-b border-gray-200 z-40 ">
      <div className="flex items-center justify-between h-16">
        {/* Left Side: Logo and Title */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img src={logo} alt="company_logo" className="h-10 w-auto" />
          </div>
          <div className="hidden md:block ml-6">
            <span className="text-lg pl-16 text-gray-500">BG Verification Dashboard</span>
          </div>
        </div>

        {/* Right Side: Notification Icons and User Info */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out relative"
            >
              <FaBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* Animated Notifications */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                >
                  <div className="py-2">
                    {notifications.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center p-4 border-b last:border-0"
                      >
                        <div
                          className="flex items-center justify-center h-10 w-10 rounded-full"
                          style={{ backgroundColor: item.color }}
                        >
                          <span className="text-lg">{item.icon}</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                          <p className="text-xs text-gray-400">{item.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Grid Icon */}
          <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
            <FaThLarge className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="relative">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="flex items-center space-x-2">
                {/* <FaUserCircle className="w-8 h-8 text-indigo-600" /> */}
                <img
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        // alt={`${notification.name}'s avatar`}
                        className="w-9 h-9 rounded-full"
                      />
                <div className="hidden md:flex flex-col">
                  <span className="text-sm font-medium text-gray-900">Yamuna</span>
                  <span className="text-xs text-gray-500">Admin</span>
                </div>
              </div>
              <IoIosArrowDown
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => alert("Reset Password Clicked")}
                >
                  <RiSettings4Line className="mr-3 w-5 h-5" />
                  Reset Password
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <BiLogOut className="mr-3 w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
