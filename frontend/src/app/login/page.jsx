'use client';
import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import api from '@/services/api';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await api.get('/auth/check-auth');
        router.push('/user/dashboard');
      } catch (error) {
        // Do nothing
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);
    try {
      await api.post('/auth/login', { email, password });
      toast.success("Welcome back!");
      setTimeout(() => {
        router.push('/user/dashboard');
      }, 1000);
    } catch (error) {
      console.log("Login Error Details:", error.response);
      let displayMessage = "Something went wrong. Please try again.";
      if (error.response) {
        if (error.response.data && error.response.data.message) {
           displayMessage = error.response.data.message;
        } else if (error.response.status === 404) {
           displayMessage = "No account found with this email.";
        } else if (error.response.status === 401) {
           displayMessage = "Invalid credentials.";
        } else if (error.response.status === 400) {
           displayMessage = "Please fill in all fields.";
        } else if (error.response.status === 500) {
           displayMessage = "Server error. Please check your connection.";
        }
      } else if (error.request) {
        displayMessage = "Network error. Cannot connect to server.";
      }
      toast.error(displayMessage); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-6 md:p-10 rounded-2xl shadow-2xl border border-slate-100 mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-blue-100 text-blue-600">
               <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">User Sign In</h2>
            <p className="text-slate-500 mt-2">Access your secure search history</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="name@example.com" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="••••••••" required />
            </div>
            <Button type="submit" isLoading={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white">
              Sign In <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3 text-center">
            <Link href="/admin-login" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
              Need Admin Access? Go to Admin Portal
            </Link>
            <div className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link href="/signup" className="font-bold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;