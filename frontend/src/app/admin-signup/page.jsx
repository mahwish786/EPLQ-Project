'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import api from '@/services/api';

const AdminSignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await api.get('/admin/check-auth');
        router.replace('/admin/dashboard');
      } catch (error) {
        // Do nothing
      }
    };
    checkSession();
  }, [router]);

  const handleSignup = async (e) => {
    e.preventDefault();
    toast.dismiss();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await api.post('/admin/register', { email, password });
      toast.success("Account created successfully!");
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-slate-900 text-white">
               <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Admin Registration</h2>
            <p className="text-slate-500 mt-2">Join the secure control network</p>
          </div>
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="name@example.com" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="At least 6 chars" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Repeat password" required />
            </div>
            <Button type="submit" isLoading={loading} className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white">
              Register <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <div className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/admin-login" className="font-bold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2">
                Sign In here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignupPage;