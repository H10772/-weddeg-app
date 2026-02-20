import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchOverlay.css';

// Products data directly in this file
const searchProducts = [
  {
    id: "prod-001",
    name: "Ash Brown Jacket",
    price: 1150.00,
    image: "/img/IMG_4091.jpg"
  },
  {
    id: "prod-002",
    name: "Navy Jacket",
    price: 1300.00,
    image: "/img/IMG_4098_0a62a697-8421-4a83-9cea-f70677aca4af.webp"
  },
  {
    id: "prod-003",
    name: "Essential White Tee",
    price: 450.00,
    image: "/img/IMG_4114.webp"
  },
  {
    id: "prod-004",
    name: "Minimalist Coat",
    price: 1850.00,
    image: "/img/IMG_4124.webp"
  },
  {
    id: "prod-005",
    name: "Classic Blazer",
    price: 1650.00,
    image: "/img/IMG_4130.jpg"
  },
  {
    id: "prod-006",
    name: "Comfort Cardigan",
    price: 950.00,
    image: "/img/IMG_4143.webp"
  },
  {
    id: "prod-007",
    name: "Urban Jacket",
    price: 1450.00,
    image: "/img/IMG_4095.webp"
  },
  {
    id: "prod-008",
    name: "Essential Hoodie",
    price: 850.00,
    image: "/img/IMG_4103.webp"
  }
];

/**
 * SearchOverlay Component
 * Full-screen search overlay with recently viewed and products
 * 
 * @param {boolean} isOpen - Whether overlay is open
 * @param {function} onClose - Function to close overlay
 */
const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get recently viewed products from localStorage
    const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const recentProducts = recent
      .map(id => searchProducts.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 4);
    setRecentlyViewed(recentProducts);
    console.log('Recently viewed products:', recentProducts);
  }, [isOpen]);

  const handleProductClick = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleClearRecent = () => {
    localStorage.removeItem('recentlyViewed');
    setRecentlyViewed([]);
  };

  const filteredProducts = searchQuery
    ? searchProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchProducts;

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-overlay-content">
        
        {/* Search Header */}
        <div className="search-header">
          <div className="search-input-wrapper">
            <i className="bi bi-search search-icon"></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <button className="search-close-btn" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        {/* Search Body */}
        <div className="search-body">
          
          {/* Recently Viewed Section */}
          {!searchQuery && recentlyViewed.length > 0 && (
            <div className="search-section">
              <div className="section-header">
                <h3 className="section-title">Recently viewed</h3>
                <button className="clear-btn" onClick={handleClearRecent}>
                  Clear
                </button>
              </div>
              <div className="products-grid">
                {recentlyViewed.map((product) => (
                  <div
                    key={product.id}
                    className="search-product-card"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="product-image">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.classList.add('image-error');
                        }}
                      />
                      <div className="image-placeholder">
                        <i className="bi bi-image"></i>
                      </div>
                    </div>
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-price">LE {product.price.toFixed(2)} EGP</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Section */}
          <div className="search-section">
            <div className="section-header">
              <h3 className="section-title">
                {searchQuery ? 'Search Results' : 'Products'}
              </h3>
            </div>
            
            {searchQuery && filteredProducts.length === 0 ? (
              <p className="no-results">No products found</p>
            ) : (
              <div className="products-grid">
                {filteredProducts.slice(0, 8).map((product) => {
                  console.log('Product:', product.name, 'Image:', product.image);
                  return (
                    <div
                      key={product.id}
                      className="search-product-card"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="product-image">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          onLoad={() => console.log('Image loaded successfully:', product.image)}
                          onError={(e) => {
                            console.error('Image failed to load:', product.image);
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('image-error');
                          }}
                        />
                        <div className="image-placeholder">
                          <i className="bi bi-image"></i>
                        </div>
                      </div>
                      <h4 className="product-name">{product.name}</h4>
                      <p className="product-price">LE {product.price.toFixed(2)} EGP</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
