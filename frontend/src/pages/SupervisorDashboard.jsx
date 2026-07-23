import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShieldCheck, BellRing, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SupervisorDashboard = () => {
  const [violations, setViolations] = useState([]);
  const token = localStorage.getItem('token');

  const fetchViolations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/supervisor/violations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setViolations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchViolations();
  }, []);

  const pendingCount = violations.filter(v => v.status === 'Pending').length;
  const acknowledgedCount = violations.filter(v => v.status === 'Acknowledged').length;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Supervisor Operations Dashboard</h1>
          <p className="text-sm text-slate-500">Manage floor safety compliance and handle PPE non-compliance incidents.</p>
        </div>
        <Link
          to="/supervisor/violations"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
        >
          View All Violations
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Incidents</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{violations.length}</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pending Review</p>
            <h3 className="text-3xl font-bold text-amber-600 mt-1">{pendingCount}</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Resolved</p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-1">{acknowledgedCount}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Guide for Supervisors</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
          <li>Navigate to the <span className="font-semibold text-indigo-600">PPE Violations</span> tab to check active non-compliance alerts.</li>
          <li>Click on <span className="font-semibold text-amber-600">Simulate IoT Alert</span> to test real-time data feeding.</li>
          <li>Acknowledge pending alerts promptly to prevent automatic escalation to the admin dashboard after 10 minutes.</li>
        </ul>
      </div>
    </div>
  );
};

export default SupervisorDashboard;