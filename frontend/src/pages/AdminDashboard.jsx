import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

const AdminDashboard = () => {
  const [insights, setInsights] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await axios.get('https://ayantrai-intelligence.onrender.com/api/admin/insights', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInsights(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInsights();
  }, [token]);

  const totalV = insights?.totalViolations || 0;
  const pendingV = insights?.pendingViolations || 0;
  const ackV = insights?.acknowledgedViolations || 0;

  const pendingPercent = totalV > 0 ? (pendingV / totalV) * 100 : 0;
  const ackPercent = totalV > 0 ? (ackV / totalV) * 100 : 0;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Admin Analytics Dashboard</h1>
        <p className="text-sm text-slate-500">Real-time overview of workforce safety compliance and system metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Workers</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{insights?.totalWorkers || 0}</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Violations</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalV}</h3>
          </div>
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <ShieldAlert className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pending Alerts</p>
            <h3 className="text-3xl font-bold text-amber-600 mt-1">{pendingV}</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Acknowledged</p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-1">{ackV}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Visual Analytics / Progress Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Violation Status Breakdown (Graph)</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-amber-600">Pending Alerts ({pendingV})</span>
                <span>{pendingPercent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${pendingPercent}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-emerald-600">Acknowledged Alerts ({ackV})</span>
                <span>{ackPercent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${ackPercent}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-2">System Compliance Summary</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            The system continuously tracks IoT-enabled safety gear compliance across all departments. The visual chart on the left illustrates the active resolution rate of recorded safety violations. Use the sidebar to inspect unacknowledged items or manage supervisors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;