import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/product/ProductCard';
import { supabase } from '../lib/supabase';
import './ShopPage.css';

/**
 * ShopPage Component
 * Displays all products with grid/list view toggle
 */
const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
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
        .order('created_at', { ascending: false });

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
          : ['/img/placeholder.jpg'], // Fallback image
        inStock: true
      }));

      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="shop-page">
        <div className="container">
          {/* Header with View Toggle */}
          <div className="shop-header">
            <div className="text-center">
              <h1 className="shop-title">Shop</h1>
              <p className="shop-subtitle">Discover our essential collection</p>
            </div>
            
            {/* View Toggle Icons */}
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="4" rx="1"/>
                  <rect x="3" y="13" width="18" height="4" rx="1"/>
                </svg>
              </button>
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <p>Loading products...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && products.length === 0 && (
            <div className="empty-container">
              <p>No products available yet.</p>
            </div>
          )}

          {/* Products Grid/List */}
          {!loading && products.length > 0 && (
            <div className={`products-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;