import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartBar.css';

/**
 * CartBar Component
 * Shows selected product at bottom of screen with add to cart option
 * Only visible on product detail pages
 * 
 * @param {Object} product - Selected product object
 */
const CartBar = ({ product }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { addToCart } = useCart();
  const location = useLocation();

  // Check if we're on a product detail page
  const isProductPage = location.pathname.startsWith('/product/');
  
  // Hide CartBar when navigating away from product pages
  useEffect(() => {
    if (!isProductPage) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [isProductPage]);

  // Don't render if not on product page, no product, or manually hidden
  if (!product || !isVisible || !isProductPage) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAddToCart = () => {
    addToCart(product);
    // Optional: Show success message or animation
    console.log('Added to cart:', product);
  };

  return (
    <div className="cart-bar">
      <div className="cart-bar-content">
        <div className="cart-bar-product">
          <div className="cart-bar-image">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="cart-bar-img"
            />
          </div>
          
          <div className="cart-bar-info">
            <h4 className="cart-bar-name">{product.name}</h4>
            <p className="cart-bar-price">
              {product.currency} {product.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="cart-bar-actions">
          <button 
            className="cart-bar-add-btn"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <i className="bi bi-bag"></i>
          </button>
          
          <button 
            className="cart-bar-close-btn"
            onClick={handleClose}
            aria-label="Close cart bar"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartBar;