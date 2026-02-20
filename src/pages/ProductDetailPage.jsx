import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Collapse } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import ProductGallery from '../components/product/ProductGallery';
import ProductCarousel from '../components/product/ProductCarousel';
import CartBar from '../components/cart/CartBar';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import './ProductDetailPage.css';

/**
 * ProductDetailPage Component
 * Shows detailed product information with images and purchase options
 */
const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();
  
  // Fetch product from Supabase
  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
  }, [id]);
  
  const fetchProduct = async () => {
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
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        // Transform data to match expected format
        const transformedProduct = {
          id: data.id,
          name: data.name,
          price: data.price,
          description: data.description || 'No description available',
          category: data.categories?.name || 'Uncategorized',
          images: data.images && data.images.length > 0 
            ? data.images 
            : ['/img/placeholder.jpg'],
          inStock: true,
          currency: 'EGP',
          sizes: ['S', 'M', 'L', 'XL'] // Default sizes, can be fetched from sizes table if needed
        };
        setProduct(transformedProduct);
        
        // Save to recently viewed
        const recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        const filtered = recent.filter(pid => pid !== id);
        const updated = [id, ...filtered].slice(0, 10);
        localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
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
        .neq('id', id)
        .limit(6);

      if (error) throw error;

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

      setRelatedProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };
  
  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    details: false,
    sizeFit: false,
    delivery: false,
    care: false,
    refund: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  // Handle loading state
  if (loading) {
    return (
      <Layout>
        <Container className="product-detail-page">
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p>Loading product...</p>
          </div>
        </Container>
      </Layout>
    );
  }

  // Handle product not found
  if (!product) {
    return (
      <Layout>
        <Container className="product-not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <Button href="/shop" variant="dark">
            Back to Shop
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="product-detail-page">
        <Row className="g-4">
          {/* Product Gallery */}
          <Col md={6}>
            <ProductGallery 
              images={product.images} 
              productName={product.name}
            />
          </Col>

          {/* Product Information */}
          <Col md={6}>
            <div className="product-info">
              <h1 className="product-detail-name">{product.name}</h1>
              
              <p className="product-detail-price">
                {product.currency} {product.price.toFixed(2)}
              </p>

              {/* Add to Cart Button */}
              <Button 
                variant="dark" 
                size="lg" 
                className="add-to-cart-btn"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <i className="bi bi-bag"></i> Add to cart
              </Button>

              {/* Collapsible Sections */}
              <div className="product-sections">
                {/* Product Details */}
                <div className="product-section">
                  <button 
                    className="section-header"
                    onClick={() => toggleSection('details')}
                    aria-expanded={openSections.details}
                  >
                    <div className="section-left">
                      <i className="bi bi-info-circle"></i>
                      <span>PRODUCT DETAILS</span>
                    </div>
                    <div className="section-right">
                      <i className={`bi bi-${openSections.details ? 'dash' : 'plus'}`}></i>
                    </div>
                  </button>
                  <Collapse in={openSections.details}>
                    <div className="section-content">
                      <p>{product.description}</p>
                      <ul>
                        <li>Category: {product.category}</li>
                        <li>Material: Premium quality fabric</li>
                        <li>Care: Machine washable</li>
                      </ul>
                    </div>
                  </Collapse>
                </div>

                {/* Size & Fit */}
                <div className="product-section">
                  <button 
                    className="section-header"
                    onClick={() => toggleSection('sizeFit')}
                    aria-expanded={openSections.sizeFit}
                  >
                    <div className="section-left">
                      <i className="bi bi-rulers"></i>
                      <span>SIZE & FIT</span>
                    </div>
                    <div className="section-right">
                      <i className={`bi bi-${openSections.sizeFit ? 'dash' : 'plus'}`}></i>
                    </div>
                  </button>
                  <Collapse in={openSections.sizeFit}>
                    <div className="section-content">
                      <p>Available sizes: {product.sizes.join(', ')}</p>
                      <p>Model is wearing size M</p>
                      <p>True to size fit</p>
                    </div>
                  </Collapse>
                </div>

                {/* Delivery */}
                <div className="product-section">
                  <button 
                    className="section-header"
                    onClick={() => toggleSection('delivery')}
                    aria-expanded={openSections.delivery}
                  >
                    <div className="section-left">
                      <i className="bi bi-question-circle"></i>
                      <span>WHEN WILL I GET MY ORDER?</span>
                    </div>
                    <div className="section-right">
                      <i className={`bi bi-${openSections.delivery ? 'dash' : 'plus'}`}></i>
                    </div>
                  </button>
                  <Collapse in={openSections.delivery}>
                    <div className="section-content">
                      <p>Standard delivery: 3-5 business days</p>
                      <p>Express delivery: 1-2 business days</p>
                      <p>Free shipping on orders over 1000 EGP</p>
                    </div>
                  </Collapse>
                </div>

                {/* Care & Maintenance */}
                <div className="product-section">
                  <button 
                    className="section-header"
                    onClick={() => toggleSection('care')}
                    aria-expanded={openSections.care}
                  >
                    <div className="section-left">
                      <i className="bi bi-heart"></i>
                      <span>CARE & MAINTENANCE</span>
                    </div>
                    <div className="section-right">
                      <i className={`bi bi-${openSections.care ? 'dash' : 'plus'}`}></i>
                    </div>
                  </button>
                  <Collapse in={openSections.care}>
                    <div className="section-content">
                      <p>Machine wash cold with like colors</p>
                      <p>Do not bleach</p>
                      <p>Tumble dry low</p>
                      <p>Iron on low heat if needed</p>
                    </div>
                  </Collapse>
                </div>

                {/* Refund & Exchange Policy */}
                <div className="product-section">
                  <button 
                    className="section-header"
                    onClick={() => toggleSection('refund')}
                    aria-expanded={openSections.refund}
                  >
                    <div className="section-left">
                      <i className="bi bi-arrow-repeat"></i>
                      <span>REFUND & EXCHANGE POLICY</span>
                    </div>
                    <div className="section-right">
                      <i className={`bi bi-${openSections.refund ? 'dash' : 'plus'}`}></i>
                    </div>
                  </button>
                  <Collapse in={openSections.refund}>
                    <div className="section-content">
                      <p><strong>Inspection Upon Delivery</strong></p>
                      <p>Please inspect your order immediately upon delivery and before the courier leaves.</p>
                      
                      <p><strong>Returns & Exchanges at Delivery Only</strong></p>
                      <p>Any request for refund or exchange must be made at the time of delivery by returning the full package to the courier. Only the delivery fee will be charged. For exchanges, a new order must be placed online.</p>
                      
                      <p><strong>Responsibility After Acceptance</strong></p>
                      <p>Once the order is accepted and the courier departs, the items become the customer's full responsibility. No refunds or exchanges will be processed after delivery.</p>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Related Items Section */}
        <Row className="related-items-section">
          <Col xs={12}>
            <h3 className="related-items-title">Related items</h3>
            <ProductCarousel products={relatedProducts} />
          </Col>
        </Row>
      </Container>
      
      {/* Cart Bar */}
      <CartBar product={product} />
    </Layout>
  );
};

export default ProductDetailPage;
