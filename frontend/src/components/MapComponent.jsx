import React, { useEffect, useRef } from 'react';

// --- Map Component ---
// This component initializes and displays the MapmyIndia map with multiple markers.
const MapComponent = ({ center, userLocation, hotspotMarkers }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]); // Ref to keep track of all markers on the map

  useEffect(() => {
    let isMounted = true;

    const initializeMap = () => {
      if (window.mappls && mapRef.current && isMounted && center) {
        // Clear old markers before re-rendering
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // If a map instance doesn't exist, create it
        if (!mapInstance.current) {
          mapInstance.current = new window.mappls.Map(mapRef.current, {
            center: [center.lat, center.lng],
            zoom: 14,
          });
        } else {
            // If it exists, just set the new center and zoom
            mapInstance.current.setView([center.lat, center.lng], 14);
        }
        
        // Add a marker for the user's location (custom blue dot)
        if (userLocation) {
            const userMarker = new window.mappls.Marker({
                position: [userLocation.lat, userLocation.lng],
                map: mapInstance.current,
                title: 'Your Location',
                icon_url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' // Using a custom blue dot icon
            });
            markersRef.current.push(userMarker);
        }

        // Add markers for hotspots (red markers with popups)
        if (hotspotMarkers) {
            hotspotMarkers.forEach(spot => {
                // CORRECTED: Pass the popup HTML content directly into the marker's options.
                const hotspotMarker = new window.mappls.Marker({
                    position: [spot.lat, spot.lng],
                    map: mapInstance.current,
                    title: spot.name,
                    popupHtml: `<b>${spot.name}</b><br>${spot.description}`
                });
                markersRef.current.push(hotspotMarker);
            });
        }
      }
    };

    if (window.mappls) {
      initializeMap();
    } else {
      // Fallback if the script hasn't loaded yet
      window.addEventListener('load', initializeMap);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('load', initializeMap);
    };
  }, [center, userLocation, hotspotMarkers]); // Re-run effect if any data changes

  return <div ref={mapRef} className="w-full h-full" id="map"></div>;
};

export default MapComponent;

  