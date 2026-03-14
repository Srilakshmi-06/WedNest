import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from '@tanstack/react-router';
import { UserPlus, ArrowRight } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user);
        navigate({ to: '/dashboard' });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-primary-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl p-10 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"></div>
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Start planning your dream wedding today</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-semibold border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none bg-gray-50 focus:bg-white" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none bg-gray-50 focus:bg-white" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
            <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none bg-gray-50 focus:bg-white" placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none bg-gray-50 focus:bg-white" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg mt-8 group">
            Sign Up <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8 font-medium">
          Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-800 font-bold ml-1">Log in</Link>
        </p>
      </div>
    </div>
  );
}
