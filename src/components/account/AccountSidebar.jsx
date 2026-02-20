import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AccountSidebar.css';

/**
 * AccountSidebar Component
 * Shows account options in a bottom popup
 * 
 * @param {boolean} isOpen - Whether popup is open
 * @param {function} onClose - Function to close popup
 */
const AccountSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSignIn = () => {
    onClose();
    navigate('/signin');
  };

  const handleOrders = () => {
    onClose();
    if (isAuthenticated) {
      navigate('/orders');
    } else {
      navigate('/signin');
    }
  };

  const handleProfile = () => {
    onClose();
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/signin');
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="account-backdrop" onClick={onClose}></div>}
      
      {/* Bottom Popup */}
      <div className={`account-popup ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="account-header">
          <h3 className="account-title">Account</h3>
          <button className="account-close-btn" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        {/* Account Content */}
        <div className="account-content">
          
          {/* Sign In Button */}
          <button className="sign-in-btn" onClick={handleSignIn}>
            Sign in
          </button>

          {/* Account Options */}
          <div className="account-options">
            <button className="account-option-btn" onClick={handleOrders}>
              <i className="bi bi-bag"></i>
              <span>Orders</span>
            </button>
            
            <button className="account-option-btn" onClick={handleProfile}>
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default AccountSidebar;