import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ baseURL: config.BACKEND_URL, appId: config.APP_ID });

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful. Checking for active session...');
        try {
          const sessionUser = await manifest.from('User').me();
          if (sessionUser) {
            setUser(sessionUser);
            setCurrentScreen('dashboard');
            console.log('✅ [APP] Active session found for:', sessionUser.email);
          }
        } catch (error) {
          setUser(null);
          console.log('🔵 [APP] No active session found.');
        }
      } else {
        console.error('❌ [APP] Backend connection failed. App may not function correctly.');
        console.error('❌ [APP] Connection error:', connectionResult.error);
      }
    };
    checkConnectionAndSession();
  }, []);

  const login = async (email, password) => {
    try {
      await manifest.login(email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setCurrentScreen('landing');
  };

  const getRestaurants = async () => {
    const response = await manifest.from('Restaurant').find({ include: ['owner'] });
    return response.data;
  };

  const getMenuItems = async (restaurantId) => {
    const response = await manifest.from('MenuItem').find({ filter: { restaurantId } });
    return response.data;
  };

  const createRestaurant = async (restaurantData) => {
    return await manifest.from('Restaurant').create(restaurantData);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}>
          <span className="sr-only">{backendConnected ? 'Backend Connected' : 'Backend Disconnected'}</span>
        </div>
        <p className={`text-sm font-medium ${backendConnected ? 'text-gray-700' : 'text-red-700'}`}>
          {backendConnected ? 'Connected' : 'Disconnected'}
        </p>
      </div>
      
      {currentScreen === 'landing' || !user ? (
        <LandingPage onLogin={login} />
      ) : (
        <DashboardPage 
          user={user} 
          onLogout={logout} 
          manifest={manifest}
        />
      )}
    </div>
  );
}

export default App;
