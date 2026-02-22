import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProductCarousel from '../product/ProductCarousel';
import { supabase } from '../../lib/supabase';
import { products as staticProducts } from '../../data/products';
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
        .limit(8);

      if (error) throw error;

      // Transform Supabase data
      const supabaseProducts = (data || []).map(product => ({
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

      // Combine with static products and take first 8
      const allProducts = [...supabaseProducts, ...staticProducts].slice(0, 8);
      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      // Fallback to static products
      setProducts(staticProducts.slice(0, 8));
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
