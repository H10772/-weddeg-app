import { Container } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/product/ProductGrid';
import { products } from '../data/products';
import './ProductListingPage.css';

/**
 * ProductListingPage Component
 * Displays all products in grid layout
 */
const ProductListingPage = () => {
  return (
    <Layout>
      <Container className="product-listing-page text-center">
        <div className="page-header  text-center">
          <h1 className="page-title">Shop</h1>
          <p className="page-subtitle">Discover our essential collection</p>
        </div>
        <ProductGrid products={products} />
      </Container>
    </Layout>
  );
};

export default ProductListingPage;
