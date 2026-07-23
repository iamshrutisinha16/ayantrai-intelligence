import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, Shield } from 'lucide-react';

const AdminUsers = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('https://ayantrai-intelligence.onrender.com/api/admin/create-supervisor', { name, email, password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Supervisor created successfully!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating supervisor');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Manage Supervisors</h1>
        <p className="text-sm text-slate-500">Create and provision portal access for site supervisors.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        {message && <div className="mb-6 p-3 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-sm">{message}</div>}

        <form onSubmit={handleCreate} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Supervisor Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="supervisor@ayantrai.com"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 text-sm"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center space-x-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition shadow-sm"
          >
            <UserPlus className="h-5 w-5" />
            <span>Create Supervisor Account</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUsers;