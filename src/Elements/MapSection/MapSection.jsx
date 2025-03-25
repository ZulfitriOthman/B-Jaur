import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapView from "./MapView";
import { useNavigate } from "react-router-dom";
import "./MapSection.css";
import AmirIcon from "../../assets/Amir_1.png";
import SignageIcon from "../../assets/Signage_2.png";
import BubbleIcon from "../../assets/Bubble_3.png";
import { FaArrowLeft } from 'react-icons/fa';

function MapSection() {
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showSecondaryFilters, setShowSecondaryFilters] = useState(false);
  const [isDistrictSelected, setIsDistrictSelected] = useState(false);

  const navigate = useNavigate();

  const handleDistrictClick = (district) => {
    setActiveDistrict(district);
    const districtFilters = {
      "Brunei-Muara": "Brunei-Muara",
      "Tutong": "Tutong",
      "Belait": "Belait",
      "Temburong": "Temburong",
    };
    setSelectedFilter(districtFilters[district]);
    setIsDistrictSelected(true);
    setShowSecondaryFilters(true);
  };
  

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setActiveDistrict(filter);  
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
      navigate(`/buffet?district=${selectedFilter}`);
    } else if (section === "Bazaar.jpg") {
      navigate(`/bazaar?district=${selectedFilter}`);
    } else if (section === "Moreh.jpg") {
      navigate(`/moreh?district=${selectedFilter}`);
    }
  };

  return (
    <div className="map-section-container">
      <div className="banner-container">
        <div className="banner-title">Don’t know where to eat? We’ll assist you!</div>
        <div className="banner-images">
          <div className="banner-bubble-image">
            <img src={BubbleIcon} alt="Bubble Icon" className="Bubble-icon" />
          </div>
          <div className="banner-amir-image">
            <img src={AmirIcon} alt="Amir Icon" className="Amir-icon" />
          </div>
          <div className="banner-signage-image">
            <img src={SignageIcon} alt="Signage Icon" className="Signage-icon" />
          </div>
        </div>
      </div>
      
      <div className={showSecondaryFilters ? "map-box" : ""} id="map-section">
        <div className="featured-properties-box">
          <header className="map-header">
          {isDistrictSelected && (
            <motion.h3
              className="secondary-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
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
                
                  {!showSecondaryFilters && !isDistrictSelected && (
                    <motion.div
                      className="MapPrimary-buttons"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {["Brunei-Muara", "Tutong", "Belait", "Temburong"].map(
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
          
            {showSecondaryFilters && isDistrictSelected && (
              <motion.div
                className="secondary-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >

              <div className="back-and-title-container">
                <motion.button
                  className="back-button"
                  onClick={() => {
                    setShowSecondaryFilters(false);
                    setIsDistrictSelected(false);
                    setSelectedFilter(null);
                    setActiveDistrict(null);
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaArrowLeft className="back-icon" />
                </motion.button>

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
              </div>

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
                            src={`/${selectedFilter.toLowerCase()}/${image}`}
                            alt={`Location ${index + 1}`}
                            className="filter-image"
                          />

                          {image === "Buffet.jpg" && (
                            <img src={`/yellow.png`} alt="Sun Icon" className="yellow-sun" />
                          )}
                          {image === "Bazaar.jpg" && (
                            <img src={`/pink.png`} alt="Moon Icon" className="pink-moon" />
                          )}
                          {image === "Moreh.jpg" && (
                            <img src={`/blue.png`} alt="Candy Icon" className="blue-candy" />
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
        </div>
      </div>
    </div>
  );
}

export default MapSection;
