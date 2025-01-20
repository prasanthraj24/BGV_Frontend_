import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
 
export default function Verification()  {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("InProgress");
  const [showPreview, setShowPreview] = useState(false);
 
  const employee = {
    id: "432143",
    name: "Dianne Russell",
    role: "SAC Consultant",
    email: "dianne.russell@gmail.com",
    phone: "+91 9431234567",
    dob: "December 9, 1992",
    status: "InProgress",
    avatar: "https://via.placeholder.com/50",
  };
 
  const tabs = ["All", "InProgress", "Initiated", "Verified", "Rejected", "Error"];
 
  return (
    <div>
      {/* Header */}
      <Header />
 
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
 
      {/* Main Content */}
      <main
        className={`pt-0.1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-10" : "lg:ml-64"
        } ${sidebarCollapsed ? "lg:ml-14" : ""} md:ml-0`}
      >
        <div className="flex-1 p-6">
          {/* Tabs */}
          <div className="flex items-center space-x-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm ${
                  activeTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-700 border-b-2 border-transparent hover:border-blue-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
 
          {/* Employee Card */}
          {activeTab === "InProgress" && (
            <EmployeeCard
              employee={employee}
              onViewDetail={() => setShowPreview(true)}
            />
          )}
 
          {/* Preview Card */}
          {showPreview && (
            <PreviewCard
              employee={employee}
              onClose={() => setShowPreview(false)}
            />
          )}
        </div>
      </main>
    </div>
  );
};
 
// Employee Card Component
const EmployeeCard = ({ employee, onViewDetail }) => (
  <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={employee.avatar}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-medium text-gray-800">{employee.name}</h3>
          <p className="text-sm text-gray-500">{employee.role}</p>
        </div>
      </div>
      <div className="text-sm text-orange-500 bg-orange-100 px-3 py-1 rounded-full font-medium">
        {employee.status}
      </div>
    </div>
 
    <ul className="space-y-2 text-sm text-gray-600">
      <li className="flex items-center space-x-2">
        <span className="w-5 h-5 text-gray-500">&#35;</span>
        <span>{employee.id}</span>
      </li>
      <li className="flex items-center space-x-2">
        <span className="w-5 h-5 text-gray-500">&#9993;</span>
        <span>{employee.email}</span>
      </li>
      <li className="flex items-center space-x-2">
        <span className="w-5 h-5 text-gray-500">&#9743;</span>
        <span>{employee.phone}</span>
      </li>
      <li className="flex items-center space-x-2">
        <span className="w-5 h-5 text-gray-500">&#128197;</span>
        <span>{employee.dob}</span>
      </li>
    </ul>
 
    <button
      className="w-full mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded shadow hover:bg-blue-600"
      onClick={onViewDetail}
    >
      View in Detail
    </button>
  </div>
);
 
// Preview Card Component
const PreviewCard = ({ employee, onClose }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">
          Preview Employee Information
        </h3>
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &#10006;
        </button>
      </div>
 
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Full Name</p>
          <p className="text-sm text-gray-800">{employee.name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Personal Email ID</p>
          <p className="text-sm text-gray-800">{employee.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">DOB</p>
          <p className="text-sm text-gray-800">{employee.dob}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Mobile Number</p>
          <p className="text-sm text-gray-800">{employee.phone}</p>
        </div>
      </div>
 
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);
 
 
 