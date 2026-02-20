import { useState, useCallback, useRef } from 'react';
import './ProductGallery.css';

/**
 * ProductGallery Component
 * Displays product images with dot navigation and swipe support
 * Click dot or swipe to change main image
 * 
 * @param {Array} images - Array of image URLs
 * @param {string} productName - Product name for alt text
 */
const ProductGallery = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleDotClick = (index) => {
    setSelectedImageIndex(index);
  };

  const nextImage = useCallback(() => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  }, [selectedImageIndex, images.length]);

  const prevImage = useCallback(() => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  }, [selectedImageIndex]);

  const handleTouchStart = (e) => {
    e.preventDefault();
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - next image
        nextImage();
      } else {
        // Swiped right - previous image
        prevImage();
      }
    }
  };

  if (!images || images.length === 0) {
    return <div className="no-images">No images available</div>;
  }

  return (
    <div className="product-gallery">
      {/* Main Image */}
      <div 
        className="main-image-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[selectedImageIndex]}
          alt={`${productName} - main`}
          className="main-image"
          draggable={false}
        />
      </div>

      {/* Dot Navigation */}
      {images.length > 1 && (
        <div className="dot-navigation">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === selectedImageIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
