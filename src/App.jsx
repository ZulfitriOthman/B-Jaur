import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './Elements/HeroSection/HeroSection';
import MapSection from './Elements/MapSection/MapSection';
import Footer from "./Elements/Footer/Footer";
import Buffet from './Layout/Buffet';
import Bazaar from './Layout/Bazaar';
import Moreh from './Layout/Moreh';

// Importing cafes sections
import Cafes from './Section/Cafe/Pages/Cafes';
import CafesList from './Section/Cafe/Pages/CafesList'; 
import './App.css';

function App() {
  return ( 
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <MapSection />
              <Footer />
            </>
          }
        />
        
        {/* Existing Sections */}
        <Route path="/buffet" element={<Buffet />} />
        <Route path="/bazaar" element={<Bazaar />} />
        <Route path="/moreh" element={<Moreh />} />

        {/* Cafes Sections */}
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/cafes-list" element={<CafesList />} />
      </Routes>
    </Router>
  );
}

export default App;
