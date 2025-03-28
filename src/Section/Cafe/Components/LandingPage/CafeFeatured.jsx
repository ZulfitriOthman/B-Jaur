import './CafeFeatured.css';
import CafeCard from '../CafeCard'; 
import CafeData from "../../Data/CafeData";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const CafeFeatured = () => {
const navigate = useNavigate(); 

  return (
    <section className="Cafe-Featured">
      <h2 className="CafeFeatured-title">Featured Cafes of the Month</h2>
      <p className="CafeFeatured-subtitle">
        Explore some of the most loved cafes in Brunei, handpicked for their unique atmosphere and delicious offerings.
      </p>

      <div className="CafeFeatured-cards">
        {CafeData.map((cafe) => (
          <CafeCard
            key={cafe.id}
            name={cafe.name}
            image={cafe.image}
            description={cafe.description}
            rating={cafe.rating}
            place={cafe.place}
          />
        ))}
      </div>

      <div className="CafeFeatured-explore-button">
        <button className="CafeFeatured-btn" onClick={() => navigate("/cafes-list")}>
          Explore All Cafes <FaArrowRight className="cafe-ExploreRight-arrow" />
        </button>
      </div>
    </section>
  );
};

export default CafeFeatured;
