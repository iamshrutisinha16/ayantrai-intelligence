import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AlertTriangle, Clock } from 'lucide-react';

const AdminAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/alerts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlerts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
          <AlertTriangle className="h-7 w-7 text-red-600" />
          <span>Critical Escalated Alerts</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">These violations were not addressed by supervisors within the 10-minute threshold.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="p-4">Worker ID</th>
              <th className="p-4">Worker Name</th>
              <th className="p-4">Department</th>
              <th className="p-4">Violation</th>
              <th className="p-4">Incident Time</th>
              <th className="p-4">Escalation Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {alerts.map((alert) => (
              <tr key={alert._id} className="hover:bg-red-50/30">
                <td className="p-4 font-semibold text-slate-900">{alert.worker?.workerId}</td>
                <td className="p-4 font-medium text-slate-800">{alert.worker?.name}</td>
                <td className="p-4 text-slate-600">{alert.worker?.department}</td>
                <td className="p-4 text-red-600 font-medium">{alert.violationType}</td>
                <td className="p-4 text-slate-500 text-xs">{new Date(alert.createdAt).toLocaleString()}</td>
                <td className="p-4">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center space-x-1">
                    <Clock className="h-3 w-3 inline mr-1" /> Escalated to Admin
                  </span>
                </td>
              </tr>
            ))}
            {alerts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-12 text-slate-400">No pending alerts older than 10 minutes. Everything is under control!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAlerts;