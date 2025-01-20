import React, { useState } from "react";
import Header from "../../components/layout/AdminLayout/Header";
import Sidebar from "../../components/layout/AdminLayout/Sidebar";
import { MdPerson, MdEmail, MdPhone, MdCalendarToday, MdWork } from "react-icons/md";
import { useNavigate } from "react-router-dom";
 
 
export default function Verification() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  
 
  const employees = [
    {
      id: 432143,
      name: "Dianne Russell",
      email: "dianne.russell@gmail.com",
      phone: "+91 9431234567",
      dob: "December-9-1992",
      designation: "SAC Consultant",
      profilePicture: "https://via.placeholder.com/80",
      status: "InProgress",
      updatedDate: "12-10-24",
    },
  ];
 
  const handleViewDetail = (employee) => {
    setSelectedEmployee(employee);
  };
 
  const handleVerificationEdit = () => {
    navigate("/VerificationEdit");
  };
 
  return (
    <div className="p-5 bg-gray-50 flex-grow">
      {/* Header */}
      <Header />
 
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
 
      {/* Main Content */}
      <main
        className={`pt-0.1 transition-all duration-300 ${sidebarCollapsed ? "ml-10" : "lg:ml-64"
          } ${sidebarCollapsed ? "lg:ml-14" : ""} md:ml-0`}
      >
 
        {/* Tabs */}
        <div className=" flex space-x-2">
          {["All", "InProgress (2)", "Initiated", "Verified", "Rejected", "Error"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${status.includes("InProgress")
                ? "bg-indigo-100 text-indigo-600"
                : "bg-gray-100 text-gray-600"
                }`}
            >
              {status}
            </button>
          ))}
        </div>
 
        {/* Content */}
        <div className="mt-6 flex space-x-4">
          {/* Employee List */}
          <div className={`bg-white shadow rounded-lg p-4 w-${selectedEmployee ? "1/3" : "1/3"}`}>
            {employees.map((employee) => (
              <div key={employee.id} className="mb-6">
                {/* Employee Header */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Employee Picture */}
                      <img
                        src="https://randomuser.me/api/portraits/men/9.jpg"
                        alt="Employee"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">{employee.name}</h2>
                        <p className="text-sm text-gray-500">{employee.designation}</p>
                      </div>
                    </div>
                    {/* Updated Date */}
                    {/* <p className="text-xs text-gray-400">{employee.updatedDate}</p> */}
                  </div>
 
                  {/* Gray Line */}
                  <div className="border-b border-gray-200 my-3"></div>
 
                  {/* Status and Updated Alignment */}
                  <div className="flex justify-between items-center">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-600 rounded-full">
                      {employee.status}
                    </span>
                    <p className="text-xs text-gray-400">Updated {employee.updatedDate}</p>
                  </div>
                </div>
 
                {/* Employee Details */}
                <div className="mt-5 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MdPerson className="text-gray-500 w-5 h-5" />
                    <span className="ml-4">{employee.id}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdEmail className="text-gray-500 w-5 h-5" />
                    <span className="ml-4">{employee.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdPhone className="text-gray-500 w-5 h-5" />
                    <span className="ml-4">{employee.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdCalendarToday className="text-gray-500 w-5 h-5" />
                    <span className="ml-4">{employee.dob}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MdWork className="text-gray-500 w-5 h-5" />
                    <span className="ml-4">7</span>
                  </div>
                </div>
 
                {/* View in Detail Button */}
                <button
                  onClick={handleVerificationEdit}
                  className="mt-4 w-full px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white text-sm font-medium transition"
                >
                  View in detail
                </button>
              </div>
            ))}
          </div>
 
 
          {/* Detailed View */}
          {selectedEmployee && (
            <div className="bg-white shadow rounded-lg p-6 w-2/3 mb-20">
              {/* Header */}
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Preview Employee Information
                  </h3>
                  {/* <button
                    onClick={handleCloseDetail}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="fas fa-times"></i>
                  </button> */}
                </div>
                {/* Gray Line */}
                <hr className="mt-2 border-t border-gray-300" />
              </div>
 
              {/* Content */}
              <div className="flex">
                {/* Right Section */}
                <div className="w-full ">
                  {/* Information Grid */}
                  <div className="grid grid-cols-4 gap-6 mt-2 ">
                    <p>
                      <strong className="block text-sm text-gray-600">
                        Full Name
                      </strong>
                      <span className="text-gray-800">{selectedEmployee.name}</span>
                    </p>
                    <p>
                      <strong className="block text-sm text-gray-600">
                        Personal Email ID
                      </strong>
                      <span className="text-gray-800">{selectedEmployee.email}</span>
                    </p>
                    <p>
                      <strong className="block text-sm text-gray-600">DOB</strong>
                      <span className="text-gray-800">{selectedEmployee.dob}</span>
                    </p>
                    <p>
                      <strong className="block text-sm text-gray-600">
                        Mobile Number
                      </strong>
                      <span className="text-gray-800">{selectedEmployee.phone}</span>
                    </p>
                    <p>
                      <strong className="block text-sm text-gray-600">
                        Designation
                      </strong>
                      <span className="text-gray-800">
                        {selectedEmployee.designation}
                      </span>
                    </p>
                  </div>
 
                  {/* Buttons */}
                  <div className="mt-14 flex justify-end space-x-4">
                    <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-sm">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
 
 
        </div>
      </main>
    </div>
  );
};
 
 
 