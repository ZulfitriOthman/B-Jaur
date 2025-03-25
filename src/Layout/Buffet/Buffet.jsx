import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Buffet.css";
import HeaderBG from "../../assets/PurpleSky.png";
import HeaderIcon from "../../assets/HeaderIcon.png";
import { BuffetSungkaiCards } from "./BuffetSungkai.jsx";
import { BuffetSahurCards } from "./BuffetSahur.jsx";
import AboutSection from '../../Elements/AboutSection/AboutSection';
import "./../TimePicker.css";
import { useMemo } from "react";

function Buffet() {
  // Combine both card types into a single array
  const allCards = [...BuffetSungkaiCards, ...BuffetSahurCards];
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedCards, setSortedCards] = useState(allCards);
  const [showPriceSort, setShowPriceSort] = useState(false);
  const [selectedPriceOption, setSelectedPriceOption] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategoryButtons, setShowCategoryButtons] = useState(false);
  const [showPriceButtons, setShowPriceButtons] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);
  const [tempPriceRange, setTempPriceRange] = useState([minPrice, maxPrice]);
  const [showOpenHoursButtons, setShowOpenHoursButtons] = useState(false);
  const [showCloseHoursButtons, setShowCloseHoursButtons] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showDistrictButtons, setShowDistrictButtons] = useState(false);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState("AM");
  const [searchQuery, setSearchQuery] = useState("");
  


  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i.toString()));
  const ampmOptions = ["AM", "PM"];
  
  const cardsPerPage = 15;

  const handleTempPriceChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
  
    setTempPriceRange((prev) => { 
      const newRange = [...prev];
  
      if (name === "min" && numericValue < newRange[1]) {
        newRange[0] = numericValue;
      } else if (name === "max" && numericValue > newRange[0]) {
        newRange[1] = numericValue;
      }
  
      return newRange;
    });
  };

  const handlePriceCommit = () => {
    setMinPrice(tempPriceRange[0]);
    setMaxPrice(tempPriceRange[1]);
  };


  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter cards based on search query
  useEffect(() => {
    window.scrollTo(0, 0);
    let filteredCards = allCards;
  
    // Apply search filter
    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      filteredCards = filteredCards.filter((card) =>
        card.title.toLowerCase().includes(queryLower) ||
        card.priceDisplay.toLowerCase().includes(queryLower) ||
        card.option.toLowerCase().includes(queryLower) ||
        card.openTime.toLowerCase().includes(queryLower) ||
        card.closeTime.toLowerCase().includes(queryLower)
      );
    }
  
    // Apply category filter
    if (selectedCategory) {
      filteredCards = filteredCards.filter((card) => card.option === selectedCategory);
    }
  
    // Apply district filter
    if (selectedDistrict) {
      filteredCards = filteredCards.filter((card) => card.district === selectedDistrict);
    }
  
    // Apply price range filter
    filteredCards = filteredCards.filter((card) => {
      const cardPrice = parseFloat(card.price.replace(/[^0-9.]/g, ""));
      return cardPrice >= minPrice && cardPrice <= maxPrice;
    });
  
    // Apply sorting
    if (selectedPriceOption) {
      filteredCards = [...filteredCards].sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return selectedPriceOption === "Price: Low to High" ? priceA - priceB : priceB - priceA;
      });
    }
  
    setSortedCards(filteredCards);
    setCurrentPage(1); // Reset to first page when filters change
  
  }, [searchQuery, selectedCategory, selectedDistrict, minPrice, maxPrice, selectedPriceOption, allCards]);
  


  // Filter by opening hours
  const filterByTime = () => {
    const selectedTime = `${hour.padStart(2, "0")}${minute.padStart(2, "0")}${ampm === "PM" ? "12" : ""}`; // Convert selected time to 24-hour format
    const filteredCards = initialCards.filter((card) => {
      const openTime = card.openTime;
      const closeTime = card.closeTime;

      // Compare selected time with open and close hours
      if (parseInt(selectedTime) >= parseInt(openTime) && parseInt(selectedTime) <= parseInt(closeTime)) {
        return true;
      }
      return false;
    });

    setSortedCards(filteredCards);
  };

  // Handle time changes and filter
  const handleTimeChange = () => {
    filterByTime();
  };
  
  
  // Handle sorting order change
  const handleSortChange = (sortOrder) => {
    setSelectedPriceOption(sortOrder === "low-to-high" ? "Price: Low to High" : "Price: High to Low");

    const sortedData = [...allCards];
    sortedData.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));

      if (sortOrder === "low-to-high") {
        return priceA - priceB; // Ascending order
      } else {
        return priceB - priceA; // Descending order
      }
    });

    setSortedCards(sortedData); // Update the sorted state
    setCurrentPage(1); // Reset pagination to the first page
    setShowPriceSort(false); // Close the dropdown after selection
  };

  // Handle category filter change
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);

    if (category === "") {
      setSortedCards(allCards); // Show all when no filter
    } else {
      const filteredCards = allCards.filter((card) => card.option === category);
      setSortedCards(filteredCards);
    }

    setCurrentPage(1); // Reset pagination
  };

  // Price Slider Handler
  const handlePriceSliderChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
  
    setPriceRange((prev) => {
      const newRange = [...prev];
  
      if (name === "min") {
        if (numericValue < newRange[1]) {
          newRange[0] = numericValue;
        }
      } else if (name === "max") {
        if (numericValue > newRange[0]) {
          newRange[1] = numericValue;
        }
      }
  
      setMinPrice(newRange[0]);
      setMaxPrice(newRange[1]);
  
      // Filter cards based on price range
      const filteredCards = allCards.filter((card) => {
        const cardPrice = parseFloat(card.price.replace(/[^0-9.]/g, "")); // Extract numeric price
        return cardPrice >= newRange[0] && cardPrice <= newRange[1];
      });
  
      setSortedCards(filteredCards); // Update the displayed cards
  
      return newRange;
    });
  };

  // Handle district filter change
  const handleDistrictFilter = (district) => {
    setSelectedDistrict(district);

    if (district === "") {
      setSortedCards(allCards); // Show all when no filter
    } else {
      const filteredCards = allCards.filter((card) => card.district === district);
      setSortedCards(filteredCards);
    }

    setCurrentPage(1); // Reset pagination
  };

  // Pagination logic
  // Get the current slice of cards for the page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sortedCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(sortedCards.length / cardsPerPage);

  console.log("Pagination:", {
    currentPage,
    indexOfFirstCard,
    indexOfLastCard,
    totalPages,
    sortedCardsLength: sortedCards.length,
  }); // Debugging

  // Scroll to top of the card section when changing pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="buffet-container">
      <div className="buffet-header" style={{ backgroundImage: `url(${HeaderBG})` }}>
        <div className="buffet-header-content">
          <h1 className="buffet-title">Buffet</h1>
          <p className="buffet-description">
            Explore the best buffet options for Ramadhan eats & treats!
          </p>
        </div>
        
        {/* Header Icon */}
        <img src={HeaderIcon} alt="Header Icon" className="buffet-header-icon" />
      </div>

      <div className="content-container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <a href="/" className="breadcrumb-link">Home</a>
          <span className="breadcrumb-separator"> &gt; </span>
          <span className="breadcrumb-current">Buffet</span>
        </div>

        {/* Search Bar */}
        <div className="buffet-search">
          <input
            type="text"
            className="search-input"
            placeholder="Find buffets!"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-button">Search</button>
        </div>

        {/* Dropdown for Price Sorting */}
        <div className="filters-container">
          <div className="custom-dropdown">
            <button
              className="buffet-price-sort-button"
              onClick={() => setShowPriceSort(!showPriceSort)}
            >
              {selectedPriceOption || "Sort by price"}{" "}
              <span className="arrow">{showPriceSort ? "▲" : "▼"}</span>
            </button>

            {showPriceSort && (
              <div className="dropdown-pricesorts">
                <div
                  className="dropdown-pricesort"
                  onClick={() => handleSortChange("low-to-high")}
                >
                  Price: Low to High
                </div>
                <div
                  className="dropdown-pricesort"
                  onClick={() => handleSortChange("high-to-low")}
                >
                  Price: High to Low
                </div>
              </div>
            )}
          </div>
        
        
          {/* Buttons */}
          <div className="buffet-button-container">
            <Link to="/buffet">
              <button className="buffet-button active-button">Buffet</button>
            </Link>
            <Link to="/bazaar">
              <button className="bazaar-button">Bazaar</button>
            </Link>
            <Link to="/moreh">
              <button className="moreh-button">Moreh</button>
            </Link>
          </div>


          {/* Filter Button and Dropdown */}
          <div className="filter-container">
            <button className="filterdropdown-button" onClick={() => setShowFilter(!showFilter)}>
              Filter
            </button>

            {showFilter && (
              <div className="filter-dropdown">

                {/* Category Filter */}
                <div className="category-filter">
                  <button
                    className="category-select"
                    onClick={() => setShowCategoryButtons(!showCategoryButtons)}
                  >
                    Category
                    <span className="arrow">{showCategoryButtons ? "▲" : "▼"}</span>
                  </button>

                  {showCategoryButtons && (
                    <div className="filtercategory-buttons">
                      <button 
                        className={`filtercategory-button ${selectedCategory === "Sungkai Buffet" ? "active" : ""}`}
                        onClick={() => handleCategoryFilter("Sungkai Buffet")}
                      >
                        Sungkai Buffet
                      </button>
                      <button 
                        className={`filtercategory-button ${selectedCategory === "Sahur Buffet" ? "active" : ""}`}
                        onClick={() => handleCategoryFilter("Sahur Buffet")}
                      >
                        Sahur Buffet
                      </button>
                      <button 
                        className="filtercategory-button" 
                        onClick={() => handleCategoryFilter("")}
                      >
                        Show All
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Range Filter with Slider */}
                <div className="price-filter-container">
                  <div className="price-filter">
                    <button
                      className="price-select"
                      onClick={() => setShowPriceButtons(!showPriceButtons)}
                    >
                      Price Range
                      <span className="arrow">{showPriceButtons ? "▲" : "▼"}</span>
                    </button>

                    {showPriceButtons && (
                      <>
                        <div className="price-double-slider-box">
                          <div className="price-input-box">
                            <div
                              className="price-min-box"
                              style={{
                                left: `calc(${(minPrice / 100) * 100}%)`,
                                transform: "translateX(0%)",
                              }}
                            >
                            </div>

                            <div
                              className="price-max-box"
                              style={{
                                left: `calc(${(maxPrice / 100) * 100}%)`,
                                transform: "translateX(-50%)",
                              }}
                            >
                            </div>
                          </div>
                          
                          <div className="price-range-slider">
                            <div
                              className="price-slider-track"
                              style={{
                                left: `${(tempPriceRange[0] / 100) * 100}%`,
                                width: `${((tempPriceRange[1] - tempPriceRange[0]) / 100) * 100}%`,
                              }}
                            ></div>

                            <input
                              type="range"
                              min="0"
                              max="100"
                              name="min"
                              value={tempPriceRange[0]}
                              onChange={handleTempPriceChange}
                              onMouseUp={handlePriceCommit} // Update the actual filter only when user stops dragging
                              onTouchEnd={handlePriceCommit} // For mobile
                              className="slider-min-val"
                            />

                            <input
                              type="range"
                              min="0"
                              max="100"
                              name="max"
                              value={tempPriceRange[1]}
                              onChange={handleTempPriceChange}
                              onMouseUp={handlePriceCommit}
                              onTouchEnd={handlePriceCommit}
                              className="slider-max-val"
                            />

                            {/* Price Tooltip (Display price above thumb) */}
                            <div
                              className="price-tooltip min-tooltip"
                              style={{
                                left: `calc(${(tempPriceRange[0] / 100) * 100}%)`,
                                transform: "translateX(-50%)", // This ensures the tooltip is centered above the thumb
                                top: "-40px", // Adjust the value to move the tooltip above the thumb
                              }}
                            >
                              ${tempPriceRange[0]}
                            </div>
                            <div
                              className="price-tooltip max-tooltip"
                              style={{
                                left: `calc(${(tempPriceRange[1] / 100) * 100}%)`,
                                transform: "translateX(-50%)", // Ensures the tooltip is centered above the thumb
                                top: "-40px", // Adjust this for the max input tooltip
                              }}
                            >
                              ${tempPriceRange[1]}
                            </div>
                          </div>
                          <hr/>
                        </div>
                      </>
                    )}
                  </div>
                </div>


                {/* Opening Hours Filter */}
                {/* <div className="openHour-filter-container">
                  <div className="openHour-filter">
                    <button
                      className="openHour-select"
                      onClick={() => setShowOpenHoursButtons(!showOpenHoursButtons)}
                    >
                      Opening Hours
                      <span className="arrow">{showOpenHoursButtons ? "▲" : "▼"}</span>
                    </button>
                    {showOpenHoursButtons && (
                      <div className="openTime-picker">
                        <div className="openTime-dropdown">
                          <select
                            value={hour}
                            onChange={(e) => {
                              setHour(e.target.value);
                              handleTimeChange();
                            }}
                            className="openTime-select"
                          >
                            {hours.map((hour) => (
                              <option key={hour} value={hour}>
                                {hour}
                              </option>
                            ))}
                          </select>

                          <select
                            value={minute}
                            onChange={(e) => {
                              setMinute(e.target.value);
                              handleTimeChange();
                            }}
                            className="openTime-select"
                          >
                            {minutes.map((minute) => (
                              <option key={minute} value={minute}>
                                {minute}
                              </option>
                            ))}
                          </select>

                          <select
                            value={ampm}
                            onChange={(e) => {
                              setAmpm(e.target.value);
                              handleTimeChange();
                            }}
                            className="openTime-select"
                          >
                            {ampmOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* closing Hours Filter with Slider */}
                {/* <div className="closeHour-filter-container">
                  <div className="closeHour-filter">
                    <button
                      className="closeHour-select"
                      onClick={() => setShowCloseHoursButtons(!showCloseHoursButtons)}
                    >
                      Closing Hours
                      <span className="arrow">{showCloseHoursButtons ? "▲" : "▼"}</span>
                    </button>

                    {showCloseHoursButtons && (
                      <div className="closeTime-picker">
                        <div className="closeTime-dropdown">
                          <select
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}
                            className="closeTime-select"
                          >
                            {hours.map((hour) => (
                              <option key={hour} value={hour}>
                                {hour}
                              </option>
                            ))}
                          </select>

                          <select
                            value={minute}
                            onChange={(e) => setMinute(e.target.value)}
                            className="closeTime-select"
                          >
                            {minutes.map((minute) => (
                              <option key={minute} value={minute}>
                                {minute}
                              </option>
                            ))}
                          </select>

                          <select
                            value={ampm}
                            onChange={(e) => setAmpm(e.target.value)}
                            className="closeTime-select"
                          >
                            {ampmOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        <p>
                          Selected Time: {hour}:{minute} {ampm}
                        </p>
                      </div>
                    )}
                  </div>
                </div> */}


                {/* District Filter */}
                <div className="filterdistrict-filter">
                  <button
                    className="filterdistrict-select"
                    onClick={() => setShowDistrictButtons(!showDistrictButtons)}
                  >
                    District
                    <span className="arrow">{showDistrictButtons ? "▲" : "▼"}</span>
                  </button>

                  {showDistrictButtons && (
                    <div className="filterdistrict-buttons">
                      <button 
                        className={`filterdistrict-button ${selectedDistrict === "Brunei-Muara" ? "active" : ""}`}
                        onClick={() => handleDistrictFilter("Brunei-Muara")}
                      >
                        Brunei-Muara
                      </button>
                      <button 
                        className={`filterdistrict-button ${selectedDistrict === "Tutong" ? "active" : ""}`}
                        onClick={() => handleDistrictFilter("Tutong")}
                      >
                        Tutong
                      </button>
                      <button 
                        className={`filterdistrict-button ${selectedDistrict === "Belait" ? "active" : ""}`}
                        onClick={() => handleDistrictFilter("Belait")}
                      >
                        Belait
                      </button>
                      <button 
                        className={`filterdistrict-button ${selectedDistrict === "Temburong" ? "active" : ""}`}
                        onClick={() => handleDistrictFilter("Temburong")}
                      >
                        Temburong
                      </button>
                      <button 
                        className="filterdistrict-button" 
                        onClick={() => handleDistrictFilter("")}
                      >
                        Show All
                      </button>
                    </div>
                  )}
                </div>
            
              </div>
            )}
          </div>
        </div>

        {/* Cards Section */}
        <section className="BuffetCard-dropdown-section">
          <div className="BuffetCard-container">
            {currentCards.map((card) => (
              <a
                key={card.id}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="BuffetCard"
              >
                <div className="card-image-container">
                  <img src={card.image} alt={card.title} className="BuffetCard-image" />
                </div>
                <p className="BuffetCard-option">{card.option}</p>
                <h3 className="BuffetCard-title">{card.title}</h3>
                <p className="BuffetCard-price">{card.priceDisplay}</p>
                <p className="BuffetCard-time">{card.time}</p>
                <p className="BuffetCard-district">{card.district}</p>
              </a>
            ))}
          </div>
      </section>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="card-pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
      
      {/* AboutSection */}
      <AboutSection />
    
    </div>
  );
}

export default Buffet;
