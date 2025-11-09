import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

const ProtectedRoute = ({ children, message = "Please sign in to access this feature" }) => {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          
          {showLogin && (
            <Login
              onClose={() => {}}
              onSwitchToSignup={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
            />
          )}

          {showSignup && (
            <Signup
              onClose={() => {}}
              onSwitchToLogin={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
            />
          )}
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
