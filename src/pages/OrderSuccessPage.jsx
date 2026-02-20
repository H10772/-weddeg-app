import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './OrderSuccessPage.css';

/**
 * OrderSuccessPage Component
 * Displays order confirmation after successful checkout
 */
const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderData = location.state;

  useEffect(() => {
    // Redirect to home if no order data
    if (!orderData) {
      navigate('/', { replace: true });
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          
          <h1>تم تأكيد طلبك بنجاح!</h1>
          
          <div className="order-details">
            <div className="order-number">
              <span className="label">رقم الطلب:</span>
              <span className="value">#{orderData.orderNumber}</span>
            </div>
            
            <div className="order-total">
              <span className="label">المبلغ الإجمالي:</span>
              <span className="value">LE {orderData.total.toFixed(2)} EGP</span>
            </div>
          </div>
          
          <div className="success-message">
            <p>شكراً لك على طلبك! سنقوم بمعالجة طلبك وإرسال تفاصيل الشحن إلى بريدك الإلكتروني قريباً.</p>
            <p>يمكنك توقع وصول طلبك خلال 3-5 أيام عمل.</p>
          </div>
          
          <div className="next-steps">
            <h3>الخطوات التالية:</h3>
            <ul>
              <li>
                <i className="bi bi-envelope"></i>
                ستتلقى رسالة تأكيد على بريدك الإلكتروني
              </li>
              <li>
                <i className="bi bi-truck"></i>
                سنقوم بتحضير طلبك للشحن
              </li>
              <li>
                <i className="bi bi-geo-alt"></i>
                ستتلقى رقم التتبع عند الشحن
              </li>
              <li>
                <i className="bi bi-box-seam"></i>
                سيصل طلبك إلى عنوانك المحدد
              </li>
            </ul>
          </div>
          
          <div className="action-buttons">
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/')}
            >
              متابعة التسوق
            </button>
            
            <button 
              className="track-order-btn"
              onClick={() => {
                // In a real app, this would navigate to order tracking
                alert(`تتبع الطلب #${orderData.orderNumber} - هذه الميزة ستكون متاحة قريباً`);
              }}
            >
              تتبع الطلب
            </button>
          </div>
          
          <div className="contact-info">
            <p>هل تحتاج مساعدة؟</p>
            <div className="contact-methods">
              <a href="tel:+201234567890" className="contact-link">
                <i className="bi bi-telephone"></i>
                اتصل بنا
              </a>
              <a href="mailto:support@wed.com" className="contact-link">
                <i className="bi bi-envelope"></i>
                راسلنا
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;