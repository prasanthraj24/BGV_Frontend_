// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // Only Admin
// import Overview from './pages/AdminPages/Overview';
// import AddEmployee from './pages/AdminPages/AddEmployee';
// import Verification from './pages/AdminPages/Verification';
// import VerificationEdit from './pages/AdminPages/VerificationEdit';
// import SignIn from './components/Auth/AdminAuth/SignIn';
// import SignUp from './components/Auth/AdminAuth/SignUp';  


// // Employee
// import EmployeeSignIn from './components/Auth/EmployeeAuth/EmployeeSignIn';
// import EmployeePasswordReset from './components/Auth/EmployeeAuth/EmployeePasswordReset';

// //Only EMployee
// import EmployeeDocument from './pages/EmployeePages/EmployeeDocument';
// import EmployeeIdentity from './pages/EmployeePages/EmployeeIdentity';
// import EmployeeLiveCheck from './pages/EmployeePages/EmployeeLiveCheck';


// export default function App() {
  
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <main className="p-8 mt-16">
//           <Routes>
//             <Route path="/" element={<Navigate to="/signin" replace />} />
//             <Route path="/signin" element={<SignIn />} /> 
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/overview" element={<Overview />} />
//             <Route path="/addemployee" element={<AddEmployee />} />
//             <Route path="/verification" element={<Verification />} />
//             <Route path="/VerificationEdit" element={<VerificationEdit />} />
//             <Route path="/EmployeeSignin" element={<EmployeeSignIn />} />
//             <Route path="/EmployeePasswordReset" element={<EmployeePasswordReset />} />
//             <Route path="/EmployeeDocument" element={<EmployeeDocument />} />
//             <Route path="/EmployeeIdentity" element={<EmployeeIdentity />} />
//             <Route path="/EmployeeLiveCheck" element={<EmployeeLiveCheck />} />
//             <Route path="*" element={<Navigate to="/signin" replace />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }




// import React, { useState, createContext, useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// // Admin Pages
// import Overview from './pages/AdminPages/Overview';
// import AddEmployee from './pages/AdminPages/AddEmployee';
// import Verification from './pages/AdminPages/Verification';
// import VerificationEdit from './pages/AdminPages/VerificationEdit';
// import AdminSignIn from './components/Auth/AdminAuth/SignIn';
// import AdminSignUp from './components/Auth/AdminAuth/SignUp';

// // Employee Pages
// import EmployeeSignIn from './components/Auth/EmployeeAuth/EmployeeSignIn';
// import EmployeePasswordReset from './components/Auth/EmployeeAuth/EmployeePasswordReset';
// import DocumentVerification from './pages/EmployeePages/EmployeeDocument';
// import IdentityVerification from './pages/EmployeePages/EmployeeIdentity';
// import LiveCheck from './pages/EmployeePages/EmployeeLiveCheck';

// // Layout Components
// import Header from './components/layout/AdminLayout/Header';
// import Sidebar from './components/layout/AdminLayout/Sidebar';
// import EmployeeHeader from './components/layout/EmployeeLayout/EmployeeHeader';
// import EmployeeSidebar from './components/layout/EmployeeLayout/EmployeeSidebar';

// // Create Role Context
// const RoleContext = createContext(null);

// export const useRole = () => useContext(RoleContext);

// const AdminLayout = ({ children }) => (
//   <div>
//     <Header />
//     <Sidebar />
//     <div className="admin-content">{children}</div>
//   </div>
// );

// const EmployeeLayout = ({ children }) => (
//   <div>
//     <EmployeeHeader />
//     <EmployeeSidebar />
//     <div className="employee-content">{children}</div>
//   </div>
// );

// export default function App() {
//   const [userRole, setUserRole] = useState('admin'); 

//   return (
//     <RoleContext.Provider value={{ userRole, setUserRole }}>
//       <Router>
//         <div className="min-h-screen bg-gray-50">
//           <main className="p-8 mt-16">
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/" element={<Navigate to="/Adminsignin" replace />} />
//               <Route path="/Adminsignin" element={<AdminSignIn />} />
//               <Route path="/Adminsignup" element={<AdminSignUp />} />
//               <Route path="/EmployeeSignin" element={<EmployeeSignIn />} />
//               <Route path="/EmployeePasswordReset" element={<EmployeePasswordReset />} />

