import { useState } from 'react';
import HeroSection from './Elements/HeroSection/HeroSection'
import MapSection from './Elements/MapSection/MapSection'
import AboutSection from './Elements/AboutSection/AboutSection'
import Footer from './Elements/Footer/Footer'
import './App.css';

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <MapSection />
      <AboutSection /> 
      {/* <ImageSection />
      <CarouselSection />
      <CardDropDownSection /> */}
      <Footer />
    </div>
  );
}

export default App;
