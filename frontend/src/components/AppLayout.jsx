import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Closes mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-50 selection:bg-accent-300 selection:text-white">
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-900/95 backdrop-blur-xl shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group z-50 relative">
            <span className={`font-serif font-black text-2xl tracking-tighter ${isScrolled || mobileMenuOpen ? 'text-white' : 'text-brand-900 drop-shadow-md'}`}>
               Wed<span className="text-accent-500">Nest.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/vendors" className={`text-sm font-semibold uppercase tracking-widest hover:text-accent-400 transition-colors ${isScrolled ? 'text-brand-200' : 'text-brand-800'}`}>The Vendors</Link>
            {user ? (
              <>
                <Link to="/dashboard" className={`text-sm font-semibold uppercase tracking-widest hover:text-accent-400 transition-colors ${isScrolled ? 'text-brand-200' : 'text-brand-800'}`}>My Plannings</Link>
                <button onClick={logout} className="px-6 py-2 border-2 border-accent-500 text-accent-500 rounded-none text-sm font-bold uppercase hover:bg-accent-500 hover:text-white transition-all">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className={`text-sm font-semibold uppercase tracking-widest hover:text-accent-400 transition-colors ${isScrolled ? 'text-brand-200' : 'text-brand-800'}`}>Sign In</Link>
                <Link to="/signup" className="px-6 py-3 bg-accent-600 text-white rounded-none text-sm font-bold uppercase tracking-widest hover:bg-brand-900 hover:text-accent-300 transition-colors shadow-xl">Get Started</Link>
              </>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden z-50 p-2 relative ${isScrolled || mobileMenuOpen ? 'text-white' : 'text-brand-900'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-brand-900 z-40 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <nav className="flex flex-col items-center gap-8 text-white">
            <Link to="/" className="text-2xl font-serif hover:text-accent-400">Home</Link>
            <Link to="/vendors" className="text-2xl font-serif hover:text-accent-400">Discover Vendors</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-2xl font-serif hover:text-accent-400">Dashboard</Link>
                <button onClick={logout} className="text-2xl font-serif text-accent-500 mt-4">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-2xl font-serif hover:text-accent-400">Sign In</Link>
                <Link to="/signup" className="text-2xl font-serif text-accent-400 mt-4">Start Planning</Link>
              </>
            )}
           </nav>
        </div>
      </header>
      
      <main className="flex-1 w-full bg-brand-50">
        <Outlet />
      </main>

      <footer className="bg-brand-900 text-brand-300 py-20 mt-auto border-t-[10px] border-accent-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-serif font-black text-3xl text-white mb-6">Wed<span className="text-accent-500">Nest.</span></h3>
            <p className="text-brand-400 leading-relaxed text-sm">Curating extraordinary celebrations with the most distinguished professionals and aesthetic venues.</p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/vendors" className="hover:text-accent-400 transition-colors">Venu Galleries</Link></li>
              <li><Link to="/vendors" className="hover:text-accent-400 transition-colors">Find a Planner</Link></li>
              <li><Link to="/vendors" className="hover:text-accent-400 transition-colors">Culinary Experiences</Link></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Company</h4>
             <ul className="space-y-4 text-sm font-medium">
               <li><a href="#" className="hover:text-accent-400 transition-colors">Our Ethos</a></li>
               <li><a href="#" className="hover:text-accent-400 transition-colors">Careers</a></li>
               <li><a href="#" className="hover:text-accent-400 transition-colors">Press</a></li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20 pt-8 border-t border-brand-800 flex flex-col md:flex-row justify-between items-center text-xs tracking-wider">
          <p>© {new Date().getFullYear()} WEDNEST EXPERIENCES. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white">INSTAGRAM</a>
             <a href="#" className="hover:text-white">PINTEREST</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
