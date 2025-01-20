import React, { useState, useEffect } from "react";
import Header from "../../components/layout/AdminLayout/Header";
import Sidebar from "../../components/layout/AdminLayout/Sidebar";
import { LuUser } from "react-icons/lu";
import { FaListAlt } from "react-icons/fa";
import {
  Search,
  Download,
  Mail,
  Pencil,
  Trash2,
  CheckCircle,
  X,
} from "lucide-react";
import { UserIcon as Male, UserIcon as Female } from "lucide-react";
import config from "../../config";


export default function AddEmployee() {
  const [activeTab, setActiveTab] = useState("addEmployee");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    referenceId: "",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    gender: "",
    month: "",
    date: "",
    year: "",
    designation: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.referenceId)
      newErrors.referenceId = "Reference ID is required";
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.month || !formData.date || !formData.year) {
      newErrors.dob = "Date of Birth is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && value.length > 10) {
      return; // Prevent entering more than 10 digits
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
  };

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditing) {
        await handleUpdateEmployee();
      } else {
        setShowPreview(true);
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleUpdateEmployee = async () => {
    const currentDate = new Date().toISOString();
    const updatedEmployee = {
      referenceId: formData.referenceId,
      firstName: formData.firstName || "N/A",
      lastName: formData.lastName || "N/A",
      emailId: formData.email || "N/A",
      gender: formData.gender || "Not specified",
      mobileNumber: formData.mobile || "",
      countryCode: formData.countryCode || "+91",
      dob: `${formData.year}-${String(formData.month).padStart(
        2,
        "0"
      )}-${String(formData.date).padStart(2, "0")}`,
      designation: formData.designation || "N/A",
      bgvStatus: "Initiated",
      updatedAt: currentDate,
    };

    try {
      const response = await fetch(
        `${config.API_UPDATE}${formData.referenceId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEmployee),
        }
      );

      if (response.ok) {
        setShowSuccess(true);
        setIsEditing(false);
        fetchEmployees(); // Refresh the list after updating
        setActiveTab("addedEmployee");
        resetForm();
      } else {
        const error = await response.json();
        console.error("API Error:", error);
        setErrors({ apiError: error.message || "Failed to update employee." });
      }
    } catch (error) {
      console.error("Network Error:", error);
      setErrors({ apiError: "Network error occurred. Please try again." });
    }
  };

  const resetForm = () => {
    setFormData({
      referenceId: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      gender: "",
      countryCode: "+91",
      month: "",
      date: "",
      year: "",
      designation: "",
    });
    setIsEditing(false);
  };

  const handleConfirmSubmit = async () => {
    const currentDate = new Date().toISOString();
    const newEmployee = {
      referenceId: formData.referenceId,
      firstName: formData.firstName || "N/A",
      lastName: formData.lastName || "N/A",
      emailId: formData.email || "N/A",
      gender: formData.gender || "Not specified",
      mobileNumber: formData.mobile || "",
      countryCode: formData.countryCode || "+91",
      dob: `${formData.year}-${String(formData.month).padStart(
        2,
        "0"
      )}-${String(formData.date).padStart(2, "0")}`,
      designation: formData.designation || "N/A",
      bgvStatus: "Initiated",
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    try {
      const response = await fetch(config.API_CREATE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        const result = await response.json();
        fetchEmployees(); // Refresh the list after adding
        setActiveTab("addedEmployee");
        resetForm();
      } else {
        const error = await response.json();
        console.error("API Error:", error);
        setErrors({ apiError: error.message || "Failed to add employee." });
      }
    } catch (error) {
      console.error("Network Error:", error);
      setErrors({ apiError: "Network error occurred. Please try again." });
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${config.API_GET}`);
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEditEmployee = async (referenceId) => {
    try {
      const response = await fetch(`${config.API_UPDATE}/${referenceId}`);
      if (response.ok) {
        const employee = await response.json();
        const dobParts = employee.dob.split("-");

        setFormData({
          referenceId: employee.referenceId,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.emailId,
          mobile: employee.mobileNumber,
          countryCode: employee.countryCode || "+91",
          month: dobParts[1],
          date: dobParts[2],
          year: dobParts[0],
          designation: employee.designation,
          gender: employee.gender,
        });

        setIsEditing(true);
        setActiveTab("addEmployee");
      } else {
        console.error("Failed to fetch employee details.");
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDeleteEmployee = async (referenceId) => {
    try {
      const response = await fetch(`${config.API_DELETE}/${referenceId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.referenceId !== referenceId)
        );
      } else {
        console.error("Failed to delete employee.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const renderEmployeeTable = () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-4 py-3.5 text-left text-xs font-semiBold text-gray-600 uppercase"
          >
            Reference ID
          </th>
          <th
            scope="col"
            className="px-4 py-3.5 text-left text-xs  font-semiBold text-gray-600 uppercase"
          >
            Employee
          </th>
          <th
            scope="col"
            className="px-4 py-3.5 text-left text-xs  font-semiBold text-gray-600 uppercase"
          >
            Gender
          </th>
          <th
            scope="col"
            className="px-4 py-3.5 text-left text-xs  font-semiBold text-gray-600 uppercase"
          >
            Phone Number
          </th>
          <th
            scope="col"
            className="px-4 py-3.5 text-left text-xs  font-semiBold text-gray-600 uppercase"
          >
            DOB
          </th>
          <th
            scope="col"
            className="px-4 py-3.5 text-left text-xs  font-semiBold text-gray-600 uppercase"
          >
            Designation
          </th>
          <th
            scope="col"
            className="px-4 py-3.5 text-left text-xs  font-semiBold text-gray-600 uppercase"
          >
            Added Date
          </th>
          <th
            scope="col"
            className="px-4 py-3.5 text-left text-xs  font-semiBold text-gray-600 uppercase"
          >
            BGV Status
          </th>
          <th
            scope="col"
            className="px-4 py-3.5 text-left text-xs  font-semiBold text-gray-600 uppercase"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {filteredEmployees?.map((employee, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
              {employee.referenceId}
            </td>
            <td className="whitespace-nowrap px-4 py-4">
              <div className="flex items-center">
                <div className="h-9 w-9 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {`${employee.firstName?.[0] || ""}${
                      employee.lastName?.[0] || ""
                    }`}
                  </span>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">
                    {`${employee.firstName} ${employee.lastName}`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {employee.emailId}
                  </div>
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
              {employee.gender}
            </td>
            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
              {`${employee.countryCode} ${employee.mobileNumber}`}
            </td>
            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
              {formatDate(employee.dob)}
            </td>
            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
              {employee.designation}
            </td>
            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
              {formatDate(employee.createdAt)}
            </td>
            <td className="whitespace-nowrap px-4 py-4">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                <span className="text-sm text-gray-900 font-medium text-purple-600">
                  {employee.bgvStatus || "Initiated"}
                </span>
              </div>
            </td>
            <td className="whitespace-nowrap px-4 py-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleEditEmployee(employee.referenceId)}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="text-blue-500 hover:text-blue-600">
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteEmployee(employee.referenceId)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4 " />
                </button>
              </div>
            </td>
          </tr>
        ))}
        {filteredEmployees.length === 0 && (
          <tr>
            <td
              colSpan="9"
              className="px-4 py-8 text-center text-sm text-gray-500"
            >
              No employees found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const getSubmitButtonText = () => {
    // if (showPreview) return "Send Email";
    return isEditing ? "Update" : "Submit";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

      <main
        className={`pt-0.1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-10" : "lg:ml-64"
        } ${sidebarCollapsed ? "lg:ml-14" : ""} md:ml-0`}
      >
        <div>
          <div className="mb-6 border-b border-gray-200">
            <ul className="flex -mb-px">
              <li>
                <button
                  onClick={() => setActiveTab("addEmployee")}
                  className={`inline-flex items-center space-x-2 p-4 ${
                    activeTab === "addEmployee"
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
                  className={`inline-flex items-center space-x-2 p-4 ${
                    activeTab === "addedEmployee"
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
            <div className="space-y-6">
              {showSuccess && (
                <div className="flex items-center justify-between p-4 mb-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      Employee Information {isEditing ? "updated" : "saved"}{" "}
                      successfully
                    </span>
                  </div>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="sr-only">Close</span>
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {showPreview ? (
                <div className="bg-white rounded-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">
                      Preview Employee Information
                    </h2>
                    <button
                      onClick={handleSaveDraft}
                      className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Save Draft
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                    <div>
                      <p className="text-sm text-gray-500">Reference ID</p>
                      <p className="font-medium mt-1">{formData.referenceId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium mt-1">
                        {`${formData.firstName} ${formData.lastName}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Personal Email ID</p>
                      <p className="font-medium mt-1">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mobile Number</p>
                      <p className="font-medium mt-1">{`${formData.countryCode} ${formData.mobile}`}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">DOB</p>
                      <p className="font-medium mt-1">{`${formData.month}-${formData.date}-${formData.year}`}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Designation</p>
                      <p className="font-medium mt-1">{formData.designation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium mt-1">{formData.gender}</p>
                    </div>
                  </div>
                  {emailSent && (
                    <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg">
                      Verification email has been sent successfully!
                    </div>
                  )}
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => setShowPreview(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleConfirmSubmit}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Send Email
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl text-gray-800">
                      Employee Information
                    </h2>
                    <button
                      onClick={handleSaveDraft}
                      className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Save Draft
                    </button>
                  </div>

                  <div className="h-px bg-gray-200 mb-6"></div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="referenceId"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Reference ID
                        </label>
                        <input
                          id="referenceId"
                          name="referenceId"
                          placeholder="456124"
                          value={formData.referenceId}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border ${
                            errors.referenceId
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.referenceId && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.referenceId}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          placeholder="e.g Harold"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border ${
                            errors.firstName
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          placeholder="e.g Das"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border ${
                            errors.lastName
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Personal Email ID
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="harold.das@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="mobile"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mobile Number
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={formData.countryCode}
                            onChange={handleInputChange}
                            name="countryCode"
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+1">🇺🇸 +1</option>
                          </select>
                          <input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            placeholder="Mobile number"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className={`flex-1 px-3 py-2 border ${
                              errors.mobile
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                        </div>
                        {errors.mobile && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.mobile}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          DOB
                        </label>
                        <div className="flex gap-2">
                          <select
                            name="month"
                            value={formData.month}
                            onChange={handleInputChange}
                            className={`flex-1 px-3 py-2 border ${
                              errors.dob ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          >
                            <option value="">Month</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i} value={i + 1}>
                                {new Date(0, i).toLocaleString("default", {
                                  month: "long",
                                })}
                              </option>
                            ))}
                          </select>
                          <select
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className={`flex-1 px-3 py-2 border ${
                              errors.dob ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          >
                            <option value="">Date</option>
                            {Array.from({ length: 31 }, (_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                          <select
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className={`flex-1 px-3 py-2 border ${
                              errors.dob ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          >
                            <option value="">Year</option>
                            {Array.from({ length: 100 }, (_, i) => {
                              const year = new Date().getFullYear() - i;
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        {errors.dob && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.dob}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="designation"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Designation
                        </label>
                        <input
                          id="designation"
                          name="designation"
                          placeholder="e.g Senior Developer"
                          value={formData.designation}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border ${
                            errors.designation
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.designation && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.designation}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender
                        </label>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              value="Female"
                              checked={formData.gender === "Female"}
                              onChange={handleInputChange}
                              className={`w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${
                                errors.gender ? "border-red-500" : ""
                              }`}
                            />
                            <Female className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">
                              Female
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              value="Male"
                              checked={formData.gender === "Male"}
                              onChange={handleInputChange}
                              className={`w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${
                                errors.gender ? "border-red-500" : ""
                              }`}
                            />
                            <Male className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Male</span>
                          </label>
                        </div>
                        {errors.gender && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.gender}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => resetForm()}
                        className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {getSubmitButtonText()}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}

          {activeTab === "addedEmployee" && (
            <div className="">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-medium text-gray-900">
                    Initiated
                  </h2>
                  <span className="bg-purple-600 text-white text-xs font-medium px-2.5 py-1 rounded-md">
                    {employees.length}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-grow sm:flex-grow-0">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={`Search from ${employees.length} records`}
                    />
                  </div>
                  <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto -mx-8">
                <div className="min-w-full align-middle">
                  <div className="overflow-hidden border border-gray-200 ">
                    {renderEmployeeTable()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
