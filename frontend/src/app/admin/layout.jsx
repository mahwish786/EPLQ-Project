'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, PlusCircle, LogOut, ShieldCheck, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/services/api';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        await api.get('/admin/check-auth');
        setIsChecking(false);
      } catch (error) {
        router.replace('/admin-login');
      }
    };
    verifySession();
  }, [router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await api.get('/admin/logout');
      toast.success('Logged out successfully');
      router.replace('/admin-login');
    } catch (error) {
      router.push('/admin-login');
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white z-50 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 text-blue-400">
           <ShieldCheck size={24} />
           <span className="font-bold text-lg tracking-wide text-white">EPLQ Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-300 hover:text-white">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-50 
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="hidden md:block p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 text-blue-400 mb-1">
             <ShieldCheck size={28} />
             <span className="font-bold text-xl tracking-wide text-white">EPLQ Admin</span>
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold ml-1">Secure Control Panel</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 mt-14 md:mt-0"> 
          <Link 
            href="/admin/dashboard" 
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium
              ${pathname === '/admin/dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
            `}
          >
            <LayoutDashboard className="w-5 h-5" /> 
            Dashboard
          </Link>

          <Link 
            href="/admin/add-place" 
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium
              ${pathname === '/admin/add-place' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
            `}
          >
            <PlusCircle className="w-5 h-5" /> 
            Add Location
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-700 bg-slate-900">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full rounded-lg transition-all font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen w-full pt-16 md:pt-0"> 
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;