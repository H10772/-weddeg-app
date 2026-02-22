import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

/**
 * Layout Component
 * Wraps page content with Navbar and Footer
 * Provides consistent structure across all pages
 */
const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className={`main-content ${isHomePage ? 'home-page' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
