import { FaChevronDown } from "react-icons/fa";
import "./HeroSection.css";
import BJaurLogo from "../../assets/BJaurLogo.png";
import SearchIcon from "../../assets/SearchIcon.png";
// import MinimalistRamadan from "../../assets/MinimalistRamadan.png"
//import img from '../../assets/Small-Design-Hero-Section.png';

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
      {/* SVG Outline Border */}
      <svg width="100%" height="100vh" viewBox="0 0 800 600" className="hero-svg">
        <path 
          // d="M40,150 L400,150 L760,150 V580 H40 Z"
          d="M40,150 Q400,-50 760,150 V580 H40 Z"
          fill="rgba(255, 255, 255, 0)"
          stroke="white"
          strokeWidth="8"
        />
        <foreignObject x="50" y="100" width="700" height="475">
          <div className="hero-content">
            <h1 className="hero-year">٢٠٢٥</h1>

            <div className="hero-text">
              <span className="highlight-text">Berbuka</span> 
              <img src={BJaurLogo} alt="B-Jaur Logo" className="b-jaurLogo" /> 
              <span className="normal-text">Bersahur</span>
            </div>

            <div className="hero-descriptionBox">
              <p className="hero-description">
                Discover Brunei’s Best Sungkai, Sahur & Late-Night Eats <br/>
                – Your Guide to Ramadhan Dining!
              </p>
            </div>

            <div className="search-container-restaurantBox">
              <div className="search-container-restaurant">
                <input type="text" placeholder="Search for restaurants, stalls..." className="search-restaurant" />
                <button className="look-button">
                  <img src={SearchIcon} alt="Search" className="search-icon" />
                </button>
              </div>
            </div>

            <button className="down-arrow" onClick={scrollToMapSection}>
              <FaChevronDown />
            </button>
          </div>
        </foreignObject>
      </svg>
    </section>
  );
}

export default HeroSection;
