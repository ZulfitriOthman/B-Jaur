import { useMemo } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Buffet.css";
import HeaderBG from "../assets/PurpleSky.png";
import HeaderIcon from "../assets/HeaderIcon.png";
import { BuffetSungkaiCards } from "./BuffetSungkai.jsx";
import { BuffetSahurCards } from "./BuffetSahur.jsx";
import AboutSection from '../Elements/AboutSection/AboutSection';
import { useLocation, useNavigate } from "react-router-dom";
import "./TimePicker.css";  
// import BuffetData from './BuffetData.jsx';

function Buffet() {
  // Combine both card types into a single array
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const urlDistrict = queryParams.get("district");
  const allCards = useMemo(() => [...BuffetSungkaiCards, ...BuffetSahurCards], [BuffetSungkaiCards, BuffetSahurCards]);
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
  // const [showOpenHoursButtons, setShowOpenHoursButtons] = useState(false);
  // const [showCloseHoursButtons, setShowCloseHoursButtons] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showDistrictButtons, setShowDistrictButtons] = useState(false);
  // const [hour, setHour] = useState("00");
  // const [minute, setMinute] = useState("00");
  // const [ampm, setAmpm] = useState("AM");
  const [searchQuery, setSearchQuery] = useState("");

  // const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  // const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : i.toString()));
  // const ampmOptions = ["AM", "PM"];
  
  const cardsPerPage = 15;

  // Handle temporary slider changes
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

  // Commit final price range selection
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
  
    if (urlDistrict && !selectedDistrict) {
      setSelectedDistrict(urlDistrict);
    }

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
  
  }, [urlDistrict, searchQuery, selectedCategory, selectedDistrict, minPrice, maxPrice, selectedPriceOption, allCards]);
  


  // // Filter by opening hours
  // const filterByTime = () => {
  //   const selectedTime = `${hour.padStart(2, "0")}${minute.padStart(2, "0")}${ampm === "PM" ? "12" : ""}`; // Convert selected time to 24-hour format
  //   const filteredCards = initialCards.filter((card) => {
  //     const openTime = card.openTime;
  //     const closeTime = card.closeTime;

  //     // Compare selected time with open and close hours
  //     if (parseInt(selectedTime) >= parseInt(openTime) && parseInt(selectedTime) <= parseInt(closeTime)) {
  //       return true;
  //     }
  //     return false;
  //   });

  //   setSortedCards(filteredCards);
  // };

  // // Handle time changes and filter
  // const handleTimeChange = () => {
  //   filterByTime();
  // };
  
  
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

    navigate("/buffet", { replace: true });
    setCurrentPage(1); // Reset pagination
  };

  // Pagination logic
  // Get the current slice of cards for the page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sortedCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(sortedCards.length / cardsPerPage);

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

      <div className="buffet-content-container">
        {/* Breadcrumb Navigation */}
        <div className="buffet-breadcrumb">
          <a href="/" className="buffet-breadcrumb-link">Home</a>
          <span className="buffet-breadcrumb-separator"> &gt; </span>
          <span className="buffet-breadcrumb-current">Buffet</span>
        </div>

        {/* Search Bar */}
        <div className="buffet-search">
          <input
            type="text"
            className="buffet-search-input"
            placeholder="Find buffets!"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="buffet-search-button">Search</button>
        </div>

        {/* Dropdown for Price Sorting */}
        <div className="buffet-filters-container">
          <div className="buffet-custom-dropdown">
            <button
              className="buffet-price-sort-button"
              onClick={() => setShowPriceSort(!showPriceSort)}
            >
              {selectedPriceOption || "Sort by price"}{" "}
              <span className="buffet-arrow">{showPriceSort ? "▲" : "▼"}</span>
            </button>

            {showPriceSort && (
              <div className="buffet-dropdown-pricesorts">
                <div
                  className="buffet-dropdown-pricesort"
                  onClick={() => handleSortChange("low-to-high")}
                >
                  Price: Low to High
                </div>
                <div
                  className="buffet-dropdown-pricesort"
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
              <button className="buffet-button buffet-active-button">Buffet</button>
            </Link>
            <Link to="/bazaar">
              <button className="bazaar-button">Bazaar</button>
            </Link>
            <Link to="/moreh">
              <button className="moreh-button">Moreh</button>
            </Link>
          </div>


          {/* Filter Button and Dropdown */}
          <div className="buffet-filter-container">
            <button className="buffet-filterdropdown-button" onClick={() => setShowFilter(!showFilter)}>
              Filter
            </button>

            {showFilter && (
              <div className="buffet-filter-dropdown">

                {/* Category Filter */}
                <div className="buffet-category-filter">
                  <button
                    className="buffet-category-select"
                    onClick={() => setShowCategoryButtons(!showCategoryButtons)}
                  >
                    Category
                    <span className="buffet-arrow">{showCategoryButtons ? "▲" : "▼"}</span>
                  </button>

                  {showCategoryButtons && (
                    <div className="buffet-filtercategory-buttons">
                      <button 
                        className={`buffet-filtercategory-button ${selectedCategory === "Sungkai Buffet" ? "active" : ""}`}
                        onClick={() => handleCategoryFilter("Sungkai Buffet")}
                      >
                        Sungkai Buffet
                      </button>
                      <button 
                        className={`buffet-filtercategory-button ${selectedCategory === "Sahur Buffet" ? "active" : ""}`}
                        onClick={() => handleCategoryFilter("Sahur Buffet")}
                      >
                        Sahur Buffet
                      </button>
                      <button 
                        className="buffet-filtercategory-button" 
                        onClick={() => handleCategoryFilter("")}
                      >
                        Show All
                      </button>
                    </div>
                  )}
                </div>

                <div className="buffet-price-filter-container">
                  <div className="buffet-price-filter">
                    <button
                      className="buffet-price-select"
                      onClick={() => setShowPriceButtons(!showPriceButtons)}
                    >
                      Price Range: ${tempPriceRange[0]} - ${tempPriceRange[1]}
                      <span className="buffet-arrow">{showPriceButtons ? "▲" : "▼"}</span>
                    </button>

                    {showPriceButtons && (
                      <div className="buffet-price-double-slider-box">
                        <div className="buffet-price-range-slider">
                          <div
                            className="buffet-price-slider-track"
                            style={{
                              left: `${(tempPriceRange[0] / priceRange[1]) * 100}%`,
                              width: `${((tempPriceRange[1] - tempPriceRange[0]) / priceRange[1]) * 100}%`,
                            }}
                          ></div>

                          {/* Min Slider */}
                          <input
                            type="range"
                            min="0"
                            max="100"
                            name="min"
                            value={tempPriceRange[0]}
                            onChange={handleTempPriceChange}
                            onMouseUp={handlePriceCommit} // Update the actual filter only when user stops dragging
                            onTouchEnd={handlePriceCommit} // For mobile
                            className="buffet-slider-min-val"
                          />

                          {/* Max Slider */}
                          <input
                            type="range"
                            min="0"
                            max="100"
                            name="max"
                            value={tempPriceRange[1]}
                            onChange={handleTempPriceChange}
                            onMouseUp={handlePriceCommit}
                            onTouchEnd={handlePriceCommit}
                            className="buffet-slider-max-val"
                          />

                          {/* Tooltips */}
                          <div
                            className="buffet-price-tooltip buffet-min-tooltip"
                            style={{
                              left: `calc(${(tempPriceRange[0] / priceRange[1]) * 100}%)`,
                              transform: "translateX(-50%)",
                              top: "-40px",
                            }}
                          >
                            ${tempPriceRange[0]}
                          </div>
                          <div
                            className="buffet-price-tooltip buffet-max-tooltip"
                            style={{
                              left: `calc(${(tempPriceRange[1] / priceRange[1]) * 100}%)`,
                              transform: "translateX(-50%)",
                              top: "-40px",
                            }}
                          >
                            ${tempPriceRange[1]}
                          </div>

                          {/* <BuffetData
                            selectedCategory={selectedCategory}
                            tempPriceRange={tempPriceRange}
                          /> */}
                          
                        </div>
                        <hr />
                      </div>
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
                </div> */}

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
                <div className="buffet-filterdistrict-filter">
                  <button
                    className="buffet-filterdistrict-select"
                    onClick={() => setShowDistrictButtons(!showDistrictButtons)}
                  >
                    District
                    <span className="buffet-arrow">{showDistrictButtons ? "▲" : "▼"}</span>
                  </button>

                  {showDistrictButtons && (
                    <div className="buffet-filterdistrict-buttons">
                      <button 
                        className={`buffet-filterdistrict-button ${selectedDistrict === "Brunei-Muara" ? "active" : ""}`}
                        onClick={() => handleDistrictFilter("Brunei-Muara")}
                      >
                        Brunei-Muara
                      </button>
                      <button 
                        className={`buffet-filterdistrict-button ${selectedDistrict === "Tutong" ? "active" : ""}`}
                        onClick={() => handleDistrictFilter("Tutong")}
                      >
                        Tutong
                      </button>
                      <button 
                        className={`buffet-filterdistrict-button ${selectedDistrict === "Belait" ? "active" : ""}`}
                        onClick={() => handleDistrictFilter("Belait")}
                      >
                        Belait
                      </button>
                      <button 
                        className={`buffet-filterdistrict-button ${selectedDistrict === "Temburong" ? "active" : ""}`}
                        onClick={() => handleDistrictFilter("Temburong")}
                      >
                        Temburong
                      </button>
                      <button 
                        className="buffet-filterdistrict-button" 
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
        <section className="buffetCard-dropdown-section">
          <div className="buffetCard-container">
            {currentCards.map((card) => (
              <a
                key={card.id}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="buffetCard"
              >
                <div className="buffet-card-image-container">
                  <img src={card.image} alt={card.title} className="buffetCard-image" />
                </div>
                <p className="buffetCard-option">{card.option}</p>
                <h3 className="buffetCard-title">{card.title}</h3>
                <p className="buffetCard-price">{card.priceDisplay}</p>
                <p className="buffetCard-time">{card.time}</p>
                <p className="buffetCard-district">{card.district}</p>
              </a>
            ))}
          </div>
      </section>
        
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="buffet-card-pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {/* Logic to display page numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            
            // Show first 5 pages, then "..." if there are more than 5, and show last page
            if (
              pageNum <= 3 || 
              pageNum > totalPages - 3 || 
              (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
            ) {
              return (
                <button
                  key={pageNum}
                  className={currentPage === pageNum ? "active" : ""}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            } else if (pageNum === 6 && currentPage < totalPages - 2) {
              return <span key="ellipsis">...</span>;
            }

            return null;
          })}

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
