import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Plus,
  FileCheck,
  ChevronLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ collapsed, onCollapse }) {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/SignIn");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      onCollapse(true);
    }
  }, [isMobile, onCollapse]);

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/Overview" },
    { icon: Plus, label: "Add Employee(s)", path: "/AddEmployee" },
    { icon: FileCheck, label: "Verification", path: "/Verification" },

  ];

  return (
    <motion.aside
    initial={false}
    animate={{ width: collapsed ? 80 : 280 }}
    className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out"
  >
    <div className="flex flex-col h-full">
      <div className="flex-1 py-6 px-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ease-in-out ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-colors duration-200 ease-in-out ${
                    location.pathname === item.path
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                />
                {!collapsed && (
                  <span
                    className="ml-3 text-sm font-medium overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </span>
                )}
              </motion.button>
            </Link>
          ))}
        </div>
      </div>
  
      <button
        onClick={() => onCollapse(!collapsed)}
        className="absolute -right-3 top-6 p-1.5 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors duration-200 ease-in-out"
      >
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.div>
      </button>
    </div>
  </motion.aside>
  
  );
}
