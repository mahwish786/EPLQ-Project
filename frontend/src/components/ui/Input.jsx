import React from 'react';

const Input = ({ label, type = "text", name, value, onChange, placeholder }) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
      />
    </div>
  );
};

export default Input;