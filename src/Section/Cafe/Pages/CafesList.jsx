import { useState } from "react";
import CafeSearch from "../Components/MapListPage/CafeSearch";
import CafeFilter from "../Components/MapListPage/CafeFilter";
import CafeList from "../Components/MapListPage/CafeList";
import CafeMap from "../Components/MapListPage/CafeMap";
import CafeData from "../Data/CafeData"; 
import './CafesList.css';

const CafesList = () => {
  const [filteredCafes, setFilteredCafes] = useState(CafeData);  
  const [searchTerm, setSearchTerm] = useState('');  

  // Handle search term filtering
  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();  
    const filtered = CafeData.filter((cafe) => {
      return (
        cafe.name.toLowerCase().includes(lowerCaseSearchTerm) ||   
        cafe.description.toLowerCase().includes(lowerCaseSearchTerm) || 
        cafe.place.toLowerCase().includes(lowerCaseSearchTerm)  
      );
    });

    setSearchTerm(searchTerm);  
    setFilteredCafes(filtered);  
  };

  const handleFilter = (filter) => {
    let filtered = CafeData;

    switch (filter) {
      case 'New':
        filtered = CafeData.filter(cafe => cafe.isNew);
        break;
      case 'District':
        filtered = CafeData.filter(cafe => cafe.district === 'Brunei-Muara'); 
        break;
      case 'Outdoor Setting':
        filtered = CafeData.filter(cafe => cafe.features.includes("Outdoor Setting"));
        break;
      case 'Free Wifi':
        filtered = CafeData.filter(cafe => cafe.features.includes("Free Wifi"));
        break;
      case 'Desserts':
        filtered = CafeData.filter(cafe => cafe.features.includes("Desserts"));
        break;
      case 'Card Payment':
        filtered = CafeData.filter(cafe => cafe.features.includes("Card Payment"));
        break;
      case 'Charging Ports':
        filtered = CafeData.filter(cafe => cafe.features.includes("Charging Ports"));
        break;
      case 'All':
        filtered = CafeData; 
        break;
      default:
        filtered = CafeData;
    }

    if (searchTerm) {
      filtered = filtered.filter((cafe) => {
        return (
          cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cafe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cafe.place.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    setFilteredCafes(filtered);  
  };

  return (
    <div className="cafes-container">
      <div className="cafesSearchFilter-container">
        <CafeSearch onSearch={handleSearch} />
        <CafeFilter onFilter={handleFilter} />  
      </div>

      <div className="cafesList-container">
        <div className="cafesList-left">
          <CafeList cafes={filteredCafes} />
        </div>
        <div className="cafesList-right">
          <CafeMap cafes={filteredCafes} />
        </div>
      </div>
    </div>
  );
};

export default CafesList;
