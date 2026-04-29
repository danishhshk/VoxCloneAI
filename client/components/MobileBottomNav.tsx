import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Mic2, Wand2, CreditCard, UserCircle } from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const items = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Voices', path: '/voices', icon: Mic2 },
    { name: 'Generate', path: '/generate', icon: Wand2 },
    { name: 'Plans', path: '/pricing', icon: CreditCard },
    { name: 'Profile', path: '/profile', icon: UserCircle }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur px-2 py-1">
      <ul className="grid grid-cols-5 gap-1">
        {items.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center rounded-lg py-2 text-[11px] font-semibold transition-colors
                ${isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'}
              `}
            >
              <item.icon className="w-4 h-4 mb-1" />
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;