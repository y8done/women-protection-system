import React from 'react';
import { Map, Shield, Activity, PhoneCall, Timer } from 'lucide-react';

// --- Features Tab Component ---
// This acts as a menu for the user to select different safety utilities.
const FeaturesTab = ({ onShowHotspotFinder, onShowTrackJourney }) => {

  // --- SAFE HAVENS LOGIC ---
  const findEmergencyHelp = (type) => {
    const query = encodeURIComponent(type);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">Safety Utilities</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">Essential tools to help you navigate safely.</p>
      
      <div className="space-y-4">
        
        {/* Track My Journey */}
        <button 
          onClick={onShowTrackJourney}
          className="w-full flex items-center p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-transparent hover:border-green-200 dark:hover:border-green-800 transition-all group"
        >
          <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg group-hover:scale-110 transition-transform">
            <Timer className="text-green-600 dark:text-green-400" size={24} />
          </div>
          <div className="ml-4 text-left">
            <h3 className="font-bold text-gray-800 dark:text-white">Track My Journey</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Set a safety timer. Alerts contacts if you don't check in.</p>
          </div>
        </button>

        {/* Hotspot Finder */}
        <button 
          onClick={onShowHotspotFinder}
          className="w-full flex items-center p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all group"
        >
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg group-hover:scale-110 transition-transform">
            <Map className="text-indigo-600 dark:text-indigo-400" size={24} />
          </div>
          <div className="ml-4 text-left">
            <h3 className="font-bold text-gray-800 dark:text-white">Hotspot Finder</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">View and report unsafe areas on the map.</p>
          </div>
        </button>

        {/* Nearest Police Station */}
        <button 
          onClick={() => findEmergencyHelp('Police Station near me')}
          className="w-full flex items-center p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
        >
           <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:scale-110 transition-transform">
            <Shield className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div className="ml-4 text-left">
            <h3 className="font-bold text-gray-800 dark:text-white">Nearest Police Station</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Instantly locate the closest law enforcement.</p>
          </div>
        </button>

        {/* Nearest Hospital */}
        <button 
          onClick={() => findEmergencyHelp('Hospital or Clinic near me')}
          className="w-full flex items-center p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-transparent hover:border-red-200 dark:hover:border-red-800 transition-all group"
        >
           <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-lg group-hover:scale-110 transition-transform">
            <Activity className="text-red-600 dark:text-red-400" size={24} />
          </div>
          <div className="ml-4 text-left">
            <h3 className="font-bold text-gray-800 dark:text-white">Nearest Hospital</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Find medical assistance in your immediate area.</p>
          </div>
        </button>

        {/* Women's Helpline */}
        <a 
          href="tel:1091" 
          className="w-full flex items-center p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl shadow-md hover:shadow-lg border border-purple-200 dark:border-purple-800 transition-all group"
        >
           <div className="p-3 bg-purple-200 dark:bg-purple-800/50 rounded-lg group-hover:scale-110 transition-transform">
            <PhoneCall className="text-purple-700 dark:text-purple-300" size={24} />
          </div>
          <div className="ml-4 text-left">
            <h3 className="font-bold text-purple-900 dark:text-purple-100">National Women Helpline</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">Tap to call 1091 immediately.</p>
          </div>
        </a>

      </div>
    </div>
  );
};

export default FeaturesTab;