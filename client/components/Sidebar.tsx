
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mic2, 
  Wand2, 
  CreditCard, 
  UserCircle,
  Building2,
  LogOut,
  Waves,
  X
} from 'lucide-react';
import { useAuth } from '../App';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'My Voices', icon: Mic2, path: '/voices' },
    { name: 'Generate Speech', icon: Wand2, path: '/generate' },
    { name: 'Subscription', icon: CreditCard, path: '/pricing' },
    { name: 'Enterprise', icon: Building2, path: '/enterprise' },
    { name: 'Profile', icon: UserCircle, path: '/profile' },
  ];

  const sidebarBody = (
    <>
      <div className="p-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Waves className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">VoxClone AI</span>
        </div>
        <button
          onClick={onCloseMobile}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 md:hidden"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-1 md:mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onCloseMobile}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-indigo-50 text-indigo-600 font-medium' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}
            `}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <button
          onClick={() => {
            onCloseMobile();
            logout();
          }}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex md:flex-col">
        {sidebarBody}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            className="absolute inset-0 bg-slate-900/40"
            onClick={onCloseMobile}
            aria-label="Close sidebar backdrop"
          />
          <aside className="relative z-10 w-[85%] max-w-xs h-full bg-white border-r border-slate-200 flex flex-col">
            {sidebarBody}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
