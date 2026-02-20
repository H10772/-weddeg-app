import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './AdminProducts.css';

/**
 * AdminOrders Component
 * View all orders
 */
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      setError('Failed to fetch orders: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderItems = async (orderId) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

      if (error) throw error;
      setOrderItems(data || []);
    } catch (error) {
      console.error('Failed to fetch order items:', error);
      setOrderItems([]);
    }
  };

  const handleViewOrder = async (order) => {
    setSelectedOrder(order);
    await fetchOrderItems(order.id);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setOrderItems([]);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'status-pending',
      processing: 'status-processing',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled'
    };
    return statusColors[status] || 'status-pending';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="loading-state">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Orders Management</h1>
            <p className="page-subtitle">View and manage customer orders</p>
          </div>
          <div className="header-actions">
            <Link to="/admin" className="btn-secondary">
              <i className="bi bi-arrow-left"></i> Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Messages */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Orders Table */}
        <div className="table-container">
          {orders.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-receipt"></i>
              <p>No orders yet</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div className="order-id">#{order.id.substring(0, 8)}</div>
                    </td>
                    <td>
                      <div className="product-name">{order.customer_name || 'N/A'}</div>
                      <div className="product-description">{order.customer_email}</div>
                    </td>
                    <td className="price-cell">${order.total}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{formatDate(order.created_at)}</td>
                    <td>
                      <button 
                        className="btn-icon btn-edit" 
                        onClick={() => handleViewOrder(order)}
                        title="View Details"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Order Details - #{selectedOrder.id.substring(0, 8)}</h2>
                <button className="modal-close" onClick={handleCloseModal}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <div className="modal-form">
                {/* Customer Info */}
                <div className="order-section">
                  <h3 className="section-title">Customer Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Name:</label>
                      <span>{selectedOrder.customer_name || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <span>{selectedOrder.customer_email}</span>
                    </div>
                    <div className="info-item">
                      <label>Phone:</label>
                      <span>{selectedOrder.customer_phone || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Status:</label>
                      <span className={`status-badge ${getStatusBadge(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                {selectedOrder.shipping_address && (
                  <div className="order-section">
                    <h3 className="section-title">Shipping Address</h3>
                    <p>{selectedOrder.shipping_address}</p>
                  </div>
                )}

                {/* Order Items */}
                <div className="order-section">
                  <h3 className="section-title">Order Items</h3>
                  {orderItems.length === 0 ? (
                    <p>No items found</p>
                  ) : (
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.product_name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td className="price-cell">${(item.quantity * item.price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Order Summary */}
                <div className="order-section">
                  <div className="order-summary">
                    <div className="summary-row">
                      <span>Order Date:</span>
                      <span>{formatDate(selectedOrder.created_at)}</span>
                    </div>
                    <div className="summary-row total-row">
                      <span>Total:</span>
                      <span>${selectedOrder.total}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminOrders;
