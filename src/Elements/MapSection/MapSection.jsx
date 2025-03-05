import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapView from "./MapView";
import MapSearch from "./MapSearch";
import "./MapSection.css"; 

function MapSection() {
  const [showHiddenSection, setShowHiddenSection] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [showPropertyList, setShowPropertyList] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showSecondaryFilters, setShowSecondaryFilters] = useState(false);

  const handleDistrictClick = (district) => {
    setActiveDistrict(district);
    setShowHiddenSection(true); 
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    console.log(`Filtering properties in ${activeDistrict || "all locations"} for: ${filter}`);
    setShowPropertyList(true);
    setShowSecondaryFilters(true); // Show the secondary buttons
  };

  const handleSearchClick = () => {
    console.log("Search button clicked");
  };

  return (
    <div className="map-box" id="map-section"> {/* Ani for the arrow button, just modify the id to where you leading too.. */}
      <div className="featured-properties-box">
        <div className="content-overlay">
          {/* Left Content - Map Search Heading */}
          <div className="content-left">
            <div>
              <h1 className="map-title">Map Search</h1>
              <p className="map-description">
                Click on the map or buttons below to select your district!
              </p>
            </div>

            {/* 🏷️ Filter Buttons */}
            <div className="filter-container">
              {/* Primary Filter Buttons */}
              <AnimatePresence>
                {!showSecondaryFilters && (
                  <motion.div
                    className="primary-buttons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {["Brunei-Muara", "Tutong", "Kuala Belait", "Temburong"].map((filter) => (
                      <motion.button
                        key={filter}
                        className={`filter-button ${selectedFilter === filter ? "active" : ""}`}
                        onClick={() => handleFilterClick(filter)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {filter}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Secondary Filter Buttons */}
              <AnimatePresence>
                {showSecondaryFilters && (
                  <motion.div
                    className="secondary-buttons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Title (Header) */}
                    <motion.h3
                      className="secondary-title"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{ duration: 0.5 }}
                    >
                      {selectedFilter}
                    </motion.h3>

                    {/* Filter Buttons */}
                    <motion.div
                      className="filter-buttons-row"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {["All", "Sungkai", "Sahur", "Moreh"].map((filter) => (
                        <motion.button
                          key={filter}
                          className="filter-button"
                          onClick={() => {}}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {filter}
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* New Search Button */}
            <div className="search-button-container">
              <button 
                className="search-button"
                onClick={handleSearchClick}
              >
                Search Properties
              </button>
            </div>

            {/* Search Bar for Selected District */}
            {showSearchBar && activeDistrict && (
              <div>
                <h3 className="district-title">{activeDistrict} District</h3>
                <MapSearch 
                  selectedDistrict={activeDistrict} 
                  onSearch={() => console.log("Search triggered")}
                  setShowPropertyList={setShowPropertyList}
                />
              </div>
            )}
          </div>

          {/* 🗺️ Map Section */}
          <div className="map-container">
            <MapView 
              onDistrictClick={handleDistrictClick} 
              activeDistrict={activeDistrict} 
            />
          </div>
        </div>

        {/* Hidden Section - Animate Presence */}
        <AnimatePresence>
          {showHiddenSection && activeDistrict && (
            //Thanos Snap Effect
              <motion.div
                key="hidden-section"
                className="hidden-section"
                initial={{ opacity: 0, filter: "blur(10px)" }} // Start blurred and invisible
                animate={{ opacity: 1, filter: "blur(0px)" }} // Sharpen and appear
                exit={{ opacity: 0, filter: "blur(10px)" }}   // Fade out with blur
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h3>{activeDistrict} District</h3>
                <p>Details about {activeDistrict} will be displayed here.</p>

                {/* Back Button to Hide Section */}
                <button className="back-button" onClick={() => setShowHiddenSection(false)}>
                  Close
                </button>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MapSection;
