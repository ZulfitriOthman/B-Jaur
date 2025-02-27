import { useState } from "react";
import "./ImageSection.css";
import image1 from "../../assets/Night-Market-1.jpg";
import image2 from "../../assets/Night-Market-2.jpg";
import image3 from "../../assets/Night-Market-1.jpg";
import image4 from "../../assets/Night-Market-2.jpg";

const images = [
  { id: 1, src: image1, title: "Night Market 1", category: "Food", price: 5 },
  { id: 2, src: image2, title: "Night Market 2", category: "Shopping", price: 20 },
  { id: 3, src: image3, title: "Street Food", category: "Food", price: 8 },
  { id: 4, src: image4, title: "Local Shops", category: "Shopping", price: 30 },
];

function ImageSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(50); // Default max price

  // Filter images based on search, category, and price range
  const filteredImages = images.filter((img) => {
    return (
      (selectedCategory === "All" || img.category === selectedCategory) &&
      img.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      img.price <= priceRange
    );
  });

  return (
    <section id="images" className="image-section">
      <div className="controls">
        <input
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
        </select>

        <div className="price-range">
          <label>Max Price: ${priceRange}</label>
          <input
            type="range"
            min="0"
            max="50"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="price-slider"
          />
        </div>
      </div>

      <div className="image-container">
        {filteredImages.length > 0 ? (
          filteredImages.map((img) => (
            <div key={img.id} className="image-card">
              <img src={img.src} alt={img.title} className="image" />
              <p className="image-title">{img.title}</p>
              <span className="image-category">{img.category}</span>
              <p className="image-price">${img.price}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No images found.</p>
        )}
      </div>
    </section>
  );
}

export default ImageSection;
