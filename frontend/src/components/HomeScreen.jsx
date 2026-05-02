import React, { useState, useEffect } from 'react';
import BottomNav from './BottomNav.jsx';
import HomeTab from './HomeTab.jsx';
import FeaturesTab from './FeaturesTab.jsx';
import ProfileTab from './ProfileTab.jsx';
import HotspotFinder from './HotspotFinder.jsx';
import TrackJourney from './TrackJourney.jsx';
import { useShake } from '../hooks/useShake.js'; 

const HomeScreen = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [featuresView, setFeaturesView] = useState('menu'); // 'menu', 'hotspots', or 'trackJourney'
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [sosStatus, setSosStatus] = useState({ loading: false, error: null, success: null });

  // --- SOS Logic ---
  const handleSOS = async () => {
    // Prevent sending another SOS if one is already in progress or just succeeded
    if (sosStatus.loading || sosStatus.success) return;
    
    if (!location) {
      setSosStatus({ ...sosStatus, error: 'Cannot send SOS without your location.' });
      return;
    }
    setSosStatus({ loading: true, error: null, success: null });

    try {
      const res = await fetch(`/api/alerts/sos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          lat: location.lat,
          lng: location.lng,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send SOS');

      setSosStatus({ loading: false, error: null, success: 'SOS alert sent successfully!' });
      // Reset success message after a few seconds
      setTimeout(() => setSosStatus({ loading: false, error: null, success: null }), 5000);
    } catch (err) {
      setSosStatus({ loading: false, error: err.message, success: null });
    }
  };

  // --- Shake Detection ---
  useShake(handleSOS); // When a shake is detected, call the handleSOS function

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError("Could not fetch your location. Please enable location services.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab location={location} locationError={locationError} onSOS={handleSOS} sosStatus={sosStatus} />;
      case 'features':
        // Navigation logic for the Features Tab
        if (featuresView === 'hotspots') {
          return <HotspotFinder onBack={() => setFeaturesView('menu')} />;
        }
        if (featuresView === 'trackJourney') {
          return <TrackJourney onBack={() => setFeaturesView('menu')} onTriggerSOS={handleSOS} />;
        }
        return <FeaturesTab onShowHotspotFinder={() => setFeaturesView('hotspots')} onShowTrackJourney={() => setFeaturesView('trackJourney')} />;
      case 'profile':
        return <ProfileTab onLogout={onLogout} />;
      default:
        return <HomeTab location={location} locationError={locationError} onSOS={handleSOS} sosStatus={sosStatus} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <main className="flex-grow overflow-y-auto">
        {renderTabContent()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default HomeScreen;