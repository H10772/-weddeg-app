import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartSidebar.css';

/**
 * CartSidebar Component
 * Shows cart items in a sliding sidebar
 * 
 * @param {boolean} isOpen - Whether sidebar is open
 * @param {function} onClose - Function to close sidebar
 */
const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, cartCount, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleQuantityChange = (item, change) => {
    if (change > 0) {
      addToCart(item);
    } else if (change < 0) {
      removeFromCart(item.id);
    }
  };

  const handleRemoveItem = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      // Remove all quantities of this item
      for (let i = 0; i < item.quantity; i++) {
        removeFromCart(itemId);
      }
    }
  };

  const handleDiscountToggle = () => {
    setDiscountOpen(!discountOpen);
  };

  const handleApplyDiscount = () => {
    // Handle discount application logic here
    console.log('Applying discount code:', discountCode);
    // You can add actual discount logic here
  };

  const handleCheckout = () => {
    onClose(); // Close the sidebar
    navigate('/checkout'); // Navigate to checkout page
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="cart-backdrop" onClick={onClose}></div>}
      
      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <h3 className="cart-title">Cart <span className="cart-count">{cartCount}</span></h3>
          <button className="cart-close-btn" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.images[0]} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">{item.currency} {item.price.toFixed(2)}</p>
                  
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item, -1)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                  
                  <p className="cart-item-total">
                    {item.currency} {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="discount-section">
              <button 
                className="discount-btn"
                onClick={handleDiscountToggle}
              >
                <span>Discount</span>
                <i className={`bi bi-${discountOpen ? 'dash' : 'plus'}`}></i>
              </button>
              
              {discountOpen && (
                <div className="discount-form">
                  <div className="discount-input-group">
                    <input
                      type="text"
                      className="discount-input"
                      placeholder="Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <button 
                      className="apply-btn"
                      onClick={handleApplyDiscount}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="cart-total">
              <div className="total-row">
                <span className="total-label">Estimated total</span>
                <span className="total-amount">
                  LE {getTotalPrice().toFixed(2)} EGP
                </span>
              </div>
              <p className="total-note">Taxes and shipping calculated at checkout.</p>
            </div>
            
            <button className="checkout-btn" onClick={handleCheckout}>
              Check out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;