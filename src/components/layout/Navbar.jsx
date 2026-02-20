import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import CartSidebar from '../cart/CartSidebar';
import AccountSidebar from '../account/AccountSidebar';
import SearchOverlay from '../search/SearchOverlay';
import './Navbar.css';

/**
 * Navbar Component
 * Provides consistent navigation across all pages
 * Features: Hamburger menu (left), Search, Logo (center), User & Cart icons (right)
 * Transparent on hero section, solid when scrolled
 */
const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleAccountToggle = () => {
    setAccountOpen(!accountOpen);
  };

  const handleAccountClose = () => {
    setAccountOpen(false);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const handleProductClick = () => {
    setExpanded(false); // Close the menu
    navigate('/shop'); // Navigate to shop page
  };

  return (
    <BootstrapNavbar 
      fixed="top" 
      className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
      expanded={expanded}
    >
      <Container fluid className="navbar-container">
        {/* Left Side: Hamburger Menu + Search */}
        <div className="navbar-left">
          <button 
            className="navbar-icon-btn hamburger-btn"
            onClick={handleToggle}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <button 
            className="navbar-icon-btn search-btn"
            aria-label="Search"
            onClick={handleSearchToggle}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>

        {/* Center: Logo */}
        <Link to="/" className="navbar-logo-center">
          <img 
            src="/img/wed_logo_transparent_cropped.avif" 
            alt="WED Logo" 
            className="navbar-logo-img"
          />
        </Link>

        {/* Right Side: User + Cart Icons */}
        <div className="navbar-right">
          <button 
            className="navbar-icon-btn user-btn"
            aria-label="User Account"
            onClick={handleAccountToggle}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          
          <button 
            className="navbar-icon-btn cart-btn"
            aria-label="Shopping Cart"
            onClick={handleCartToggle}
          >
            <div className="cart-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && (
                <span className="cart-counter">{cartCount}</span>
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {expanded && (
          <div className="mobile-menu">
            <button 
              className="mobile-menu-close"
              onClick={() => setExpanded(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Navigation Links */}
            <div className="mobile-menu-nav">
              <Link to="/" className="mobile-menu-link" onClick={() => setExpanded(false)}>
                Home
              </Link>
              <Link to="/shop" className="mobile-menu-link" onClick={() => setExpanded(false)}>
                Shop All
              </Link>
              <Link to="/returns" className="mobile-menu-link" onClick={() => setExpanded(false)}>
                Return & Exchange Policy
              </Link>
              <Link to="/contact" className="mobile-menu-link" onClick={() => setExpanded(false)}>
                CONTACT US
              </Link>
            </div>

            {/* Products Section */}
            <div className="mobile-menu-products">
              <h3 className="mobile-menu-products-title">Products</h3>
              <div className="mobile-menu-product-grid">
                {products.slice(0, 1).map((product) => (
                  <div 
                    key={product.id} 
                    className="mobile-menu-product-item"
                    onClick={handleProductClick}
                  >
                    <div className="mobile-menu-product-image">
                      <img src={product.images[0]} alt={product.name} />
                      <div className="mobile-menu-product-overlay">
                        <span>Products</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
      
      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={handleCartClose} />
      
      {/* Account Sidebar */}
      <AccountSidebar isOpen={accountOpen} onClose={handleAccountClose} />
      
      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={handleSearchClose} />
    </BootstrapNavbar>
  );
};

export default Navbar;
