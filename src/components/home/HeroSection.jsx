import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './HeroSection.css';

/**
 * HeroSection Component
 * Landing section with background video and CTA
 * Features full viewport height with overlay and Shop Now button
 */
const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/shop');
  };

  return (
    <section className="hero-section">
      {/* Background Video */}
      <video 
        className="hero-video"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source 
          src="/img/94f9e89deedd40468a339de892dcd74c.HD-1080p-7.2Mbps-66758600.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Overlay Content */}
      <div className="hero-overlay">
        <Container className="hero-content">
          <button 
            className="hero-cta"
            onClick={handleShopNowClick}
            aria-label="Shop now"
          >
            SHOP NOW
          </button>
        </Container>
      </div>
    </section>
  );
};

export default HeroSection;
