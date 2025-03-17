import { FaChevronDown } from "react-icons/fa";
import "./HeroSection.css";
import BJaurLogo from "../../assets/BJaurLogo.png";
import SearchIcon from "../../assets/SearchIcon.png";
import Border from "../../assets/Border.png"; // Importing the border image

function HeroSection() {
  const scrollToMapSection = () => {
    const mapSection = document.getElementById("map-section");
    if (mapSection) {
      window.scrollTo({
        top: mapSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-border-container">
        <img src={Border} alt="Border" className="hero-border" />
        <div className="hero-content">
          <h1 className="hero-year">٢٠٢٥</h1>

          <div className="hero-text">
            <span className="highlight-text">Berbuka</span> 
            <img src={BJaurLogo} alt="B-Jaur Logo" className="b-jaurLogo" /> 
            <span className="normal-text">Bersahur</span>
          </div>

          <div className="hero-descriptionBox">
            <p className="hero-description">
              Discover Brunei’s Best Sungkai, Sahur & Late-Night Eats <br />
              – Your Guide to Ramadhan Dining!
            </p>
          </div>

          <div className="search-container-restaurantBox">
            <div className="search-container-restaurant">
              <input
                type="text"
                placeholder="Search for restaurants, stalls..."
                className="search-restaurant"
              />
              <button className="look-button">
                <img src={SearchIcon} alt="Search" className="search-icon" />
              </button>
            </div>
          </div>

          <button className="down-arrow" onClick={scrollToMapSection}>
            <FaChevronDown />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
