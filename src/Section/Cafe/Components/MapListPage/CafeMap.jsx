import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CafeLocations from "../../Data/CafeData";
import "./CafeMap.css";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const CafeMap = () => {
  return (
    <div className="CafeMap-container">
      <MapContainer center={[4.8903, 114.9404]} zoom={13} className="CafeMap">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {CafeLocations.map((cafe) => {
          console.log(cafe.lat, cafe.lng); // Debugging step to check lat/lng
          return (
            <Marker
              key={cafe.id}
              position={[cafe.lat, cafe.lng]}
              icon={L.icon({
                iconUrl: markerIconPng,
                shadowUrl: markerShadowPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            >
              <Popup>
                <div className="CafePopup">
                  <img src={cafe.image} alt={cafe.name} className="CafePopup-img" />
                  <h3>{cafe.name}</h3>
                </div>
              </Popup>

            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CafeMap;
