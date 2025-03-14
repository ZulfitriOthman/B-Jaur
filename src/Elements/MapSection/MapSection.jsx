import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapView from "./MapView";
import YellowSun from "../../assets/yellow.png";
import PinkMoon from "../../assets/pink.png";
import BlueCandy from "../../assets/blue.png";
import { useNavigate } from "react-router-dom";
import "./MapSection.css";

function MapSection() {
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showSecondaryFilters, setShowSecondaryFilters] = useState(false);
  const [isDistrictSelected, setIsDistrictSelected] = useState(false);

  const navigate = useNavigate();

  const handleDistrictClick = (district) => {
    setActiveDistrict(district);
    // Set the filter based on the district clicked
    const districtFilters = {
      "Brunei-Muara": "Brunei-Muara",
      "Tutong": "Tutong",
      "Kuala Belait": "Kuala Belait",
      "Temburong": "Temburong",
    };
    setSelectedFilter(districtFilters[district]);
    setIsDistrictSelected(true);
    setShowSecondaryFilters(true);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setIsDistrictSelected(true);
    setShowSecondaryFilters(true);
  };

  const getRandomMessage = (image) => {
    // Messages for Buffet and Bazaar (same messages)
    const buffetBazaarMessages = [
      "Lapar ku eh Maghrib pukul berapa?",
      "Bah, ke stadium tani?",
      "Makan apa karang?",
      "Elek, chill, kami makan sini lah",
    ];
  
    // Message for Moreh
    const morehMessages = [
      "Lepas terawih moreh mana?",
      "Singgah cafe dulu eh, sebelum balik",
    ];
    
    // Return messages based on the image
    if (image === "Buffet.jpg" || image === "Bazaar.jpg") {
      return buffetBazaarMessages[Math.floor(Math.random() * buffetBazaarMessages.length)];
    } else if (image === "Moreh.jpg") {
      return morehMessages[Math.floor(Math.random() * morehMessages.length)];
    }
  };

  // Navigate based on the image clicked
  const handleExploreClick = (section) => {
    if (section === "Buffet.jpg") {
      navigate("/buffet");
    } else if (section === "Bazaar.jpg") {
      navigate("/bazaar");
    } else if (section === "Moreh.jpg") {
      navigate("/moreh");
    }
  };

  return (
    <div className="map-box" id="map-section">
      <div className="featured-properties-box">
      <header className="map-header">
        {!isDistrictSelected ? (
          <h1 className="map-title">Don’t know where to eat? We’ll assist you!</h1>
        ) : (
          <motion.h3
            className="secondary-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <span className="district">{selectedFilter}</span>
            <br />
            <span className="subtitle">Ramadhan eats & treats</span>
          </motion.h3>
        )}
      </header>


        <div className="content-overlay">
          <div className="content-left">
            {!showSecondaryFilters && (
              <h1 className="map-description">
                <span>Click on the map or buttons below to select your district!</span>
              </h1>
            )}

            {/* Filter Buttons */}
            <div className="MapFilter-container">
              <AnimatePresence>
                {!showSecondaryFilters && !isDistrictSelected && (
                  <motion.div
                    className="MapPrimary-buttons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {["Brunei-Muara", "Tutong", "Kuala Belait", "Temburong"].map(
                      (filter) => (
                        <motion.button
                          key={filter}
                          className={`MapFilter-button ${
                            selectedFilter === filter ? "active" : ""
                          }`}
                          onClick={() => handleFilterClick(filter)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {filter}
                        </motion.button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Map Section */}
          {!showSecondaryFilters && (
            <div className="Map-container">
              <MapView
                onDistrictClick={handleDistrictClick}
                activeDistrict={activeDistrict}
              />
            </div>
          )}
        </div>

        {/* Secondary Filter Images */}
        <AnimatePresence>
          {showSecondaryFilters && isDistrictSelected && (
            <motion.div
              className="secondary-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h3
                className="secondary-title"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              >
              </motion.h3>

              {/* Image Grid */}
              <motion.div
                className="image-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
        
                {["Buffet.jpg", "Bazaar.jpg", "Moreh.jpg"].map(
                  (image, index) => (
                    <motion.button
                      key={index}
                      className="filter-image-button"
                      onClick={() => handleExploreClick(image)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="image-container">
                        <img
                          src={`/src/assets/${selectedFilter.toLowerCase()}/${image}`}
                          alt={`Location ${index + 1}`}
                          className="filter-image"
                        />

                        {image === "Buffet.jpg" && (
                          <img src={YellowSun} alt="Sun Icon" className="yellow-sun" />
                        )}
                        {image === "Bazaar.jpg" && (
                          <img src={PinkMoon} alt="Moon Icon" className="pink-moon" />
                        )}
                        {image === "Moreh.jpg" && (
                          <img src={BlueCandy} alt="Candy Icon" className="blue-candy" />
                        )}

                        <div className="overlay-text">
                          <div className="image-title-section">
                            {image.replace(/\.[^/.]+$/, "")}
                          </div>
                        </div>
                        <div className="image-description">
                          {getRandomMessage(image)}
                        </div>
                        <button className="explore-button">Explore</button>
                      </div>
                    </motion.button>
                  )
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MapSection;
