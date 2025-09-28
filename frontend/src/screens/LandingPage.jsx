import React, { useState } from 'react';
import config from '../constants.js';
import { BuildingStorefrontIcon, UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop')` }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 shadow-lg">
          Welcome to FlavorFind
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto shadow-lg">
          Discover amazing local restaurants, or showcase your own culinary creations to the world.
        </p>

        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Get Started</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105"
            >
              Login / Sign Up
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-600">
            <p className="mb-2">Or try a demo account:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <button onClick={() => onLogin('diner@example.com', 'password')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">Diner</button>
              <button onClick={() => onLogin('owner@example.com', 'password')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">Owner</button>
            </div>
          </div>
          <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center text-blue-600 hover:text-blue-800 transition">
            <ShieldCheckIcon className="w-5 h-5 mr-2" />
            Go to Admin Panel
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
