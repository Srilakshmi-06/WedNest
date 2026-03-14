import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, MapPin } from 'lucide-react';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/vendors')
      .then(res => res.json())
      .then(data => setFeatured(data.slice(0, 4)))
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Avant-Garde Split Hero */}
      <section className="relative min-h-[95vh] lg:min-h-screen flex flex-col lg:flex-row overflow-hidden bg-brand-50">
        
        {/* Left Side Content */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 pt-32 lg:pt-0 z-10 w-full lg:w-1/2 static lg:absolute lg:h-full pb-16 lg:pb-0">
          <p className="text-accent-600 font-bold uppercase tracking-[0.2em] mb-4 md:mb-8 text-sm md:text-xs relative">
            <span className="inline-block w-8 md:w-12 h-px bg-accent-600 align-middle mr-4"></span>
            Elevated Aesthetics
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-brand-900 leading-[0.9] mb-8">
            Curate <br/><span className="text-brand-500 italic font-light">Your</span><br/> Legacy.
          </h1>
          <p className="text-brand-600 text-lg md:text-xl font-light max-w-md mb-12 leading-relaxed">
            Step away from the ordinary. Discover venues, cafeterias, and artisans that breathe life into your most cinematic moments.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link to="/vendors" className="group flex items-center gap-4 bg-brand-900 text-white px-8 py-4 w-full sm:w-auto text-sm uppercase tracking-widest font-bold hover:bg-accent-600 transition-colors">
              Begin Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Side Image Collage Layout */}
        <div className="lg:w-1/2 w-full lg:ml-auto h-[60vh] lg:h-screen relative flex bg-brand-100">
           {/* Primary Hero Image */}
           <div className="absolute top-0 right-0 w-[85%] lg:w-[90%] h-full">
             <img 
               src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1400" 
               alt="Cute couple running away laughing" 
               className="w-full h-full object-cover grayscale-[20%] sepia-[10%] contrast-110"
             />
             <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply" />
           </div>
           
           {/* Overlapping Floating Image */}
           <div className="absolute bottom-10 -left-6 lg:left-[-10%] w-[55%] md:w-[40%] lg:w-[45%] h-[40%] md:h-[50%] lg:h-[40%] border-[10px] md:border-[16px] border-brand-50 shadow-2xl z-20 overflow-hidden transform -translate-y-8 lg:translate-y-0">
             <img 
               src="https://images.unsplash.com/photo-1542042457-3f86e06dd425?auto=format&fit=crop&q=80&w=800" 
               alt="Romantic outdoor lights string cafe" 
               className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
             />
           </div>
        </div>
      </section>

      {/* Moodboard / Categories Section */}
      <section className="bg-brand-900 text-brand-50 py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-6xl font-black mb-6">Atmospheres <span className="italic font-light text-brand-400">&</span> Visions.</h2>
              <p className="text-brand-300 font-light text-xl">The finest components for your moodboard. From breathtaking photography spots to avant-garde caterers.</p>
            </div>
            <Link to="/vendors" className="text-accent-400 uppercase tracking-widest text-sm font-bold border-b border-accent-400 pb-1 hover:text-white transition-colors whitespace-nowrap">View All Categories</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 h-auto lg:h-[600px]">
            {/* Category block 1 */}
            <Link to="/vendors?category=Venues" className="relative group overflow-hidden block h-[300px] lg:h-full lg:col-span-2">
              <img src="https://images.unsplash.com/photo-1505934333218-8fe25ff4db1e?auto=format&fit=crop&q=80&w=1200" alt="Venue" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 origin-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="text-accent-400 uppercase tracking-widest text-xs font-bold mb-2 block">Immersive</span>
                <h3 className="font-serif text-3xl font-bold text-white">Venues & Cafeterias</h3>
              </div>
            </Link>

            {/* Category column */}
            <div className="grid grid-rows-2 gap-4 md:gap-8 lg:col-span-1 h-[600px] lg:h-full">
               <Link to="/vendors?category=Photographers" className="relative group overflow-hidden block h-full">
                  <img src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800" alt="Photographer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-serif text-xl font-bold text-white mb-1">Photography</h3>
                    <p className="text-brand-300 text-sm">Capture raw emotion</p>
                  </div>
               </Link>
               <Link to="/vendors?category=Caterers" className="relative group overflow-hidden block h-full">
                  <img src="https://images.unsplash.com/photo-1464366400600-7168b849cb32?auto=format&fit=crop&q=80&w=800" alt="Caterers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-serif text-xl font-bold text-white mb-1">Caterers & Cafés</h3>
                    <p className="text-brand-300 text-sm">Artisanal flavors</p>
                  </div>
               </Link>
            </div>

            {/* Category block 3 */}
             <div className="grid gap-4 md:gap-8 lg:col-span-1 h-[300px] lg:h-full bg-brand-800 p-8 flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none transition-opacity group-hover:opacity-20">
                  <img src="https://images.unsplash.com/photo-1507504031003-b417244a0447?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="texture" />
                </div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto bg-brand-700 rounded-full flex items-center justify-center mb-6">
                    <span className="text-accent-400 font-serif text-2xl italic">+</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-4">Planners, Decor, & Artistry</h3>
                  <Link to="/vendors" className="text-sm border-b uppercase tracking-widest font-semibold border-white text-white hover:text-accent-400 hover:border-accent-400 transition-colors">See the Gallery</Link>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Artisans Section (Featured) */}
      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <span className="text-accent-600 font-bold uppercase tracking-[0.2em] mb-4 text-xs block">Meticulously Selected</span>
             <h2 className="font-serif text-5xl md:text-6xl font-black text-brand-900">The Artisans.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {featured.map((vendor, idx) => (
              <div key={vendor.id} className={`group flex flex-col ${idx % 2 !== 0 ? 'md:-mt-16 lg:-mt-24' : ''}`}>
                <div className="relative overflow-hidden mb-6 h-[400px] lg:h-[500px]">
                   <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]" />
                   <div className="absolute top-4 left-4 bg-brand-900 text-white px-3 py-1 text-xs uppercase tracking-widest font-bold">
                     {vendor.category}
                   </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-3xl font-bold text-brand-900 group-hover:text-accent-600 transition-colors">{vendor.name}</h3>
                  <div className="flex items-center gap-2 text-brand-500 text-sm font-semibold uppercase tracking-wider">
                     <MapPin className="w-4 h-4 text-accent-500" /> {vendor.location}
                  </div>
                  <p className="text-brand-600 font-light line-clamp-2 mt-2 leading-relaxed">{vendor.description}</p>
                  <Link to={`/vendors/${vendor.id}`} className="mt-4 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-900 group-hover:text-accent-600 transition-colors">
                    Explore Profile <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
