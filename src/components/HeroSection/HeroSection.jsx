import './HeroSection.css';

function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="news-banner">
        <p>🚀 New update: Check out our latest blog post on travel adventures!</p>
      </div>
      <div className="hero-content">
        <h1>Welcome to My Vlog</h1>
        <p>Sharing my thoughts, experiences, and adventures.</p>
        <a href="#about" className="cta-button">Explore More</a>
      </div>
    </section>
  );
}

export default HeroSection;
