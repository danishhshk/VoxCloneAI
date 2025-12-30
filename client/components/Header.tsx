
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../App';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10">
      <div className="flex items-center gap-4 md:hidden">
         <Menu className="w-6 h-6 text-slate-600" />
         <span className="font-bold text-lg text-indigo-600">VoxClone</span>
      </div>

      <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search resources..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-4 mr-4">
        <NavLink to="/pricing" className="text-sm text-slate-600 hover:text-indigo-600">Pricing</NavLink>
        <NavLink to="/enterprise" className="text-sm text-slate-600 hover:text-indigo-600">Enterprise</NavLink>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
            <p className="text-xs text-indigo-600 font-medium capitalize">{user?.plan} Plan</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff`} 
              alt="Profile" 
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
