import { useState } from 'react';
import CafeCard from '../../Components/CafeCard';
import CafeData from "../../Data/CafeData";
import './CafeList.css';

const CafeList = () => {
  // Set the number of items per page
  const itemsPerPage = 10;

  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for cafes to display
  const indexOfLastCafe = currentPage * itemsPerPage;
  const indexOfFirstCafe = indexOfLastCafe - itemsPerPage;
  const currentCafes = CafeData.slice(indexOfFirstCafe, indexOfLastCafe);

  // Calculate total number of pages
  const totalPages = Math.ceil(CafeData.length / itemsPerPage);

  // Calculate the cafe range to display in the pagination text
  const displayRangeStart = indexOfFirstCafe + 1;
  const displayRangeEnd = indexOfLastCafe > CafeData.length ? CafeData.length : indexOfLastCafe;

  // Log the values for debugging
  console.log(displayRangeStart, displayRangeEnd, CafeData.length);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="CafeList-container">
      <span className="pagination-range">{`${displayRangeStart} - ${displayRangeEnd} of ${CafeData.length} Cafes`}</span>
      
      <div className="CafeList-cards">
        {currentCafes.map((cafe) => (
          <CafeCard
            key={cafe.id}
            name={cafe.name}
            image={cafe.image}
            description={cafe.description}
            rating={cafe.rating}
            place={cafe.place}
            district={cafe.district}
          />
        ))}
      </div>

      <div className="pagination">
        <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Previous
        </button>
        <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            Next
        </button>
      </div>
    </section>
  );
};

export default CafeList;
