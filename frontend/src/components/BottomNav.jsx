import React from 'react';
import { Home, Shield, User } from 'lucide-react';

// --- Bottom Navigation Component ---
// A simple, clean tab bar for navigating the main sections of the app.
const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'features', icon: Shield, label: 'Features' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow-t-lg border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center w-full pt-3 pb-2 transition-colors duration-200 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
