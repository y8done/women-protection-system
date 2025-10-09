import React from 'react';
import MapComponent from './MapComponent';

// --- Home Tab Component ---
// Displays the user's current location on the map and the main SOS button.
const HomeTab = ({ location, locationError, onSOS, sosStatus }) => {
  return (
    <div className="h-full w-full relative">
       {/* Map Display */}
        <div className="absolute inset-0">
            {location ? (
                <MapComponent 
                    center={location} 
                    userLocation={location}
                    hotspotMarkers={null}
                />
            ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-300">{locationError || 'Fetching your location...'}</p>
                </div>
            )}
        </div>

        {/* SOS Button Overlay */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            <button 
                onClick={onSOS}
                disabled={sosStatus.loading}
                className="w-24 h-24 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl animate-pulse disabled:animate-none disabled:bg-red-400 transform transition-transform duration-200 hover:scale-110"
            >
                <span className="text-2xl font-bold">SOS</span>
            </button>
            {sosStatus.loading && <p className="text-sm text-center mt-2 text-white bg-black/50 rounded px-2 py-1">Sending alert...</p>}
            {sosStatus.success && <p className="text-sm text-center mt-2 text-green-700 bg-green-100 rounded px-2 py-1">{sosStatus.success}</p>}
            {sosStatus.error && <p className="text-sm text-center mt-2 text-red-700 bg-red-100 rounded px-2 py-1">{sosStatus.error}</p>}
        </div>
    </div>
  );
};

export default HomeTab;

