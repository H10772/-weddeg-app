import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import './ProductGrid.css';

/**
 * ProductGrid Component
 * Arranges ProductCard components in responsive grid
 * - Desktop (≥1200px): 4 columns
 * - Tablet (768px-1199px): 3 columns
 * - Mobile (<768px): 2 columns
 * 
 * @param {Array} products - Array of product objects
 */
const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <Container>
        <p className="text-center text-muted">No products available.</p>
      </Container>
    );
  }

  return (
    <Container className="product-grid-container">
      <Row className="g-4">
        {products.map((product) => (
          <Col 
            key={product.id} 
            xs={6} 
            md={4} 
            xl={3}
            className="product-grid-col"
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductGrid;
