import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapView from "./MapView";
import MapSearch from "./MapSearch";
import { useNavigate } from "react-router-dom";
import "./MapSection.css";

function MapSection() {
  const [showHiddenSection, setShowHiddenSection] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showSecondaryFilters, setShowSecondaryFilters] = useState(false);
  const [isDistrictSelected, setIsDistrictSelected] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const navigate = useNavigate();

  const handleDistrictClick = (district) => {
    setActiveDistrict(district);
    setShowHiddenSection(true);
    setShowSearchBar(true);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setIsDistrictSelected(true);
    setShowSecondaryFilters(true);
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
          <h1 className="map-title">Don’t know where to eat? We’ll assist you!</h1>
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

            {showSearchBar && activeDistrict && isDistrictSelected && (
              <div>
                <h3 className="district-title">{activeDistrict} District</h3>
                <MapSearch
                  selectedDistrict={activeDistrict}
                  onSearch={() => console.log("Search triggered")}
                />
              </div>
            )}
          </div>

          {/* Map Section */}
          {!showSecondaryFilters && (
            <div className="DistrictMap-container">
              <MapView
                onDistrictClick={handleDistrictClick}
                activeDistrict={activeDistrict}
              />
            </div>
          )}
        </div>

        {/* Hidden Section */}
        <AnimatePresence>
          {showHiddenSection && activeDistrict && (
            <motion.div
              key="hidden-section"
              className="hidden-section"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3>{activeDistrict} District</h3>
              <p>Details about {activeDistrict} will be displayed here.</p>
              <button
                className="back-button"
                onClick={() => setShowHiddenSection(false)}
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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
                        <div className="overlay-text">
                          <div className="image-title-section">
                            {image.replace(/\.[^/.]+$/, "")}
                          </div>
                        </div>
                        <div className="image-description">
                          {getRandomMessage()}
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
