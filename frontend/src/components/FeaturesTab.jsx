import React from 'react';
import { Map, Zap } from 'lucide-react';

// --- Features Tab Component ---
// This now acts as a menu for the user to select different utilities.
const FeaturesTab = ({ onShowHotspotFinder }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Utilities</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">Tools to help you stay safe.</p>
      
      <div className="space-y-4">
        <button 
          onClick={onShowHotspotFinder}
          className="w-full flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Map className="text-blue-600 dark:text-blue-500" />
          <span className="ml-4 font-semibold text-gray-700 dark:text-gray-200">Hotspot Finder</span>
        </button>
        <button className="w-full flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors opacity-50 cursor-not-allowed">
          <Zap className="text-blue-600 dark:text-blue-500" />
          <span className="ml-4 font-semibold text-gray-700 dark:text-gray-200">Nearby Police Stations (Coming Soon)</span>
        </button>
      </div>
    </div>
  );
};

export default FeaturesTab;

