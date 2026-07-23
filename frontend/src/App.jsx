import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminAlerts from './pages/AdminAlerts';
import SupervisorDashboard from './pages/SupervisorDashboard';
import SupervisorViolations from './pages/SupervisorViolations';

const Layout = ({ children }) => (
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-slate-50">{children}</main>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRole="admin"><Layout><AdminUsers /></Layout></ProtectedRoute>} />
          <Route path="/admin/alerts" element={<ProtectedRoute allowedRole="admin"><Layout><AdminAlerts /></Layout></ProtectedRoute>} />

          {/* Supervisor Routes */}
          <Route path="/supervisor/dashboard" element={<ProtectedRoute allowedRole="supervisor"><Layout><SupervisorDashboard /></Layout></ProtectedRoute>} />
          <Route path="/supervisor/violations" element={<ProtectedRoute allowedRole="supervisor"><Layout><SupervisorViolations /></Layout></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
