import React from 'react';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing Page/LandingPage';
import SunoKhudKo from './Pages/SunoKhudKo/SunoKhudKo.jsx';
import MyReflexion from './Pages/My Reflection/MyReflection.jsx';
import SootheSpace from './Pages/SootheSpace/SootheSpace.jsx';
import CircleOfOne from './Pages/Circle Of Life/CircleOfLife.jsx';
import BharosaLibrary from './Pages/Bharosa Library/BharosaLibrary.jsx';
import AdminDashboard from './Pages/Admin/AdminDashboard.jsx';
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/suno-khud-ko" element={<SunoKhudKo />} />
        <Route path="/my-reflexion" element={<MyReflexion />} />
        <Route path="/soothe-space" element={<SootheSpace />} />
        <Route 
          path="/circle-of-one" 
          element={
            <ProtectedRoute message="Sign in to join Circle of One and share with the community">
              <CircleOfOne />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/bharosa-library" 
          element={
            <ProtectedRoute message="Sign in to access Bharosa Library and contribute">
              <BharosaLibrary />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute message="Sign in to access Admin Dashboard">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
};

export default App;