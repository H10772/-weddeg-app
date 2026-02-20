import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

/**
 * CheckoutPage Component
 * Complete checkout process with shipping, payment, and order summary
 */
const CheckoutPage = () => {
  const { cartItems, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    phone: '',
    
    // Shipping Address
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    governorate: '',
    postalCode: '',
    
    // Payment
    paymentMethod: 'cash',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Additional
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over 500 EGP
  const tax = subtotal * 0.14; // 14% VAT
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!formData.phone) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!formData.firstName) newErrors.firstName = 'الاسم الأول مطلوب';
    if (!formData.lastName) newErrors.lastName = 'الاسم الأخير مطلوب';
    if (!formData.address) newErrors.address = 'العنوان مطلوب';
    if (!formData.city) newErrors.city = 'المدينة مطلوبة';
    if (!formData.governorate) newErrors.governorate = 'المحافظة مطلوبة';
    
    // Payment validation for card
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'رقم البطاقة مطلوب';
      if (!formData.expiryDate) newErrors.expiryDate = 'تاريخ الانتهاء مطلوب';
      if (!formData.cvv) newErrors.cvv = 'رمز الأمان مطلوب';
      if (!formData.cardName) newErrors.cardName = 'اسم حامل البطاقة مطلوب';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success', { 
        state: { 
          orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
          total: total
        }
      });
    } catch (error) {
      console.error('Order submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart-message">
            <h2>السلة فارغة</h2>
            <p>يرجى إضافة منتجات إلى السلة أولاً</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/')}
            >
              متابعة التسوق
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>إتمام الطلب</h1>
          <div className="breadcrumb">
            <span>السلة</span>
            <i className="bi bi-chevron-left"></i>
            <span className="active">معلومات الشحن</span>
            <i className="bi bi-chevron-left"></i>
            <span>الدفع</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-content">
            {/* Left Column - Forms */}
            <div className="checkout-forms">
              
              {/* Contact Information */}
              <div className="form-section">
                <h3>معلومات الاتصال</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">البريد الإلكتروني *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="example@email.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">رقم الهاتف *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="01xxxxxxxxx"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="form-section">
                <h3>عنوان الشحن</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">الاسم الأول *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">الاسم الأخير *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">العنوان *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                    placeholder="الشارع والرقم"
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="apartment">الشقة/الطابق (اختياري)</label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="رقم الشقة أو الطابق"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">المدينة *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="governorate">المحافظة *</label>
                    <select
                      id="governorate"
                      name="governorate"
                      value={formData.governorate}
                      onChange={handleInputChange}
                      className={errors.governorate ? 'error' : ''}
                    >
                      <option value="">اختر المحافظة</option>
                      <option value="cairo">القاهرة</option>
                      <option value="giza">الجيزة</option>
                      <option value="alexandria">الإسكندرية</option>
                      <option value="qalyubia">القليوبية</option>
                      <option value="port-said">بورسعيد</option>
                      <option value="suez">السويس</option>
                      <option value="luxor">الأقصر</option>
                      <option value="aswan">أسوان</option>
                      <option value="asyut">أسيوط</option>
                      <option value="beheira">البحيرة</option>
                      <option value="beni-suef">بني سويف</option>
                      <option value="dakahlia">الدقهلية</option>
                      <option value="damietta">دمياط</option>
                      <option value="fayyum">الفيوم</option>
                      <option value="gharbia">الغربية</option>
                      <option value="ismailia">الإسماعيلية</option>
                      <option value="kafr-el-sheikh">كفر الشيخ</option>
                      <option value="matrouh">مطروح</option>
                      <option value="minya">المنيا</option>
                      <option value="monufia">المنوفية</option>
                      <option value="new-valley">الوادي الجديد</option>
                      <option value="north-sinai">شمال سيناء</option>
                      <option value="qena">قنا</option>
                      <option value="red-sea">البحر الأحمر</option>
                      <option value="sharqia">الشرقية</option>
                      <option value="sohag">سوهاج</option>
                      <option value="south-sinai">جنوب سيناء</option>
                    </select>
                    {errors.governorate && <span className="error-message">{errors.governorate}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="postalCode">الرمز البريدي</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="form-section">
                <h3>طريقة الدفع</h3>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                    />
                    <span className="payment-label">
                      <i className="bi bi-cash"></i>
                      الدفع عند الاستلام
                    </span>
                  </label>
                  
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <span className="payment-label">
                      <i className="bi bi-credit-card"></i>
                      بطاقة ائتمان/خصم
                    </span>
                  </label>
                </div>

                {/* Card Details */}
                {formData.paymentMethod === 'card' && (
                  <div className="card-details">
                    <div className="form-group">
                      <label htmlFor="cardNumber">رقم البطاقة *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={errors.cardNumber ? 'error' : ''}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                      {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiryDate">تاريخ الانتهاء *</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className={errors.expiryDate ? 'error' : ''}
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                        {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="cvv">رمز الأمان *</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={errors.cvv ? 'error' : ''}
                          placeholder="123"
                          maxLength="4"
                        />
                        {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cardName">اسم حامل البطاقة *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={errors.cardName ? 'error' : ''}
                        placeholder="الاسم كما هو مكتوب على البطاقة"
                      />
                      {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Notes */}
              <div className="form-section">
                <h3>ملاحظات إضافية</h3>
                <div className="form-group">
                  <label htmlFor="notes">ملاحظات الطلب (اختياري)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="أي ملاحظات خاصة بالطلب..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="order-summary">
              <h3>ملخص الطلب</h3>
              
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img src={item.images[0]} alt={item.name} />
                      <span className="item-quantity">{item.quantity}</span>
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">
                        {item.currency} {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>المجموع الفرعي</span>
                  <span>LE {subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>الشحن</span>
                  <span>{shipping === 0 ? 'مجاني' : `LE ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="total-row">
                  <span>الضرائب (14%)</span>
                  <span>LE {tax.toFixed(2)}</span>
                </div>
                <div className="total-row total-final">
                  <span>المجموع الكلي</span>
                  <span>LE {total.toFixed(2)} EGP</span>
                </div>
              </div>

              <button 
                type="submit" 
                className="complete-order-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="bi bi-arrow-clockwise spin"></i>
                    جاري المعالجة...
                  </>
                ) : (
                  'إتمام الطلب'
                )}
              </button>

              <div className="security-info">
                <i className="bi bi-shield-check"></i>
                <span>معلوماتك محمية بتشفير SSL</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;