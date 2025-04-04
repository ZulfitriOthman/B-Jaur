import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as turf from "@turf/turf";
import CafeLocations from "../../Data/CafeData";
import "./CafeMap.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import CafeLocationIcon from "../../../../assets/Cafes/CafesMap/CafeLocationIcon.png";
import { Circle } from "react-leaflet";

const CafeMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [cafesToShow, setCafesToShow] = useState(CafeLocations);  // Default to show all cafes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get User's Location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching location:", error);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Function to filter cafes within 3km of user location
  const filterCafesNearby = () => {
    if (!userLocation) return; 
    const userPoint = turf.point([userLocation[1], userLocation[0]]);

    const nearbyCafes = CafeLocations.filter((cafe) => {
      const cafePoint = turf.point([cafe.longitude, cafe.latitude]);
      const distance = turf.distance(userPoint, cafePoint, { units: "kilometers" });
      return distance <= 3; // Filter cafes within 3km
    });

    // Show filtered cafes if any nearby, otherwise show all cafes
    setCafesToShow(nearbyCafes.length > 0 ? nearbyCafes : CafeLocations);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const cafeIcon = L.icon({
    iconUrl: CafeLocationIcon,  
    iconSize: [50, 50],  
    iconAnchor: [25, 40],
  });
  
  return (
    <div className="CafeMap-container">
      <button onClick={filterCafesNearby} className="bg-blue-500 text-white p-2 rounded">
        Show Cafes Near Me (Within 3km)
      </button>

      <MapContainer
        center={userLocation || [4.8903, 114.9404]}  // Default center if user location is not available
        zoom={13}
        className="CafeMap"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://stamen.com/">Stamen Design</a>'
        />

        {/* User's Location Marker - Custom Circle */}
        {userLocation && (
          <>
            {/* 3km Radius Circle */}
            <Circle
              center={userLocation} 
              radius={3000} 
              pathOptions={{ color: "#none", fillColor: "#5f1af47c", fillOpacity: 0.3 }} 
            />

            <Marker
              position={userLocation}
              draggable={true} 
              eventHandlers={{
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();
                  setUserLocation([lat, lng]);
                },
              }}
              icon={L.divIcon({
                className: 'user-location-icon', 
                iconSize: [36, 36],  
                iconAnchor: [18, 18], 
              })}
            >
              <Popup>Drag to change your location</Popup>
            </Marker>
          </>
        )}

        {/* Cafe Markers with Clustering */}
        <MarkerClusterGroup>
          {cafesToShow.map((cafe) => (
            <Marker
              key={cafe.id}
              position={[cafe.latitude, cafe.longitude]}
              icon={cafeIcon}  
            >
              <Popup>
                <div className="CafePopup">
                  <img src={cafe.image} alt={cafe.name} className="CafePopup-img" />
                  <h3>{cafe.name}</h3>
                  <p>{cafe.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default CafeMap;
