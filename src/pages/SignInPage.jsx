import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignInPage.css';

/**
 * SignInPage Component
 * Sign in or create account page
 */
const SignInPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleShopContinue = () => {
    // Simulate shop authentication
    signIn({ name: 'Guest User', email: 'guest@shop.com' });
    navigate('/');
  };

  const handleEmailContinue = (e) => {
    e.preventDefault();
    if (email) {
      // Navigate to verification code page
      navigate('/verify-code', { state: { email } });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        
        {/* Back Button */}
        <button className="signin-back-btn" onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Logo */}
        <div className="signin-logo">
          <h1>WED</h1>
        </div>

        {/* Title */}
        <div className="signin-header">
          <h2 className="signin-title">Sign in</h2>
          <p className="signin-subtitle">Sign in or create an account</p>
        </div>

        {/* Continue with Shop Button */}
        <button className="continue-shop-btn" onClick={handleShopContinue}>
          Continue with shop
        </button>

        {/* Divider */}
        <div className="signin-divider">
          <span>or</span>
        </div>

        {/* Email Form */}
        <form className="signin-form" onSubmit={handleEmailContinue}>
          <div className="form-group">
            <input
              type="email"
              className="email-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="continue-btn">
            Continue
          </button>
        </form>

      </div>
    </div>
  );
};

export default SignInPage;
