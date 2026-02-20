import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

/**
 * Footer Component
 * Contains site links and copyright information
 */
const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="footer-links">
              <a href="/about" className="footer-link">ABOUT US</a>
              <a href="/contact" className="footer-link">CONTACT US</a>
              <a href="/refund-policy" className="footer-link">REFUND & EXCHANGE POLICY</a>
            </div>
            
            <div className="footer-copyright">
              <p>© 2026 WED, Powered by Shopify</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;