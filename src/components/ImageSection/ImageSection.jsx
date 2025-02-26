import './ImageSection.css';
import image1 from '../../assets/Night-Market-1.jpg';
import image2 from '../../assets/Night-Market-2.jpg';

function ImageSection() {
  return (
    <section id="images" className="image-section">
      <div className="image-container">
        <img src={image1} alt="First" className="image" />
        <img src={image2} alt="Second" className="image" />
      </div>
    </section>
  );
}

export default ImageSection;
