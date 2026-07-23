import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, ShieldAlert } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-slate-900 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <ShieldAlert className="h-8 w-8 text-indigo-400" />
        <span className="text-xl font-bold tracking-wide">AyantrAI <span className="text-indigo-400 text-sm font-normal">Workforce Intelligence</span></span>
      </div>
      {user && (
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-indigo-300 uppercase tracking-wider">{user.role}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;