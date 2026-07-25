import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      if (res.role === 'admin') navigate('/admin/dashboard');
      else navigate('/supervisor/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 mb-3">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h2 className="text-2xl font-bold text-white">AyantrAI Portal</h2>
          <p className="text-sm text-slate-400 mt-1">Connected Workforce Intelligence</p>
        </div>

        {error && <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ayantrai.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition shadow-lg shadow-indigo-600/30"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;