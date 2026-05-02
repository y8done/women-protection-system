import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent.jsx';
import { ArrowLeft } from 'lucide-react';

// --- Hotspot Finder Component ---
// This component displays the map with the user's location and known unsafe hotspots.
const HotspotFinder = ({ onBack }) => {
  const [location, setLocation] = useState(null);
  const [hotspots, setHotspots] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's current location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });
        const userLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(userLoc);

        // Fetch hotspots from the backend
        const res = await fetch(`/api/features/hotspots`);
        if (!res.ok) throw new Error('Could not fetch hotspots');
        const hotspotData = await res.json();
        setHotspots(hotspotData);

      } catch (err) {
        setError(err.message || "Could not fetch location or hotspots. Please enable location services and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Set default map center to Ahmedabad if user location is not available
  const mapCenter = location || { lat: 23.0225, lng: 72.5714 }; 

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-10 flex items-center space-x-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hotspot Finder</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Showing known unsafe areas. Tap markers for details.</p>
          </div>
      </div>
      
      <div className="flex-grow relative">
        {loading && <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900"><p>Loading Map and Hotspots...</p></div>}
        {error && <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4"><p className="text-red-500 text-center">{error}</p></div>}
        {!loading && !error && (
            <MapComponent 
                center={mapCenter}
                userLocation={location}
                hotspotMarkers={hotspots}
            />
        )}
      </div>
    </div>
  );
};

export default HotspotFinder;