//               {/* Admin Routes */}
//               {userRole === 'admin' && (
//                 <>
//                   <Route
//                     path="/admin/overview"
//                     element={
//                       <AdminLayout>
//                         <Overview />
//                       </AdminLayout>
//                     }
//                   />
//                   <Route
//                     path="/admin/addemployee"
//                     element={
//                       <AdminLayout>
//                         <AddEmployee />
//                       </AdminLayout>
//                     }
//                   />
//                   <Route
//                     path="/admin/verification"
//                     element={
//                       <AdminLayout>
//                         <Verification />
//                       </AdminLayout>
//                     }
//                   />
//                   <Route
//                     path="/admin/verificationedit"
//                     element={
//                       <AdminLayout>
//                         <VerificationEdit />
//                       </AdminLayout>
//                     }
//                   />
//                 </>
//               )}

//               {/* Employee Routes */}
//               {userRole === 'employee' && (
//                 <>
//                   <Route
//                     path="/employee/document"
//                     element={
//                       <EmployeeLayout>
//                         <DocumentVerification />
//                       </EmployeeLayout>
//                     }
//                   />
//                   <Route
//                     path="/employee/identity"
//                     element={
//                       <EmployeeLayout>
//                         <IdentityVerification />
//                       </EmployeeLayout>
//                     }
//                   />
//                   <Route
//                     path="/employee/livenesscheck"
//                     element={
//                       <EmployeeLayout>
//                         <LiveCheck />
//                       </EmployeeLayout>
//                     }
//                   />
//                 </>
//               )}

//               {/* Catch-All Route */}
//               <Route path="*" element={<Navigate to="/Adminsignin" replace />} />
//             </Routes>
//           </main>
//         </div>
//       </Router>
//     </RoleContext.Provider>
//   );
// }














// New Route  for Admin and Employee


import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Admin Pages
const Overview = lazy(() => import('./pages/AdminPages/Overview'));
const AddEmployee = lazy(() => import('./pages/AdminPages/AddEmployee'));
const Verification = lazy(() => import('./pages/AdminPages/Verification'));
const VerificationEdit = lazy(() => import('./pages/AdminPages/VerificationEdit'));
const SignIn = lazy(() => import('./components/Auth/AdminAuth/SignIn'));
const SignUp = lazy(() => import('./components/Auth/AdminAuth/SignUp'));

// Employee Pages
const EmployeeSignIn = lazy(() => import('./components/Auth/EmployeeAuth/EmployeeSignIn'));
const EmployeePasswordReset = lazy(() => import('./components/Auth/EmployeeAuth/EmployeePasswordReset'));
const EmployeeDocument = lazy(() => import('./pages/EmployeePages/EmployeeDocument'));
const EmployeeIdentity = lazy(() => import('./pages/EmployeePages/EmployeeIdentity'));
const EmployeeLiveCheck = lazy(() => import('./pages/EmployeePages/EmployeeLiveCheck'));

// Private Route Placeholder
const PrivateRoute = ({ children }) => {
  const isAuthenticated = true; // Replace with actual auth logic
  return isAuthenticated ? children : <Navigate to="/Admin/SignIn" replace />;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<div>Loading...</div>}>
          <main className="p-8 mt-16">
            <Routes>
              {/* Redirect Root */}
              <Route path="/" element={<Navigate to="/Admin/SignIn" replace />} />

              {/* Admin Routes */}
              <Route path="/Admin">
                <Route path="SignIn" element={<SignIn />} />
                <Route path="SignUp" element={<SignUp />} />
                <Route
                  path="Overview"
                  element={
                    <PrivateRoute>
                      <Overview />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="AddEmployee"
                  element={
                    <PrivateRoute>
                      <AddEmployee />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="Verification"
                  element={
                    <PrivateRoute>
                      <Verification />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="VerificationEdit"
                  element={
                    <PrivateRoute>
                      <VerificationEdit />
                    </PrivateRoute>
                  }
                />
              </Route>

              {/* Employee Routes */}
              <Route path="/Employee">
                <Route path="SignIn" element={<EmployeeSignIn />} />
                <Route path="PasswordReset" element={<EmployeePasswordReset />} />
                <Route
                  path="Document"
                  element={
                    <PrivateRoute>
                      <EmployeeDocument />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="Identity"
                  element={
                    <PrivateRoute>
                      <EmployeeIdentity />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="LiveCheck"
                  element={
                    <PrivateRoute>
                      <EmployeeLiveCheck />
                    </PrivateRoute>
                  }
                />
              </Route>

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/Employee/SignIn" replace />} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </Router>
  );
}
