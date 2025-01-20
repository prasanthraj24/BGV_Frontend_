import React, { useState, useEffect } from "react";
import { Download, Plus, Search, ChevronDown, FileText, FileClock, FileX2, FileWarning, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { PiUsersThreeLight } from "react-icons/pi";

export default function Overview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [yearsDropdown, setYearsDropdown] = useState(false);
  const [years, setYears] = useState([]);
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsList = [
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
      currentYear.toString(),
    ];
    const uniqueYears = [...new Set(yearsList)].sort((a, b) => b - a);
    setYears(uniqueYears);
  }, []);

  const toggleDropdown = () => {
    setYearsDropdown((prev) => !prev);
  };

  const selectYear = (year) => {
    setSelectedYear(year);
    toggleDropdown();
  };

  const handleAddEmployee = () => {
    navigate("/AddEmployee");
  };

  const stats = [
    {
      title: "New Joinee Employees",
      count: 28,
      icon: PiUsersThreeLight,
      color: "bg-blue-500",
      hasDropdown: true,
    },
    {
      title: "BGV Initiated",
      count: 16,
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      title: "BGV InProgress",
      count: 16,
      icon: FileClock,
      color: "bg-orange-500",
    },
    {
      title: "BGV Rejected",
      count: 4,
      icon: FileX2,
      color: "bg-gray-500",
    },
    {
      title: "Error Marked",  
      count: 2,
      icon: FileWarning,
      color: "bg-red-500",
    },
  ];

  const tabs = [
    { label: "All", count: 28, countColor: "bg-blue-500 text-blue-600" },
    {
      label: "Initiated",
      count: 16,
      countColor: "bg-purple-500 text-purple-600",
    },
    {
      label: "InProgress",
      count: 10,
      countColor: "bg-orange-500 text-orange-600",
    },
    { label: "Verified", count: 20, countColor: "bg-green-500 text-green-600" },
    { label: "Rejected", count: 4, countColor: "bg-gray-500 text-gray-600" },
    { label: "Error", count: 2, countColor: "bg-red-500 text-red-600" },
  ];

  const notifications = [
    {
      name: "Esther Howard",
      id: "567890",
      time: "few seconds ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Robert David",
      id: "567889",
      time: "30 mins ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const employees = [
    {
      id: "456123",
      name: "Jordan Avery",
      email: "jordanavery@gmail.com",
      phone: "+91 7653219900",
      dob: "March-10-1993",
      designation: "Lead Software Engineer",
      status: "Verified",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "456124",
      name: "Emily Chen",
      email: "emilychen@gmail.com",
      phone: "+91 7653219901",
      dob: "April-15-1995",
      designation: "UX Designer",
      status: "InProgress",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    // Add more employee objects here to test pagination
  ];

  // Get current employees
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50 p-1">
      <Header />
      <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      <main
        className={`pt-0 transition-all duration-300 ${
          sidebarCollapsed ? "ml-10" : "lg:ml-64"
        } ${sidebarCollapsed ? "lg:ml-14" : ""} md:ml-0`}
      >
        {/* Notifications */}
        <div className="flex justify-between items-center ">
          <h2 className="text-lg mb-2 font-regular">
            Notification-2
          </h2>
          <button className="text-blue-500 hover:text-blue-600 transition-colors">
            Hide
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <h2 className="text-gray-700 ml-6 mt-5">
            Hi Yamuna, You have few notifications
          </h2>

          <div className="divide-y divide-gray-100">
            {notifications.map((notification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={notification.avatar}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">
                          {notification.id}-{notification.name}
                        </span>{" "}
                        has submitted the BGV documents for verification
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2  text-blue-600 border border-blue-400 font-medium  rounded-md text-sm hover:bg-blue-100 transition-colors"
                  >
                    Start Verification
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-12 h-12 ${
                    stat.iconBg || stat.color
                  } rounded-lg flex items-center justify-center`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${
                      stat.iconBg
                        ? stat.color.replace("bg-", "text-")
                        : "text-white"
                    }`}
                  />
                </div>
                {stat.hasDropdown && (
                  <div className="relative">
                    <button
                      className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                      onClick={toggleDropdown}
                    >
                      {selectedYear}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    {yearsDropdown && (
                      <div className="absolute right-0 mt-2 py-2 w-24 bg-white rounded-md shadow-xl z-20">
                        {years.map((year) => (
                          <button
                            key={year}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => selectYear(year)}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{stat.count}</div>
                <div className="text-sm text-gray-500">{stat.title}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Employee List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-semibold">Employee List</h2>
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-grow md:flex-grow-0">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search from 28 records"
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full md:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}  
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={handleAddEmployee}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Employee</span>
                </motion.button>
              </div>
            </div>

            <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
              {tabs.map((tab, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap text-gray-600 hover:bg-gray-50 ${
                    selectedTab === tab.label ? "text-gray-900" : ""
                  }`}
                  onClick={() => setSelectedTab(tab.label)}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 text-xs text-white rounded-md ${tab.countColor}`}
                  >
                    {tab.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DOB
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    BGV Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentEmployees.map((employee) => (
                  <motion.tr
                    key={employee.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={employee.avatar}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.dob}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.designation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            employee.status === "Verified"
                              ? "bg-green-500"
                              : employee.status === "InProgress"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          } mr-2`}
                        ></div>
                        <span className="text-sm text-gray-900">
                          {employee.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-black-600 border border-gray-300 rounded-full px-4 py-1 transition-colors duration-300">
                        View Profile
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastEmployee >= employees.length}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstEmployee + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastEmployee, employees.length)}
                  </span>{" "}
                  of <span className="font-medium">{employees.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {/* Add page numbers here if needed */}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastEmployee >= employees.length}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

