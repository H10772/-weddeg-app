import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './AdminDashboard.css';

/**
 * AdminDashboard Component
 * Main admin dashboard with navigation to different sections
 */
const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-content">
            <div>
              <h1 className="admin-title">WED Admin Dashboard</h1>
              <p className="admin-subtitle">Manage your store</p>
            </div>
            {user && (
              <div className="admin-user-info">
                <div className="user-details">
                  <p className="user-email">{user.email}</p>
                  <p className="user-id">ID: {user.id.substring(0, 8)}...</p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="dashboard-grid">
          
          {/* Products Card */}
          <Link to="/admin/products" className="dashboard-card">
            <div className="card-icon">
              <i className="bi bi-box-seam"></i>
            </div>
            <h3 className="card-title">Products</h3>
            <p className="card-description">Add, edit, and manage products</p>
          </Link>

          {/* Categories Card */}
          <Link to="/admin/categories" className="dashboard-card">
            <div className="card-icon">
              <i className="bi bi-tags"></i>
            </div>
            <h3 className="card-title">Categories</h3>
            <p className="card-description">Manage product categories</p>
          </Link>

          {/* Sizes Card */}
          <Link to="/admin/sizes" className="dashboard-card">
            <div className="card-icon">
              <i className="bi bi-rulers"></i>
            </div>
            <h3 className="card-title">Sizes</h3>
            <p className="card-description">Manage available sizes</p>
          </Link>

          {/* Orders Card */}
          <Link to="/admin/orders" className="dashboard-card">
            <div className="card-icon">
              <i className="bi bi-receipt"></i>
            </div>
            <h3 className="card-title">Orders</h3>
            <p className="card-description">View and manage orders</p>
          </Link>

        </div>

        {/* Back to Store */}
        <div className="admin-footer">
          <Link to="/" className="back-to-store-btn">
            <i className="bi bi-arrow-left"></i> Back to Store
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
