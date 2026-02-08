'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, LogOut, Menu, X } from 'lucide-react';
import Button from './ui/Button'; 

const Navbar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        
        <Link href="/" className="flex items-center gap-2 group">
          <Image 
            src="/logo.png" 
            alt="EPLQ Secure"
            width={160} 
            height={50} 
            className="object-contain h-10 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {onLogout ? (
             <button 
               onClick={onLogout}
               className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-semibold transition-colors border border-red-100"
             >
               <LogOut size={18} />
               Sign Out
             </button>
          ) : (
            <>
              <Link href="/login">
                <button className="text-slate-700 font-bold hover:text-blue-600 px-4 py-2 transition-colors">
                  Log In
                </button>
              </Link>
              
              <Link href="/admin-login">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg text-sm px-4 py-2.5">
                  <Lock size={14} className="mr-2 inline" />
                  Admin
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 px-4 flex flex-col gap-3 animate-fade-in-down">
          {onLogout ? (
             <button 
               onClick={() => { onLogout(); setIsMenuOpen(false); }}
               className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl font-bold border border-red-100"
             >
               <LogOut size={18} />
               Sign Out
             </button>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full text-center text-slate-700 font-bold bg-slate-50 hover:bg-slate-100 py-3 rounded-xl transition-colors border border-slate-100">
                  Log In
                </button>
              </Link>
              
              <Link href="/admin-login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 rounded-xl shadow-lg">
                  <Lock size={16} />
                  Admin Portal
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;