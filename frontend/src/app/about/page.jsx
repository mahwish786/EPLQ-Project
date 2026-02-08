'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Lock, Search, Database, ShieldCheck } from 'lucide-react';

const About = () => {
  const steps = [
    {
      icon: Search,
      title: "1. Encrypted Query",
      desc: "When you search for a location, your query is encrypted locally on your device before it ever touches the internet."
    },
    {
      icon: Database,
      title: "2. Privacy-Preserving Index",
      desc: "Our server uses a 'Spatial Tree Index' to search encrypted data. It finds matches without ever decrypting the coordinates."
    },
    {
      icon: Lock,
      title: "3. Secure Result",
      desc: "The matched location data is sent back to you. Your device (and only your device) has the key to decrypt and view it."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm mb-4">
            <ShieldCheck size={16} />
            EPLQ Protocol
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            How We Protect Your Location
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Most apps track where you are. We don't. We built a system where you can find what you need without giving up your privacy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden group"
            >
              <div className="absolute -right-4 -top-4 text-9xl font-bold text-slate-50 group-hover:text-blue-50 transition-colors select-none">
                {index + 1}
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
                  <step.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;