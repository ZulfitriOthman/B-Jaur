import PropTypes from 'prop-types';
import './CafeFilter.css';

const CafeFilter = ({ onFilter }) => {
  const filters = [
    'All',
    'New',
    'District',
    'Outdoor Setting',
    'Free Wifi',
    'Desserts',
    'Card Payment',
    'Charging Ports'
  ];

  const handleFilterClick = (filter) => {
    onFilter(filter); 
  };

  return (
    <div className="CafeFilter-container">
      {filters.map((filter) => (
        <button
          key={filter}
          className="CafeFilter-button"
          onClick={() => handleFilterClick(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

CafeFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default CafeFilter;
