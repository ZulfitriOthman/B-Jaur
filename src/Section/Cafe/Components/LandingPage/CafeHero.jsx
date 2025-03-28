import './CafeHero.css';
import GreenMap from "../../../../assets/Cafes/Green-BruneiMap.png";
import DottedLine from "../../../../assets/Cafes/DottedLine.png";
import MapPin from "../../../../assets/Cafes/3d-MapPin.png";
import MapPin2 from "../../../../assets/Cafes/3d-MapPin.png";
import CafePoints1 from "../../../../assets/Cafes/CafePoints1.png";
import CafePoints2 from "../../../../assets/Cafes/CafePoints2.png";
import CafePoints3 from "../../../../assets/Cafes/CafePoints3.png";
import CafePoints4 from "../../../../assets/Cafes/CafePoints4.png";
import CafePoints5 from "../../../../assets/Cafes/CafePoints5.png";

const CafeHero = () => {
  return (
    <section className="cafeHero-container">
        <img src={MapPin} alt="Map Pin" className="MapPin" />
        <img src={MapPin2} alt="Map Pin" className="MapPin2" />
        <img src={DottedLine} alt="Dotted Line" className="DottedLine" />
        <img src={GreenMap} alt="Green Map" className="GreenMap" />
        
        <img src={CafePoints1} alt="Cafe Points1" className="CafePoints1" />
        <img src={CafePoints2} alt="Cafe Points2" className="CafePoints2" />
        <img src={CafePoints3} alt="Cafe Points3" className="CafePoints3" />
        <img src={CafePoints4} alt="Cafe Points4" className="CafePoints4" />
        <img src={CafePoints5} alt="Cafe Points5" className="CafePoints5" />
        
        <div className="cafeHero-content">
            <h2 className="cafeHero-title">Discover the Best Cafes in Town</h2>
            <p className="cafeHero-subtitle">Explore cozy spots, great coffee, and delicious bites.</p>

            {/* Search Bar with Button */}
            <div className="cafeHero-search-bar">
            <input 
                type="text" 
                placeholder="Search for cafes..." 
                className="cafeHero-search-input"
            />
            <button className="cafeHero-search-button">
                <i className="fas fa-search"></i> 
                Search
            </button>
            </div>
        </div>
    </section>
  );
};

export default CafeHero;
