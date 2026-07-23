import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShieldAlert, CheckCircle, BellRing, Download } from 'lucide-react';

const SupervisorViolations = () => {
  const [violations, setViolations] = useState([]);
  const token = localStorage.getItem('token');

  const fetchViolations = async () => {
    try {
      const res = await axios.get('https://ayantrai-intelligence.onrender.com/api/supervisor/violations', {
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

  const handleAcknowledge = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/supervisor/acknowledge/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchViolations();
    } catch (err) {
      console.error(err);
    }
  };

  const simulateViolation = async () => {
    try {
      await axios.post('http://localhost:5000/api/supervisor/simulate-violation', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchViolations();
    } catch (err) {
      console.error(err);
    }
  };

  const exportReports = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Worker ID,Name,Department,Violation,Status,Time"].join(",") + "\n"
      + violations.map(v => `"${v.worker?.workerId}","${v.worker?.name}","${v.worker?.department}","${v.violationType}","${v.status}","${v.createdAt}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ppe_violations_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">PPE Safety Violations</h1>
          <p className="text-sm text-slate-500">Monitor and respond to real-time non-compliance alerts.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={simulateViolation}
            className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
          >
            <BellRing className="h-4 w-4" />
            <span>Simulate IoT Alert</span>
          </button>
          <button
            onClick={exportReports}
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="p-4">Worker Info</th>
              <th className="p-4">Department</th>
              <th className="p-4">Violation Type</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {violations.map((v) => (
              <tr key={v._id} className="hover:bg-slate-50/50">
                <td className="p-4">
                  <p className="font-semibold text-slate-900">{v.worker?.name || 'N/A'}</p>
                  <p className="text-xs text-slate-500">ID: {v.worker?.workerId}</p>
                </td>
                <td className="p-4 text-slate-600">{v.worker?.department}</td>
                <td className="p-4 text-slate-700 font-medium">{v.violationType}</td>
                <td className="p-4 text-slate-500 text-xs">{new Date(v.createdAt).toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    v.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {v.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  {v.status === 'Pending' ? (
                    <button
                      onClick={() => handleAcknowledge(v._id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                    >
                      Acknowledge
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-600 font-medium flex items-center justify-center space-x-1">
                      <CheckCircle className="h-4 w-4 inline" /> <span>Acknowledged</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {violations.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-8 text-slate-400">No violations recorded yet. Click simulate to test!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupervisorViolations;