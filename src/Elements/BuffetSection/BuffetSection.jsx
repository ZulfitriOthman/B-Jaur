import { useState } from "react";
import { Link } from "react-router-dom";
import "./BuffetSection.css";
import shop1 from "../../assets/Night-Market-1.jpg"; // import your image asset
import HeaderBG from "../../assets/PurpleSky.png";
import HeaderIcon from "../../assets/HeaderIcon.png";


// Card data
const initialCards = [
  {
    id: 1,
    image: shop1,
    title: "The Empire Brunei",
    priceDisplay: "Adult: $48 | Child: $24",
    time: "6.30 pm - 9 pm",
    district: "Brunei-Muara",
    price: "$48",
  },
  {
    id: 2,
    image: shop1,
    title: "The Grand Buffet",
    priceDisplay: "Adult: $55 | Child: $28",
    time: "6 pm - 9.30 pm",
    district: "Bandar Seri Begawan",
    price: "$55",
  },
  {
    id: 3,
    image: shop1,
    title: "Royal Feast",
    priceDisplay: "Adult: $60 | Child: $30",
    time: "7 pm - 10 pm",
    district: "Kota Batu",
    price: "$60",
  },
  {
    id: 4,
    image: shop1,
    title: "Sunset Dining",
    priceDisplay: "Adult: $50 | Child: $25",
    time: "5.30 pm - 8.30 pm",
    district: "Seria",
    price: "$50",
  },
  {
    id: 5,
    image: shop1,
    title: "Ocean Breeze Buffet",
    priceDisplay: "Adult: $45 | Child: $22",
    time: "6 pm - 9 pm",
    district: "Muara",
    price: "$45",
  },
  {
    id: 6,
    image: shop1,
    title: "Luxury Buffet",
    priceDisplay: "Adult: $65 | Child: $32",
    time: "7 pm - 10 pm",
    district: "Rimba",
    price: "$65",
  },
  {
    id: 7,
    image: shop1,
    title: "Cultural Feast",
    priceDisplay: "Adult: $40 | Child: $20",
    time: "6 pm - 9 pm",
    district: "Tutong",
    price: "$40",
  },
  {
    id: 8,
    image: shop1,
    title: "Traditional Delights",
    priceDisplay: "Adult: $38 | Child: $19",
    time: "6 pm - 9 pm",
    district: "Lumut",
    price: "$38",
  },
  {
    id: 9,
    image: shop1,
    title: "Easter Brunch",
    priceDisplay: "Adult: $50 | Child: $25",
    time: "10 am - 2 pm",
    district: "Kuala Belait",
    price: "$50",
  },
  {
    id: 10,
    image: shop1,
    title: "Beachside Buffet",
    priceDisplay: "Adult: $55 | Child: $27",
    time: "6 pm - 9 pm",
    district: "Temburong",
    price: "$55",
  },
  {
    id: 11,
    image: shop1,
    title: "City Feast",
    priceDisplay: "Adult: $48 | Child: $24",
    time: "6 pm - 9 pm",
    district: "Serusop",
    price: "$48",
  },
  {
    id: 12,
    image: shop1,
    title: "Mountain Dining",
    priceDisplay: "Adult: $60 | Child: $30",
    time: "5.30 pm - 8.30 pm",
    district: "Sungai Akar",
    price: "$60",
  },
  {
    id: 13,
    image: shop1,
    title: "River View Buffet",
    priceDisplay: "Adult: $58 | Child: $29",
    time: "7 pm - 10 pm",
    district: "Bangar",
    price: "$58",
  }
];

function BuffetSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("low-to-high");
  const [showFilter, setShowFilter] = useState(false);
  const [showCategoryButtons, setShowCategoryButtons] = useState(false);
  const [showPriceButtons, setShowPriceButtons] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);
  const [showHoursButtons, setShowHoursButtons] = useState(false);
  const [hourRange, setHourRange] = useState([0, 100]);
  const [minHour, setMinHour] = useState(hourRange[0]);
  const [maxHour, setMaxHour] = useState(hourRange[1]);
  const [showDistrictButtons, setShowDistrictButtons] = useState(false);
  
  
  const cardsPerPage = 12;


  // Sort the cards based on the selected order price
  const sortedCards = [...initialCards].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)); // Convert price to number for comparison
    } else if (sortOrder === "high-to-low") {
      return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
    }
    return 0; 
  });

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sortedCards.slice(indexOfFirstCard, indexOfLastCard);

  // Handle page navigation
  const totalPages = Math.ceil(initialCards.length / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle sorting order change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Slider Handler
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
      return newRange;
    });
  };

   // Slider Handler
   const handleHourSliderChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
  
    setHourRange((prev) => {
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
  
      setMinHour(newRange[0]);
      setMaxHour(newRange[1]);
      return newRange;
    });
  };

  return (
    <div className="buffet-container">
      <div className="buffet-header" style={{ backgroundImage: `url(${HeaderBG})` }}>
        <div className="buffet-header-content">
          <h1 className="buffet-title">Welcome to the Buffet Section</h1>
          <p className="buffet-description">
            Explore the best buffet options for Ramadhan eats & treats!
          </p>
        </div>
        
        {/* Header Icon */}
        <img src={HeaderIcon} alt="Header Icon" className="buffet-header-icon" />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <a href="/" className="breadcrumb-link">Home</a>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Buffet</span>
      </div>

      {/* Search Bar */}
      <div className="buffet-search">
        <input type="text" className="search-input" placeholder="Find buffets or bazaars!" />
        <button className="search-button">Search</button>
      </div>

      {/* Dropdown for Price Sorting */}
      <div className="filters-container">
        <select className="price-sort" aria-label="Sort by price" onChange={handleSortChange}>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
       
                

        {/* Buttons */}
        <div className="button-container">
          <button className="custom-button">Buffet</button>
          <button className="custom-button">Bazaar</button>
          <button className="custom-button">Moreh</button>
        </div>

        {/* Filter Button and Dropdown */}
        <div className="filter-container">
          <button className="filter-button" onClick={() => setShowFilter(!showFilter)}>
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
                  <div className="category-buttons">
                    <button className="category-btn">Sungkai Buffet</button>
                    <button className="category-btn">Sahur Buffet</button>
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
                              left: `${(minPrice / 100) * 100}%`,
                              width: `${((maxPrice - minPrice) / 100) * 100}%`,
                            }}
                          ></div>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={minPrice}
                            name="min"
                            onChange={handlePriceSliderChange}
                            className="min-val"
                          />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={maxPrice}
                            name="max"
                            onChange={handlePriceSliderChange}
                            className="max-val"
                          />

                          {/* Price Tooltip (Display price above thumb) */}
                          <div
                            className="price-tooltip min-tooltip"
                            style={{
                              left: `calc(${(minPrice / 100) * 100}%)`,
                              transform: "translateX(-50%)", // This ensures the tooltip is centered above the thumb
                              top: "-40px", // Adjust the value to move the tooltip above the thumb
                            }}
                          >
                            ${minPrice}
                          </div>
                          <div
                            className="price-tooltip max-tooltip"
                            style={{
                              left: `calc(${(maxPrice / 100) * 100}%)`,
                              transform: "translateX(-50%)", // Ensures the tooltip is centered above the thumb
                              top: "-40px", // Adjust this for the max input tooltip
                            }}
                          >
                            ${maxPrice}
                          </div>
                        </div>
                        <hr/>
                      </div>
                    </>
                  )}
                </div>
              </div>


              {/* Opening Hours Filter with Slider */}
              <div className="hour-filter-container">
                <div className="hour-filter">
                  <button
                    className="hour-select"
                    onClick={() => setShowHoursButtons(!showHoursButtons)}
                  >
                    Opening Hours
                    <span className="arrow">{showHoursButtons ? "▲" : "▼"}</span>
                  </button>

                  {showHoursButtons && (
                    <>
                      <div className="hour-double-slider-box">
                        <div className="hour-input-box">
                          <div
                            className="hour-min-box"
                            style={{
                              left: `calc(${(minHour / 24) * 100}%)`, // Assuming min/max range is from 0 to 24 hours
                              transform: "translateX(0%)",
                            }}
                          >
                            {/* Input box for min hour */}
                          </div>

                          <div
                            className="hour-max-box"
                            style={{
                              left: `calc(${(maxHour / 24) * 100}%)`,
                              transform: "translateX(-50%)",
                            }}
                          >
                            {/* Input box for max hour */}
                          </div>
                        </div>
                        
                        <div className="hour-range-slider">
                          <div
                            className="hour-slider-track"
                            style={{
                              left: `${(minHour / 24) * 100}%`,
                              width: `${((maxHour - minHour) / 24) * 100}%`, // Width adjusted for 24-hour range
                            }}
                          ></div>

                          <input
                            type="range"
                            min="0"
                            max="24"
                            value={minHour}
                            name="min"
                            onChange={handleHourSliderChange}
                            className="min-val"
                          />
                          <input
                            type="range"
                            min="0"
                            max="24"
                            value={maxHour}
                            name="max"
                            onChange={handleHourSliderChange}
                            className="max-val"
                          />

                          {/* Tooltip for opening hours */}
                          <div
                            className="hour-tooltip min-tooltip"
                            style={{
                              left: `calc(${(minHour / 24) * 100}%)`,
                              transform: "translateX(-50%)", // Ensures the tooltip is centered above the thumb
                              top: "-40px",
                            }}
                          >
                            {minHour}:00
                          </div>
                          <div
                            className="hour-tooltip max-tooltip"
                            style={{
                              left: `calc(${(maxHour / 24) * 100}%)`,
                              transform: "translateX(-50%)", // Ensures the tooltip is centered above the thumb
                              top: "-40px", 
                            }}
                          >
                            {maxHour}:00
                          </div>
                        </div>
                        <hr/>
                      </div>
                    </>
                  )}
                </div>
              </div>


              {/* District Filter */}
              <div className="district-filter">
                <button
                  className="district-select"
                  onClick={() => setShowDistrictButtons(!showDistrictButtons)}
                >
                  District
                  <span className="arrow">{showDistrictButtons ? "▲" : "▼"}</span>
                </button>

                {showDistrictButtons && (
                  <div className="district-buttons">
                    <button className="district-btn">Brunei-Muara</button>
                    <button className="district-btn">Tutong</button>
                    <button className="district-btn">Belait</button>
                    <button className="district-btn">Temburong</button>
                  </div>
                )}
              </div>

              {/* <h3>District</h3>
              <select className="filter-select">
                <option value="all">Districts</option>
                <option value="brunei-muara">Brunei-Muara</option>
                <option value="kota-batu">Tutong</option>
                <option value="seria">Belait</option>
                <option value="muara">Temburong</option>
              </select> */}
            </div>
          )}
        </div>
      </div>

      {/* Cards Section */}
      <section className="BuffetCard-dropdown-section">
        <div className="BuffetCard-container">
          {currentCards.map((card) => (
            <div key={card.id} className="BuffetCard">
              <img src={card.image} alt={card.title} className="BuffetCard-image" />
              <h3 className="BuffetCard-title">{card.title}</h3>
              <p className="BuffetCard-price">{card.priceDisplay}</p>
              <p className="BuffetCard-time">{card.time}</p>
              <p className="BuffetCard-district">{card.district}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* Page Numbers */}
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

      {/* Button to go back to Home Page */}
      <Link to="/">
        <button className="back-button">Go Back</button>
      </Link>
    </div>
  );
}

export default BuffetSection;
