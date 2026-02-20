import ProductCard from './ProductCard';
import './ProductCarousel.css';

/**
 * ProductCarousel Component
 * Displays products in horizontal scrollable layout
 * Features smooth scrolling and responsive design
 * 
 * @param {Array} products - Array of product objects
 */
const ProductCarousel = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="product-carousel-container">
        <p className="text-center text-muted">No products available.</p>
      </div>
    );
  }

  return (
    <div className="product-carousel-container">
      <div className="product-carousel-scroll">
        {products.map((product) => (
          <div key={product.id} className="product-carousel-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;