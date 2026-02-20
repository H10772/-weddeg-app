import Layout from '../components/layout/Layout';
import './ReturnPolicyPage.css';

/**
 * ReturnPolicyPage Component
 * Displays the refund and exchange policy
 */
const ReturnPolicyPage = () => {
  return (
    <Layout>
      <div className="return-policy-page">
        <div className="container">
          {/* Header */}
          <div className="policy-header">
            <h1 className="policy-title">REFUND & EXCHANGE POLICY</h1>
          </div>

          {/* Policy Content */}
          <div className="policy-content">
            
            {/* Inspection Upon Delivery */}
            <section className="policy-section">
              <h2 className="section-title">Inspection Upon Delivery</h2>
              <p className="section-text">
                Please inspect your order immediately upon delivery and before the courier leaves. 
                Any damages or discrepancies must be reported at the time of delivery.
              </p>
            </section>

            {/* Returns & Exchanges at Delivery Only */}
            <section className="policy-section">
              <h2 className="section-title">Returns & Exchanges at Delivery Only</h2>
              <p className="section-text">
                Any request for refund or exchange must be made at the time of delivery by 
                returning the full package to the courier. Only the delivery fee will be charged.
              </p>
              <p className="section-text">
                For exchanges, a new order must be placed online.
              </p>
            </section>

            {/* Partial Acceptance */}
            <section className="policy-section">
              <h2 className="section-title">Partial Acceptance Policy</h2>
              <p className="section-text">
                Partial acceptance or refusal of individual items is not allowed. 
                The order must be accepted or returned as a whole.
              </p>
            </section>

            {/* Responsibility After Acceptance */}
            <section className="policy-section">
              <h2 className="section-title">Responsibility After Acceptance</h2>
              <p className="section-text">
                Once the order is accepted and the courier departs, the items become 
                the customer's full responsibility.
              </p>
              <p className="section-text">
                No refunds or exchanges will be processed after delivery.
              </p>
            </section>

          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ReturnPolicyPage;