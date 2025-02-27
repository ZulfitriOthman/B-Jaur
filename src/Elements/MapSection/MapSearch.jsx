// app/MapView/MapSearch.js
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './MapSearch.css';
// import { Outfit } from 'next/font/google';

// const outfit = Outfit({ weight: '500', subsets: ['latin'] });

const placesData = {
  'Brunei-Muara': ['Mentiri', 'Salambigar', 'Tagap', 'Tanjong Nangka', 'Katok', 'Serasa', 'Kapok', 'Tanah Jambu', 'Kiulap', 'Gadong', 'Lambak kiri', 'Jerudong', 'Rimba', 'Lambak kanan', 'Mulaut', 'Lumapas'],
  'Tutong': ['Batang Mitus', 'Penanjong', 'Lamunin', 'Kampong Keriam', 'Kampong Rambai', 'Danau', 'Kampong Bukit Beruang'],
  'Belait': ['Lumut', 'Seria', 'Sungai Liang', 'Panaga', 'Labi', 'Telisai'],
  'Temburong': ['Bangar', 'Batang Duri', 'Puni', 'Batu Apoi']
};

const MapSearch = ({ selectedDistrict, onSearch, setShowPropertyList }) => {
  const [query, setQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [showPlacesList, setShowPlacesList] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDistrict && placesData[selectedDistrict]) {
      const filtered = placesData[selectedDistrict].filter(place =>
        place.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlaces(filtered);
    } else {
      setFilteredPlaces([]);
    }
  }, [query, selectedDistrict]);

  const handleSearch = () => {
    if (query && selectedDistrict) {
      onSearch();
      console.log("Search query:", query);
      navigate(`/Properties/All?place=${query}`); // React Router navigation
      setShowPlacesList(true);
    }
  };

  const handleSelectPlace = (place) => {
    setQuery(place); // Set the query to the selected place
    setFilteredPlaces([]); // Hide suggestions after selection
    setShowPlacesList(true); // Show the places list after selection
  };

  const handleClickOutside = (event) => {
    if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
      setShowPlacesList(false); // Hide places list when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="map-search-container" ref={searchInputRef}>
      <div className="search-bar">
        <input
          type="text"
          className="search-input w-full sm:w-24 md:w-28 lg:w-80 p-2 pl-4 text-sm xs:text-sm sm:text-md md:text-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={selectedDistrict ? `Search ${selectedDistrict} areas` : 'Search areas'}
          onClick={() => setShowPlacesList(true)} // Show places list when clicking on search input
          disabled={!selectedDistrict} // Disable input if no district selected
        />
        <button onClick={handleSearch} 
          className="w-full sm:w-60 md:w-28 lg:w-32 p-1.5 mt-2 mb-2 text-white text-md xs:text-md sm:text-md md:text-lg lg:text-xl bg-[#d2a034] rounded-full" 
          disabled={!selectedDistrict}>
          Search
        </button>
      </div>
      {showPlacesList && filteredPlaces.length > 0 && (
        <ul className="places-list w-full sm:w-24 md:w-28 lg:w-80">
          {filteredPlaces.map((place, index) => (
            <li key={index} onClick={() => handleSelectPlace(place)}>
              {place}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapSearch;
