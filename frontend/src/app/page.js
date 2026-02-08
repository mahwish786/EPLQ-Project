'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowRight, UserPlus, Search, Navigation } from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/ui/Button";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-x-hidden font-sans">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center relative px-4 pt-20 pb-32">
        {/* Animated Background Blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center max-w-4xl w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-xs md:text-sm mb-8 border border-blue-100 shadow-sm">
            <Shield size={14} className="md:w-4 md:h-4" />
            EPLQ Privacy Protocol v1.0
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
            Find Locations. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              Without Being Found.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            The world's first privacy-preserving location search. Find
            hospitals, ATMs, and safety zones while your data stays encrypted.
          </p>

          <div className="flex justify-center px-4 w-full">
            <Link href="/signup" className="w-full md:w-auto">
              <Button className="w-full md:w-auto px-10 py-5 text-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center rounded-2xl">
                Let's Get Started <ArrowRight className="ml-3" size={24} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-slate-500 text-lg">
              Secure access in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserPlus size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                1. Create Account
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Sign up anonymously. We only verify you are human, not who you
                are.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                2. Search Securely
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Look for ATMs or Hospitals. Your query is encrypted before it
                leaves your device.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Navigation size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                3. Navigate
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Get precise location data and directions without being tracked
                by ads.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-6 border-t border-slate-200 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6">
          <p className="text-slate-500 text-sm font-medium">
            © 2026 EPLQ Secure Systems.
          </p>

          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-slate-400 text-xs font-medium">
              System Operational • Zero Knowledge Architecture
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;