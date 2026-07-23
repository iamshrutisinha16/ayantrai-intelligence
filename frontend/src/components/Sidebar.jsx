import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Supervisors', path: '/admin/users', icon: Users },
    { name: 'Critical Alerts', path: '/admin/alerts', icon: AlertTriangle },
  ];

  const supervisorLinks = [
    { name: 'Dashboard', path: '/supervisor/dashboard', icon: LayoutDashboard },
    { name: 'PPE Violations', path: '/supervisor/violations', icon: ShieldCheck },
  ];

  const links = user.role === 'admin' ? adminLinks : supervisorLinks;

  return (
    <aside className="w-64 bg-slate-800 text-slate-300 flex flex-col min-h-[calc(100vh-73px)] p-4 shadow-inner">
      <div className="mb-6 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Navigation
      </div>
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${
                isActive ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;