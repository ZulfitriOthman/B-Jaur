import { useState } from "react";
import PropTypes from "prop-types";
import { IoSearch, IoClose } from "react-icons/io5";
import "./CafeSearch.css"; 

const CafeSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="CafeSearch-container">
      <div className="CafeSearch-input-container">
        <IoSearch className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for cafes..."
          className="CafeSearch-input"
        />
        <IoClose className="close-icon" />
      </div>
    </div>
  );
};

CafeSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default CafeSearch;
