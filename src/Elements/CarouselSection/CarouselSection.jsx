import { useState } from "react";
import shop1 from "../../assets/Night-Market-1.jpg" /* Please name the shop1 base on the shop name */
import "./CarouselSection.css";

const slides = [
  {
    image: shop1,
    title: "Nature's Beauty",
    description: "Explore breathtaking landscapes and the wonders of nature.",
    category: "Nature",
  },
  {
    image: shop1,
    title: "City Life",
    description: "Discover the vibrant cityscapes and urban experiences.",
    category: "Urban",
  },
  {
    image: shop1,
    title: "Travel Adventures",
    description: "Unforgettable journeys and amazing destinations await.",
    category: "Travel",
  },
];

function CarouselSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState("active");
  
    const nextSlide = () => {
      setAnimationClass("slide-left-out"); // Set current image to slide out left
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        setAnimationClass("slide-left"); // Set new image to slide in from the right
      }, 500); // Wait for 500ms (duration of the animation)
    };
  
    const prevSlide = () => {
      setAnimationClass("slide-right-out"); // Set current image to slide out right
      setTimeout(() => {
         setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
         setAnimationClass("slide-right"); // Set new image to slide in from the left
       }, 500); // Wait for 500ms (duration of the animation)
    };
  
    return (
      <section id="carousel" className="carousel-section">
        <button className="carousel-btn prev" onClick={prevSlide}>
          ❮
        </button>
        <div className="carousel-container">
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className={`carousel-image ${animationClass}`}
          />
          <div className="carousel-content">
            <span className="carousel-category">{slides[currentIndex].category}</span>
            <h2>{slides[currentIndex].title}</h2>
            <p>{slides[currentIndex].description}</p>
          </div>
        </div>
        <button className="carousel-btn next" onClick={nextSlide}>
          ❯
        </button>
      </section>
    );
  }

export default CarouselSection;
