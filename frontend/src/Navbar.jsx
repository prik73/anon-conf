import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  User, 
  Settings, 
  LogOut, 
  MessageCircle 
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md z-50 py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold font-mono text-gray-800">
          SECRETS
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/messages" 
            className="p-2 hover:bg-purple-100 rounded-full transition-colors"
          >
            <MessageCircle className="h-5 w-5 text-gray-600" />
          </Link>
          
          <Link 
            to="/profile" 
            className="p-2 hover:bg-purple-100 rounded-full transition-colors"
          >
            <User className="h-5 w-5 text-gray-600" />
          </Link>
          
          <Link 
            to="/settings" 
            className="p-2 hover:bg-purple-100 rounded-full transition-colors"
          >
            <Settings className="h-5 w-5 text-gray-600" />
          </Link>
          
          <button 
            onClick={() => {/* Add logout logic */}}
            className="p-2 hover:bg-red-100 rounded-full transition-colors"
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;