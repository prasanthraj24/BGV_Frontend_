import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "../../../assets/Sign_Logo.png";
import resetHalfScreen from "../../../assets/Reset_password.jpg";
import backgroundImage from "../../../assets/background.png";
import config from "../../../config.js";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${config.API_LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.code === 200 && data.message === "success") {
        localStorage.setItem("token", data.data.token);
        navigate("Employee/EmployeeSignIn");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col lg:flex-row">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-blue-600 to-blue-800 lg:w-1/2 flex flex-col p-6 lg:p-12"
      >
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2, ...fadeInUp.transition }}
          className="mb-8"
        >
          <img src={logo} alt="SIERRA Logo" className="h-12" />
        </motion.div>
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4, ...fadeInUp.transition }}
          className="text-white mb-8 flex-grow hidden lg:block"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Welcome to Employee Background Verification Portal!
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl opacity-90 mb-6">
            Reset Password - Upload Documents - Get Verified
          </p>
        </motion.div>
        {/* Dashboard Preview Image */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.6, ...fadeInUp.transition }}
          className="bg-white rounded-lg shadow-2xl p-3 w-full max-w-2xl mx-auto hidden lg:block mt-8 "
        >
          <img
            src={resetHalfScreen}
            alt="Dashboard Preview"
            className="w-full h-auto rounded-lg "
          />
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center p-6 bg-gray-100 flex-grow"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4, ...fadeInUp.transition }}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
        >
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6, ...fadeInUp.transition }}
            className="flex flex-col sm:flex-row justify-between items-center mb-8"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
              Update Password
            </h2>
            <Link

              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Password Constraints
            </Link>
          </motion.div>

          <form onSubmit={handleSignIn} className="space-y-4">
            {error && (
              <motion.div
                {...fadeInUp}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </motion.div>
            )}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.7, ...fadeInUp.transition }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.8, ...fadeInUp.transition }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.8, ...fadeInUp.transition }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Re-type New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.9, ...fadeInUp.transition }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
            </motion.div>

            <motion.button
              {...fadeInUp}
              transition={{ delay: 1, ...fadeInUp.transition }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
