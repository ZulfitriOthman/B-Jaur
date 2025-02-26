import { useState } from "react";
import shop1 from "../../assets/Night-Market-1.jpg" /* Please name the shop1 base on the shop name */
import "./CardDropDownSection.css";

// Card data with image, title, address, and category
const initialCards = [
  {
    id: 1,
    image: shop1,
    title: "Card 1",
    address: "123 Market St, Cityville",
    category: "Shopping",
    content: "This is the first card"
  },
  {
    id: 2,
    image: shop1,
    title: "Card 2",
    address: "456 Park Ave, Metropolis",
    category: "Nature",
    content: "This is the second card"
  },
  {
    id: 3,
    image: shop1,
    title: "Card 3",
    address: "789 Oak St, Townsville",
    category: "Adventure",
    content: "This is the third card"
  }
];

const additionalCards = [
  {
    id: 4,
    image: shop1,
    title: "Card 4",
    address: "101 Pine St, Countryside",
    category: "History",
    content: "This is the fourth card"
  },
  {
    id: 5,
    image: shop1,
    title: "Card 5",
    address: "202 Maple St, Beachside",
    category: "Beach",
    content: "This is the fifth card"
  },
  {
    id: 6,
    image: shop1,
    title: "Card 6",
    address: "303 Birch St, Seaside",
    category: "Mountain",
    content: "This is the sixth card"
  },
  {
    id: 7,
    image: shop1,
    title: "Card 7",
    address: "404 Cedar St, Citycenter",
    category: "Urban",
    content: "This is the seventh card"
  },
  {
    id: 8,
    image: shop1,
    title: "Card 8",
    address: "505 Redwood St, Countryside",
    category: "Countryside",
    content: "This is the eighth card"
  }
];

function CardDropDownSection() {
  const [showAllCards, setShowAllCards] = useState(false);

  const cardsToShow = showAllCards ? [...initialCards, ...additionalCards] : initialCards;

  const toggleCardDisplay = () => {
    setShowAllCards(!showAllCards);
  };

  return (
    <section className="card-dropdown-section">
      <div className="card-container">
        {cardsToShow.map((card) => (
          <div key={card.id} className="card">
            <img src={card.image} alt={card.title} className="card-image" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-address">{card.address}</p>
            <span className="card-category">{card.category}</span>
            <p className="card-content">{card.content}</p>
          </div>
        ))}
      </div>
      <button className="toggle-button" onClick={toggleCardDisplay}>
        {showAllCards ? "Show Less" : "Show More"}
      </button>
    </section>
  );
}

export default CardDropDownSection;
