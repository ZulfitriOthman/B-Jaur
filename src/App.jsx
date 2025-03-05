import { useState } from 'react';
import HeroSection from './Elements/HeroSection/HeroSection'
import MapSection from './Elements/MapSection/MapSection'
import ImageSection from './Elements/ImageSection/ImageSection'
import AboutSection from './Elements/AboutSection/AboutSection'
import CarouselSection from './Elements/CarouselSection/CarouselSection'
import CardDropDownSection from './Elements/CardDropDownSection/CardDropDownSection'
import Footer from './Elements/Footer/Footer'
import './App.css';

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <MapSection />
      <ImageSection />  
      <AboutSection />
      <CarouselSection />
      <CardDropDownSection />
      <Footer />
    </div>
  );
}

export default App;
