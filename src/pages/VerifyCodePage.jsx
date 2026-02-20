import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './VerifyCodePage.css';

/**
 * VerifyCodePage Component
 * Verify email with 6-digit code
 */
const VerifyCodePage = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  
  // Get email from navigation state
  const email = location.state?.email || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length === 6) {
      // Simulate code verification
      signIn({ name: 'User', email: email });
      navigate('/');
    }
  };

  const handleBack = () => {
    navigate('/signin');
  };

  const handleDifferentEmail = () => {
    navigate('/signin');
  };

  return (
    <div className="verify-code-page">
      <div className="verify-code-container">
        
        {/* Back Button */}
        <button className="verify-back-btn" onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Logo */}
        <div className="verify-logo">
          <h1>WED</h1>
        </div>

        {/* Title */}
        <div className="verify-header">
          <h2 className="verify-title">Enter code</h2>
          <p className="verify-subtitle">Sent to {email}</p>
        </div>

        {/* Code Form */}
        <form className="verify-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="code-input"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength="6"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>

        {/* Different Email Link */}
        <button className="different-email-link" onClick={handleDifferentEmail}>
          Sign in with a different email
        </button>

      </div>
    </div>
  );
};

export default VerifyCodePage;
