import React, { useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import { MapPin, CheckCircle2, Send, Star, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function VendorDetails() {
  const { vendorId } = useParams({ strict: false });
  const { user, token } = useAuth();
  const [vendor, setVendor] = useState(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    event_date: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/vendors/${vendorId}`)
      .then(res => res.json())
      .then(data => setVendor(data))
      .catch(console.error);
  }, [vendorId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/inquiries`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...formData, vendor_id: vendorId })
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', event_date: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  if (!vendor) return <div className="min-h-screen bg-brand-50 flex justify-center items-center"><div className="w-16 h-16 border-t-4 border-brand-900 border-solid rounded-full animate-spin"></div></div>;

  return (
    <div className="bg-brand-50 min-h-screen pt-24 pb-32 selection:bg-accent-500 selection:text-white">
      {/* Return Navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <Link to="/vendors" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-500 hover:text-accent-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> The Directory
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Gallery Column (Editorial View) */}
        <div className="lg:w-1/2 space-y-8 lg:sticky lg:top-32 h-fit">
           <div className="relative w-full h-[60vh] lg:h-[75vh] object-cover block shadow-2xl overflow-hidden group">
             <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] grayscale-[10%]" />
             <div className="absolute top-6 left-6 flex bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-900 shadow-xl">
               {vendor.category}
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
             {/* Secondary decorative images based on their Unsplash seed theme, using random photo IDs for a gallery look */}
            <img src={`${vendor.image}?auto=format&fit=crop&q=60&w=400&h=400&crop=edges`} className="w-full h-48 object-cover grayscale-[30%] hover:grayscale-0 transition-opacity opacity-90 shadow-lg" alt="Detail 1"/>
            <img src={`${vendor.image}?auto=format&fit=crop&q=80&w=400&h=400&crop=center`} className="w-full h-48 object-cover grayscale-[30%] hover:grayscale-0 transition-opacity opacity-90 shadow-lg" alt="Detail 2" />
           </div>
        </div>

        {/* Info Column */}
        <div className="lg:w-1/2 flex flex-col pt-10">
          <h1 className="font-serif text-5xl md:text-7xl font-black text-brand-900 mb-6 leading-tight">
            {vendor.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-12 pb-12 border-b border-brand-200">
             <div className="flex items-center gap-2 font-bold text-accent-600 text-sm uppercase tracking-widest">
               <Star className="w-4 h-4 text-accent-500 fill-accent-500" /> {vendor.rating}
             </div>
             <span className="w-1 h-1 rounded-full bg-brand-300"></span>
             <div className="flex items-center gap-2 font-bold text-brand-600 text-sm uppercase tracking-widest">
               <MapPin className="w-4 h-4 text-brand-400" /> {vendor.location}
             </div>
             <span className="w-1 h-1 rounded-full bg-brand-300"></span>
             <div className="font-serif italic font-bold text-brand-900 text-lg">
               {vendor.price_range}
             </div>
          </div>

          <div className="mb-12">
             <h2 className="text-xs uppercase tracking-widest font-bold text-brand-500 mb-6">The Studio</h2>
             <p className="text-brand-700 text-lg lg:text-xl font-light leading-loose whitespace-pre-line">
               {vendor.description}
             </p>
          </div>

          <div className="mb-16">
             <h2 className="text-xs uppercase tracking-widest font-bold text-brand-500 mb-6">Capabilities</h2>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {vendor.services?.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                     <span className="text-accent-400 font-serif italic mt-1 font-bold">+</span>
                     <span className="font-medium text-brand-800 tracking-wide text-sm leading-relaxed">{service}</span>
                  </li>
                ))}
             </ul>
          </div>

          {/* Heavy Contrast Inquiry Form */}
          <div className="bg-brand-900 text-white p-10 lg:p-14 shadow-2xl relative overflow-hidden group border-t-8 border-accent-600 mt-auto">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent-600 rounded-full blur-[100px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-1000" />
             <div className="relative z-10">
               <h3 className="font-serif text-4xl font-bold mb-4">Request a Consultation.</h3>
               <p className="font-light text-brand-300 text-lg mb-10 border-b border-brand-800 pb-10">
                 Propose an arrangement for your occasion and receive a personalized quote directly from {vendor.name}.
               </p>

               {submitStatus === 'success' ? (
                 <div className="bg-brand-800 p-8 border border-brand-700 text-center flex flex-col items-center">
                   <div className="w-16 h-16 bg-accent-600/20 text-accent-500 rounded-full flex items-center justify-center mb-6">
                     <CheckCircle2 className="w-8 h-8" />
                   </div>
                   <p className="font-serif text-2xl font-bold mb-4 text-white">Inquiry Forwarded.</p>
                   <p className="text-brand-300 font-light mb-8">The artisans at {vendor.name} have received your request and will communicate shortly.</p>
                   <button onClick={() => setSubmitStatus(null)} className="text-xs font-bold uppercase tracking-widest text-accent-400 hover:text-white transition-colors border-b border-accent-400 hover:border-white pb-1">
                     Send Another Document
                   </button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-brand-400 mb-2 block">Legal Name</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-brand-800 border-none px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-accent-500 transition-shadow rounded-none font-medium placeholder:text-brand-600" placeholder="Jane Doe" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-brand-400 mb-2 block">Correspondence Email</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-brand-800 border-none px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-accent-500 transition-shadow rounded-none font-medium placeholder:text-brand-600" placeholder="jane.doe@example.com" />
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-brand-400 mb-2 block">Contact Number</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-brand-800 border-none px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-accent-500 transition-shadow rounded-none font-medium placeholder:text-brand-600" placeholder="Telephone" />
                     </div>
                     <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-brand-400 mb-2 block">Date of Occasion</label>
                        <input required type="date" name="event_date" value={formData.event_date} onChange={handleChange} className="w-full bg-brand-800 border-none px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-accent-500 transition-shadow rounded-none font-medium text-brand-300" />
                     </div>
                   </div>

                   <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-brand-400 mb-2 block">Arrangement Details</label>
                      <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full bg-brand-800 border-none px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-accent-500 transition-shadow rounded-none resize-none font-medium placeholder:text-brand-600 leading-relaxed" placeholder="Chronicle the nature of your event..." />
                   </div>

                   {submitStatus === 'error' && <p className="text-red-400 text-sm font-bold bg-red-950 p-4 border border-red-900">Communication faltered. Please attempt submission again.</p>}
                   
                   <button type="submit" className="w-full py-5 bg-accent-600 text-white font-bold uppercase tracking-widest text-sm flex justify-center items-center gap-3 hover:bg-accent-700 transition-colors shadow-xl">
                     Transmit Request <Send className="w-4 h-4" />
                   </button>
                 </form>
               )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
