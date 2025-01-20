import React, { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { LuUser } from "react-icons/lu";
import { FaListAlt } from "react-icons/fa";
import { Search, Download } from 'lucide-react';
 
 
export default  function AddEmployee(){
  const [activeTab, setActiveTab] = useState("addEmployee");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    referenceId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    countryCode: "",
    dob: "",
    designation: "",
    gender: "",
    status: "Initiated",
  });
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Validate the form (basic validation here)
    if (
      !formData.referenceId ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile ||
      !formData.designation ||
      !formData.gender
    ) {
      alert("Please fill all the fields.");
      return;
    }
 
    // Add employee to the list
    setEmployees((prev) => [...prev, formData]);
 
    // Clear the form
    setFormData({
      referenceId: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      countryCode: "",
      dob: "",
      designation: "",
      gender: "",
      status: "Initiated",
    });
 
    // Switch to the "Added Employee" tab
    setActiveTab("addedEmployee");
  };
 
  return (
    <div className="font-[Public Sans]">
      <Header />
      <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
 
      <main
        className={`pt-0.1 transition-all duration-300 ${sidebarCollapsed ? "ml-10" : "lg:ml-64"
          } ${sidebarCollapsed ? "lg:ml-14" : ""} md:ml-0`}
      >
        <div>
          <div className="mb-6 border-b border-gray-200">
            <ul className="flex -mb-px">
              <li>
                <button
                  onClick={() => setActiveTab("addEmployee")}
                  className={`inline-flex items-center space-x-2 p-4 ${activeTab === "addEmployee"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300"
                    }`}
                >
                  <LuUser className="text-lg" />
                  <span>Add Employee</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("addedEmployee")}
                  className={`inline-flex items-center space-x-2 p-4 ${activeTab === "addedEmployee"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300"
                    }`}
                >
                  <FaListAlt className="text-lg" />
                  <span>Added Employee List</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-8 bg-white max-w-8xl mx-auto">
          {activeTab === "addEmployee" && (
            <>
              <h2 className="text-1.5xl font-bold mb-6 text-gray-800">Employee Information</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Reference ID
                    </label>
                    <input
                      type="text"
                      name="referenceId"
                      value={formData.referenceId}
                      onChange={handleInputChange}
                      className="block w-full p-2.5 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="block w-full p-2.5 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="block w-full p-2.5 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Personal Email ID
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full p-2.5 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="block w-20 p-2.5 text-sm border rounded-l-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="+1">+1</option>
                        <option value="+91">+91</option>
                      </select>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="block flex-1 p-2.5 text-sm border rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Mobile number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="block w-full p-2.5 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="block w-full p-2.5 text-sm border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="mt-1">
                    <label className="block mb-4 text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Female</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Male</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        referenceId: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        mobile: "",
                        countryCode: "",
                        dob: "",
                        designation: "",
                        gender: "",
                        status: "Initiated",
                      })
                    }
                    className="px-4 py-2 text-sm text-gray-500 bg-gray-100 border border-gray-300 hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-blue-400 border border-gray-300 hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
 
          {activeTab === "addedEmployee" && (
                <div className="p-2 w-full">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <span className=" font-medium">Initiated</span>
                    <span className="bg-purple-500 text-white-800 text-sm font-medium px-2.5 py-0.5 rounded-md">1</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-4 h-4 text-gray-500" />
                      </div>
                      <input
                        type="search"
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white"
                        placeholder="Search from 28 records"
                      />
                    </div>
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>
          
                <div className=" overflow-x-auto  rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 w-full">
                      <tr>
                        <th className="px-6 py-3 whitespace-nowrap">REFERENCE ID</th>
                        <th className="px-6 py-3">EMPLOYEE</th>
                        <th className="px-6 py-3">GENDER</th>
                        <th className="px-6 py-3">PHONE NUMBER</th>
                        <th className="px-6 py-3">DOB</th>
                        <th className="px-6 py-3">DESIGNATION</th>
                        <th className="px-6 py-3">ADDED DATE</th>
                        <th className="px-6 py-3">BGV STATUS</th>
                        <th className="px-6 py-3">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee, index) => (
                        <tr key={index} className="bg-white border-b">
                          <td className="px-6 py-4">{employee.referenceId}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                                <span className="text-blue-600 font-medium">JA</span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{employee.name}</div>
                                <div className="text-sm text-gray-500">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">{employee.gender}</td>
                          <td className="px-6 py-4">{employee.phoneNumber}</td>
                          <td className="px-6 py-4">{employee.dob}</td>
                          <td className="px-6 py-4">{employee.designation}</td>
                          <td className="px-6 py-4">{employee.addedDate}</td>
                          <td className="px-6 py-4">
                            <span className="text-blue-600">• {employee.bgvStatus}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <button className="text-gray-500 hover:text-gray-700">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button className="text-gray-500 hover:text-gray-700">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </button>
                              <button className="text-gray-500 hover:text-gray-700">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
          )}
        </div>
      </main>
    </div>
  );
};
 

 
 