import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './OrdersPage.css';

/**
 * OrdersPage Component
 * Display user's order history
 */
const OrdersPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: 299.99,
      status: 'Delivered',
      items: 2,
      image: '/img/IMG_4091.jpg'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      total: 149.99,
      status: 'Shipped',
      items: 1,
      image: '/img/IMG_4117.jpg'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      total: 449.99,
      status: 'Processing',
      items: 3,
      image: '/img/IMG_4130.jpg'
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'status-delivered';
      case 'Shipped':
        return 'status-shipped';
      case 'Processing':
        return 'status-processing';
      default:
        return '';
    }
  };

  const handleOrderClick = (orderId) => {
    console.log('View order:', orderId);
    // Navigate to order details
  };

  return (
    <Layout>
      <div className="orders-page">
        <div className="orders-container">
          
          <div className="orders-header">
            <h1 className="orders-title">My Orders</h1>
            <p className="orders-subtitle">View and track your orders</p>
          </div>

          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="order-card"
                  onClick={() => handleOrderClick(order.id)}
                >
                  <div className="order-image">
                    <img src={order.image} alt={`Order ${order.id}`} />
                  </div>
                  
                  <div className="order-details">
                    <div className="order-header-row">
                      <h3 className="order-id">{order.id}</h3>
                      <span className={`order-status ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <p className="order-date">{new Date(order.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                    
                    <div className="order-footer">
                      <span className="order-items">{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                      <span className="order-total">EGP {order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="orders-empty">
              <div className="empty-icon">
                <i className="bi bi-bag-x"></i>
              </div>
              <h3>No Orders Yet</h3>
              <p>Start shopping to see your orders here</p>
              <button className="shop-btn" onClick={() => navigate('/shop')}>
                Shop Now
              </button>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;
