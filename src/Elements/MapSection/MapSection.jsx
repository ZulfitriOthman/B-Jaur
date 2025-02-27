import { useState } from "react";
import MapView from "./MapView";
import MapSearch from "./MapSearch";
import "./MapSection.css"; // Import the external CSS file

function MapSection() {
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [showPropertyList, setShowPropertyList] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleDistrictClick = (district) => {
    setActiveDistrict(district);
    setShowSearchBar(true);
  };

  const handleSearch = (query) => {
    console.log("Searching for properties in", activeDistrict, "with query:", query);
    setShowPropertyList(true);
  };

  return (
    <div className="map-box">
      <div className="featured-properties-box">
        <div className="content-overlay">
          {/* Left Content - Map Search Heading */}
          <div className="content-left">
            <div>
              <h1 className="map-title">Map Search Here</h1>
              <p className="map-description">
                Click on the map to select a Brunei district.
              </p>
            </div>

            {/* Search Bar and District Info */}
            {showSearchBar && activeDistrict && (
              <div>
                <h3 className="district-title">{activeDistrict} District</h3>
                <MapSearch 
                  selectedDistrict={activeDistrict} 
                  onSearch={handleSearch}
                  setShowPropertyList={setShowPropertyList}
                />
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="map-container">
            <MapView 
              onDistrictClick={handleDistrictClick} 
              activeDistrict={activeDistrict} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapSection;
