import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './Elements/HeroSection/HeroSection';
import MapSection from './Elements/MapSection/MapSection';  // Uncomment if needed
import AboutSection from './Elements/AboutSection/AboutSection';
import Footer from './Elements/Footer/Footer';
import Buffet from './Layout/Buffet';
import Bazaar from './Layout/Bazaar';
import Moreh from './Layout/Moreh';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <MapSection />
              <AboutSection />
              <Footer />
            </>
          }
        />
        <Route path="/buffet" element={<Buffet />} />
        <Route path="/bazaar" element={<Bazaar />} />
        <Route path="/moreh" element={<Moreh />} />
      </Routes>
    </Router>
  );
}

export default App;
