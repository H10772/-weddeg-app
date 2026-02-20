import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './ProductCard.css';

/**
 * ProductCard Component
 * Displays individual product in grid or list view
 * Handles click navigation to product detail page
 * 
 * @param {Object} product - Product object with id, name, price, image, etc.
 * @param {String} viewMode - 'grid' or 'list' view mode
 */
const ProductCard = ({ product, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const imageSrc = imageError ? '/placeholder.jpg' : product.images[0];

  return (
    <Card 
      className={`product-card ${viewMode === 'list' ? 'list-mode' : 'grid-mode'}`}
      onClick={handleClick}
      role="article"
    >
      <div className="product-image-wrapper">
        {!imageLoaded && (
          <div className="product-image-placeholder">
            <div className="loading-spinner"></div>
          </div>
        )}
        <Card.Img
          variant="top"
          src={imageSrc}
          alt={product.name}
          className={`product-image ${imageLoaded ? 'loaded' : ''}`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <Card.Body className="product-card-body">
        <Card.Title className="product-name">{product.name}</Card.Title>
        <Card.Text className="product-price">
          {product.currency} {product.price.toFixed(2)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
