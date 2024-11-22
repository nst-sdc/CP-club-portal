import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, LogOut, Users } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8" />
            <span className="font-bold text-xl">NST X ADYPU ICPC Club</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/students"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/students'
                  ? 'bg-indigo-700'
                  : 'hover:bg-indigo-500'
              }`}
            >
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Students</span>
              </div>
            </Link>
            
            {isAuthenticated && (
              <button
                onClick={logout}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}