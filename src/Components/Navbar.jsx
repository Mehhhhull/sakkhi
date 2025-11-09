import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../Context/AuthContext'
import UserMenu from './Auth/UserMenu'
import Login from './Auth/Login'
import Signup from './Auth/Signup'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const { user } = useAuth()

  return (
    <nav className="bg-[#1C1B2E] w-full h-[72px] shadow-lg flex items-center justify-between px-4 md:px-12 fixed top-0 left-0 z-50">
      {/* Logo and tagline-Sakkhi */}
      <Link to="/">
        <span className="font-semibold text-2xl text-[#F9CEDF]">Sakkhi</span>
      </Link>

      {/* Navbar for Desktop specific and here there are links to different pages too */}
      <div className="hidden md:flex items-center gap-4 lg:gap-6">
        <Link
          to="/suno-khud-ko"
          className="py-1 px-3 text-lg font-light text-white hover:text-black rounded-2xl hover:bg-pink-200 transition duration-300"
        >
          Suno Khud Ko
        </Link>
        <Link
          to="/my-reflexion"
          className="py-1 px-3 text-lg font-light text-white hover:text-black rounded-2xl hover:bg-pink-200 transition duration-300"
        >
          My Reflection
        </Link>
        <Link
          to="/soothe-space"
          className="py-1 px-3 text-lg font-light text-white hover:text-black rounded-2xl hover:bg-pink-200 transition duration-300"
        >
          Soothe Space
        </Link>
        <Link
          to="/circle-of-one"
          className="py-1 px-3 text-lg font-light text-white hover:text-black rounded-2xl hover:bg-pink-200 transition duration-300"
        >
          Circle Of One
        </Link>
        <Link
          to="/bharosa-library"
          className="py-1 px-3 text-lg font-light text-white hover:text-black rounded-2xl hover:bg-pink-200 transition duration-300"
        >
          Bharosa Library
        </Link>
        
        {user ? (
          <UserMenu />
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setShowLogin(true)}
              className="py-1 px-4 text-lg font-light text-white hover:text-black rounded-2xl hover:bg-pink-200 transition duration-300"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignup(true)}
              className="py-1 px-4 text-lg font-light bg-pink-200 text-black rounded-2xl hover:bg-pink-300 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Mobile specific navbar */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl focus:outline-none">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Clicking the navbar opens it and closes it  :Mobile optimized*/}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1C1B2E] flex flex-col items-start px-4 py-4 gap-2 shadow-lg md:hidden z-40">
          <Link
            to="/suno-khud-ko"
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-black hover:bg-pink-200 px-4 py-2 rounded transition w-full"
          >
            Suno Khud Ko
          </Link>
          <Link
            to="/my-reflexion"
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-black hover:bg-pink-200 px-4 py-2 rounded transition w-full"
          >
            My Reflexion
          </Link>
          <Link
            to="/soothe-space"
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-black hover:bg-pink-200 px-4 py-2 rounded transition w-full"
          >
            Soothe Space
          </Link>
          <Link
            to="/circle-of-one"
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-black hover:bg-pink-200 px-4 py-2 rounded transition w-full"
          >
            Circle Of One
          </Link>
          <Link
            to="/bharosa-library"
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-black hover:bg-pink-200 px-4 py-2 rounded transition w-full"
          >
            Bharosa Library
          </Link>
          
          {user ? (
            <div className="w-full pt-2 border-t border-gray-600">
              <UserMenu />
            </div>
          ) : (
            <div className="flex gap-2 w-full pt-2 border-t border-gray-600">
              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsOpen(false);
                }}
                className="flex-1 py-2 px-4 text-white hover:text-black rounded-lg hover:bg-pink-200 transition"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowSignup(true);
                  setIsOpen(false);
                }}
                className="flex-1 py-2 px-4 bg-pink-200 text-black rounded-lg hover:bg-pink-300 transition"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </nav>
  )
}

export default Navbar