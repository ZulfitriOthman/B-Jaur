import { useState } from 'react';
import HeroSection from './components/HeroSection/HeroSection'
import ImageSection from './components/ImageSection/ImageSection'
import AboutSection from './components/AboutSection/AboutSection'
import CarouselSection from './components/CarouselSection/CarouselSection'
import CardDropDownSection from './components/CardDropDownSection/CardDropDownSection'
import Footer from './components/Footer/Footer'
import './App.css';

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <ImageSection />
      test
      <AboutSection />
      <CarouselSection />
      <CardDropDownSection />
      <Footer />
    </div>
  );
}

export default App;
