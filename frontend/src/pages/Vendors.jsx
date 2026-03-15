import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import API_URL from '../config';
import { Search, MapPin, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchVendors = () => {
    setLoading(true);
    let url = new URL(`${API_URL}/api/vendors`);
    if (search) url.searchParams.append('search', search);
    if (category) url.searchParams.append('category', category);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setVendors(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchVendors();
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVendors();
  };

  const categoriesList = ['Photographers', 'Planners', 'Decorators', 'Makeup Artists', 'Venues', 'Caterers'];

  return (
    <div className="bg-brand-50 min-h-screen pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Sleek Sidebar Filter */}
        <div className="lg:w-1/4 shrink-0">
          <div className="sticky top-32">
             <div className="flex items-center gap-3 mb-8">
               <SlidersHorizontal className="w-6 h-6 text-brand-900" />
               <h2 className="font-serif text-3xl font-black text-brand-900">Filters.</h2>
             </div>
             
             <form onSubmit={handleSearch} className="mb-10">
               <label className="text-xs uppercase tracking-widest font-bold text-brand-500 mb-3 block">Search Directory</label>
               <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Name or keyword..." 
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className="w-full bg-white border-b-2 border-brand-200 py-3 pr-10 focus:outline-none focus:border-brand-900 transition-colors text-brand-900 font-medium placeholder:text-brand-300 rounded-none"
                 />
                 <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent text-brand-900 hover:text-accent-500">
                   <Search className="w-5 h-5" />
                 </button>
               </div>
             </form>

             <div>
               <label className="text-xs uppercase tracking-widest font-bold text-brand-500 mb-4 block">Categories</label>
               <ul className="space-y-3">
                 <li>
                    <button 
                      onClick={() => setCategory('')} 
                      className={`text-left w-full text-lg font-serif transition-colors ${category === '' ? 'text-accent-600 font-bold italic translate-x-1' : 'text-brand-600 hover:text-brand-900 hover:translate-x-1'}`}
                    >
                      All Disciplines
                    </button>
                 </li>
                 {categoriesList.map(cat => (
                   <li key={cat}>
                     <button 
                      onClick={() => setCategory(cat)} 
                      className={`text-left w-full text-lg font-serif transition-colors ${category === cat ? 'text-accent-600 font-bold italic translate-x-1' : 'text-brand-600 hover:text-brand-900 hover:translate-x-1'}`}
                    >
                      {cat}
                    </button>
                   </li>
                 ))}
               </ul>
             </div>
          </div>
        </div>

        {/* Studio Grid Presentation */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center py-32">
              <div className="w-16 h-16 border-t-4 border-brand-900 border-solid rounded-full animate-spin"></div>
            </div>
          ) : vendors.length === 0 ? (
            <div className="text-center py-32 px-6 border border-brand-200 bg-white">
               <h3 className="font-serif text-3xl font-bold text-brand-900 mb-4">No results found</h3>
               <p className="text-brand-500 font-light text-lg">Your inquiry returned zero artisans. Please broaden your scope.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
              {vendors.map(vendor => (
                <div key={vendor.id} className="group flex flex-col cursor-pointer">
                  <div className="relative h-[450px] overflow-hidden mb-6 block">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/20 transition-colors duration-500" />
                    
                    {/* Hover floating button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                       <Link to={`/vendors/${vendor.id}`} className="bg-white text-brand-900 rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:bg-accent-500 hover:text-white transition-colors transform group-hover:-translate-y-2">
                         <ArrowUpRight className="w-6 h-6" />
                       </Link>
                    </div>

                    <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                       <span className="px-3 py-1 bg-white/90 backdrop-blur text-brand-900 text-[10px] uppercase font-bold tracking-widest">{vendor.category}</span>
                    </div>
                  </div>
                  
                  <div>
                     <h3 className="font-serif text-2xl font-bold text-brand-900 mb-2 group-hover:text-accent-600 transition-colors">{vendor.name}</h3>
                     <div className="flex items-center gap-2 text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">
                       <MapPin className="w-4 h-4 text-brand-300" /> {vendor.location}
                     </div>
                     <p className="text-brand-600 font-light text-sm line-clamp-2 leading-loose">{vendor.description}</p>
                     
                     <div className="mt-5 border-t border-brand-200 pt-4 flex justify-between items-center text-sm">
                       <span className="font-serif italic font-bold text-brand-900">{vendor.price_range}</span>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
