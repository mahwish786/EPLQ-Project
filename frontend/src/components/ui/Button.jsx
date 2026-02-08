'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ children, onClick, variant = 'primary', isLoading, className = '', type="button" }) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all rounded-lg focus:outline-none";
  const variants = {
    primary: "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-primary-500/50 hover:scale-[1.01]",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]} ${className} ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
    >
      {isLoading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</> : children}
    </motion.button>
  );
};

export default Button;