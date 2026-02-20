import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

/**
 * ProfilePage Component
 * User profile management page
 */
const ProfilePage = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);
  
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: user?.phone || '+1 234 567 8900',
    address: user?.address || '123 Main St, City, Country'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    // Handle profile update
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-container">
          
          <div className="profile-header">
            <h1 className="profile-title">My Profile</h1>
            <p className="profile-subtitle">Manage your account information</p>
          </div>

          <div className="profile-content">
            
            {/* Profile Form */}
            <form className="profile-form" onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="3"
                />
              </div>

              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>

            {/* Sign Out Button */}
            <button className="signout-btn" onClick={handleSignOut}>
              Sign Out
            </button>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
