import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from '@tanstack/react-router';
import { User, Calendar, Phone, Edit2, Mail, Save, X } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, phone: user.phone || '' });
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/api/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setInquiries(Array.isArray(data) ? data : []))
      .catch(console.error);
    }
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setEditing(false);
        // User context updates handled implicitly if we fetch profile again 
        // For now, let's just force reload or notify success
        window.location.reload(); 
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="bg-primary-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Your Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col gap-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="h-6 w-6 text-primary-500" /> Profile
                </h2>
                {!editing ? (
                  <button onClick={() => setEditing(true)} className="text-primary-600 hover:text-primary-800 p-2 rounded-full hover:bg-primary-50 transition-colors">
                    <Edit2 className="h-5 w-5" />
                  </button>
                ) : (
                  <button onClick={() => setEditing(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {!editing ? (
                <div className="space-y-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Full Name</span>
                    <span className="text-lg font-semibold text-gray-800">{user?.name}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Email Address</span>
                    <span className="text-lg font-semibold text-gray-800 flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400" /> {user?.email}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">Phone Number</span>
                    <span className="text-lg font-semibold text-gray-800 flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400" /> {user?.phone || 'Not provided'}</span>
                  </div>
                  <button onClick={logout} className="w-full mt-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors border border-red-100">
                    Sign Out
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-300 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input type="email" value={user?.email} disabled className="w-full px-4 py-2 border rounded-xl bg-gray-50 text-gray-500 outline-none cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-300 outline-none" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 flex justify-center items-center gap-2 transition-colors">
                    <Save className="h-5 w-5" /> Save Changes
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Inquiries Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              My Inquiries <span className="text-sm font-medium bg-primary-100 text-primary-700 px-3 py-1 rounded-full">{inquiries.length}</span>
            </h2>
            
            {inquiries.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-10 w-10 text-primary-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No inquiries yet</h3>
                <p className="text-gray-500 max-w-sm mb-6">You haven't reached out to any vendors yet. Start exploring and request quotes from your favorites!</p>
                <a href="/vendors" className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors shadow-md">Browse Vendors</a>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map(inq => (
                  <div key={inq.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-md transition-shadow">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        {inq.vendor_name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> For: {format(new Date(inq.event_date), 'MMM dd, yyyy')}</span>
                      </div>
                      <p className="text-gray-600 mt-3 line-clamp-2 italic border-l-2 border-primary-200 pl-3">"{inq.message}"</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${inq.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        {inq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
