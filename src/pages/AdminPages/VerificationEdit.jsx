import React, { useState } from "react";
import Header from "../../components/layout/AdminLayout/Header";
import Sidebar from "../../components/layout/AdminLayout/Sidebar";
import { MdPerson, MdEmail, MdPhone, MdCalendarToday, MdWork } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
 
export default function VerificationEdit() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("employeeDetails");
 
  const employee = {
    id: 432143,
    name: "Dianne Russell",
    email: "dianne.russell@gmail.com",
    phone: "+91 9431234567",
    dob: "December-9-1992",
    designation: "SAC Consultant",
    profilePicture: "https://randomuser.me/api/portraits/men/9.jpg",
    status: "InProgress",
    updatedDate: "12-10-24",
  };
 
 
 
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Header */}
      <Header />
 
      {/* Sidebar */}
      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
 
        {/* Main Content */}
        <main
          className={`flex-grow transition-all duration-300 p-5 ${sidebarCollapsed ? "ml-10" : "lg:ml-64"
            }`}
        >
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <span>Verification</span>
            <span className="text-gray-400">/</span>
            <span>InProgress</span>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600">423143</span>
          </div>
 
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <ul className="flex -mb-px">
              <li>
                <button
                  onClick={() => setActiveTab("employeeDetails")}
                  className={`inline-flex items-center space-x-2 p-4 ${activeTab === "employeeDetails"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300"
                    }`}
                >
                  <GoPerson className="text-lg" />
                  <span>Employee Details</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("documents")}
                  className={`inline-flex items-center space-x-2 p-4 ${activeTab === "documents"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300"
                    }`}
                >
                  <MdOutlineDocumentScanner className="text-lg" />
                  <span>Documents</span>
                </button>
              </li>
            </ul>
          </div>
 
          {/* Content */}
          {activeTab === "employeeDetails" && (
            <div className="flex space-x-4">
              {/* Employee Card */}
              <div className="w-1/3 bg-white shadow rounded-lg p-4">
                <div className="relative text-center">
                  {/* Three-Dot Menu */}
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    <BsThreeDotsVertical size={20} />
                  </button>
 
                  {/* Employee Picture */}
                  <img
                    src={employee.profilePicture}
                    alt="Employee"
                    className="w-16 h-16 rounded-full mx-auto"
                  />
 
                  {/* Employee Name */}
                  <h2 className="mt-2 text-lg font-semibold text-gray-800">{employee.name}</h2>
                  <p className="text-sm text-gray-500">{employee.designation}</p>
                </div>
 
                <div className="border-b border-gray-200 my-3"></div>
 
 
                {/* Details */}
                <div className="mt-4 space-y-4">
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
              </div>
 
              {/* Preview Card */}
              <div
                className="w-2/3 bg-white shadow rounded-lg p-6"
                style={{ height: "320px" }} // Adjust height here
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview Employee Information</h3>
 
                <hr className=" border-t border-gray-300" />
 
                <div className="grid grid-cols-4 gap-6 mt-5">
                  <p>
                    <strong className="block text-sm text-gray-600">Full Name</strong>
                    <span className="text-gray-800">{employee.name}</span>
                  </p>
                  <p>
                    <strong className="block text-sm text-gray-600">Personal Email ID</strong>
                    <span className="text-gray-800">{employee.email}</span>
                  </p>
                  <p>
                    <strong className="block text-sm text-gray-600">DOB</strong>
                    <span className="text-gray-800">{employee.dob}</span>
                  </p>
                  <p>
                    <strong className="block text-sm text-gray-600">Mobile Number</strong>
                    <span className="text-gray-800">{employee.phone}</span>
                  </p>
                  <p>
                    <strong className="block text-sm text-gray-600">Designation</strong>
                    <span className="text-gray-800">{employee.designation}</span>
                  </p>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "documents" && (
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Documents</h2>
              <div className="space-y-4">
                {/* Document List */}
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-800 font-medium">Resume.pdf</p>
                  <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
                    Download
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
 
 