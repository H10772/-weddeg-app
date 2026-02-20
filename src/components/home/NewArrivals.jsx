import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProductCarousel from '../product/ProductCarousel';
import { supabase } from '../../lib/supabase';
import './NewArrivals.css';

/**
 * NewArrivals Component
 * Displays featured new arrival products on homepage
 * Shows products in horizontal scrollable layout
 */
const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(8); // Get latest 8 products

      if (error) throw error;

      // Transform data to match the expected format
      const transformedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.categories?.name || 'Uncategorized',
        images: product.images && product.images.length > 0 
          ? product.images 
          : ['/img/placeholder.jpg'],
        inStock: true
      }));

      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
    }
  };

  return (
    <section className="new-arrivals-section">
      <Container>
        <h2 className="new-arrivals-title">New Arrivals</h2>
      </Container>
      {products.length > 0 ? (
        <ProductCarousel products={products} />
      ) : (
        <Container>
          <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            No products available yet
          </p>
        </Container>
      )}
    </section>
  );
};

export default NewArrivals;
