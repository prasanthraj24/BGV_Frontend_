import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Overview from './pages/Overview';
import AddEmployee from './pages/AddEmployee';
import Verification from './pages/Verification';
import SignIn from './components/Auth/SignIn'; 

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <main className="p-8 mt-16">
          <Routes>
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/signin" element={<SignIn />} /> 
            <Route path="/overview" element={<Overview />} />
            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}





