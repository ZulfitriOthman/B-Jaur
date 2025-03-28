import './CafeCard.css';
import { MdStar } from "react-icons/md";

const CafeCard = ({ name, image, description, rating, place, district,  }) => {
  return (
    <div className="cafe-card">
      {/* Rating */}
      <div className="cafe-card-rating">
        <MdStar className="cafe-card-star" />
        {rating}
      </div>

      <img src={image} alt={name} className="cafe-card-image" />
      <div className="cafe-card-info">
        <h3 className="cafe-card-name">{name}</h3>
        <p className="cafe-card-description">{description}</p>
        <p className="cafe-card-place">{place}</p>
        <p className="cafe-card-district">{district}</p>
      </div>
    </div>
  );
};

export default CafeCard;
