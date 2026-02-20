import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EssentialsSection.css';

/**
 * EssentialsSection Component
 * WED essentials section with horizontal scroll interaction
 */
const EssentialsSection = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Background images for the scroll effect
  const backgroundImages = [
    '/img/IMG_4091.jpg',
    '/img/IMG_4117.jpg',
    '/img/IMG_4130.jpg',
    '/img/IMG_4095.webp',
    '/img/IMG_4103.webp',
    '/img/IMG_4114.webp',
    '/img/IMG_4124.webp',
    '/img/IMG_4129.webp'
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Handle wheel event to convert vertical scroll to horizontal
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleShopNow = () => {
    navigate('/shop');
  };

  return (
    <section className="essentials-section">
      <div className="essentials-scroll-wrapper" ref={scrollContainerRef}>
        <div className="essentials-scroll-track">
          
          {/* Text Content as first item */}
          <div className="essentials-content">
            <div className="essentials-text">
              <h2 className="essentials-title">
                <span className="brand-name">WED</span> essentials
              </h2>
              <p className="essentials-description">
                Clean cuts, timeless comfort.
                <br />
                Essential pieces for daily wear.
                <br />
                built to last beyond the season.
              </p>
              
              <button className="shop-now-btn" onClick={handleShopNow}>
                Shop now
              </button>
            </div>
          </div>

          {/* Images - all same size */}
          {backgroundImages.map((image, index) => (
            <div 
              key={index} 
              className="image-slide"
            >
              <img 
                src={image} 
                alt={`WED Essential ${index + 1}`}
                className="essential-image"
              />
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default EssentialsSection;