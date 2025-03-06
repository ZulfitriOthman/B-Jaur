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
  const [isDistrictSelected, setIsDistrictSelected] = useState(false);

  const handleDistrictClick = (district) => {
    setActiveDistrict(district);
    setShowHiddenSection(true); 
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setIsDistrictSelected(true); // Hide the other content
    setShowSecondaryFilters(true); // Show secondary filters
  };  

  const randomMessages = [
    "Lapar ku eh Maghrib pukul berapa?",
    "Bah, ke stadium tani?",
    "Lepas terawih moreh mana?",
    "Makan apa karang?",
    "Elek, chill, kami makan sini lah",
  ];
  
  const getRandomMessage = () => {
    return randomMessages[Math.floor(Math.random() * randomMessages.length)];
  };

  return (
    <div className="map-box" id="map-section"> {/* Ani for the arrow button, just modify the id to where you leading too.. */}
      <div className="featured-properties-box">
        <header className="map-header">
          {/* Content - Map Search Heading */}
          <h1 className="map-title">Don’t know where to eat? We’ll assist you!</h1>
        </header>
        
        <div className="content-overlay">
          <div className="content-left">
            {/* Conditionally render the map description */}
            {!showSecondaryFilters && (
              <h1 className="map-description">
                <span>Click on the map or</span>  
                <span>buttons below to</span>  
                <span>select your district!</span>
              </h1>
            )}

            {/* 🏷️ Filter Buttons */}
            <div className="filter-container">
              {/* Primary Filter Buttons */}
              <AnimatePresence>
                {!showSecondaryFilters && !isDistrictSelected && (  // Only show this if district is not selected
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
            </div>

            {/* Search Bar for Selected District */}
            {showSearchBar && activeDistrict && isDistrictSelected && (
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

          {/* 🗺️ Map Section - Conditionally Rendered */}
          {!showSecondaryFilters && (
            <div className="map-container">
              <MapView 
                onDistrictClick={handleDistrictClick} 
                activeDistrict={activeDistrict} 
              />
            </div>
          )}
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

        {/* Secondary Filter Images */}
        <AnimatePresence>
            {showSecondaryFilters && isDistrictSelected && (  // Show this only when district is selected
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
                  {`${selectedFilter} - Ramadhan eats & treats`}
                </motion.h3>

                {/* Image Grid */}
                <motion.div
                  className="image-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {["Buffet.jpg", "Bazaar.jpg", "Mureh.jpg"].map((image, index) => (
                    <motion.button
                      key={index}
                      className="filter-image-button"
                      onClick={() => handleImageClick(image)} // Handle image click here
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                    <div className="image-container">
                      <img
                        src={`/b-jaur.com/src/assets/${selectedFilter.toLowerCase()}/${image}`}
                        alt={`Location ${index + 1}`}
                        className="filter-image"
                      />
                      <div className="overlay-text">
                        <div className="image-title-section">{image.replace(/\.[^/.]+$/, '')}</div>
                      </div>
                        <div className="image-description">{getRandomMessage()}</div>
                          <button className="explore-button">Explore</button>
                    </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}

export default MapSection;
