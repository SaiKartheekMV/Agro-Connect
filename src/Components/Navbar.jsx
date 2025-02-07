import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import { FaBars, FaTimes, FaHome, FaCloudSun, FaSeedling, FaShoppingCart, FaUsers } from 'react-icons/fa';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const closeMobileMenu = () => {
    setIsMobile(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">🌾 AgroConnect</div>
        <ul className={isMobile ? 'nav-links-mobile' : 'nav-links'} onClick={closeMobileMenu}>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/" onClick={closeMobileMenu}>
              <FaHome /> Home
            </Link>
          </li>
          <li className={location.pathname === '/weather' ? 'active' : ''}>
            <Link to="/weather" onClick={closeMobileMenu}>
              <FaCloudSun /> Weather
            </Link>
          </li>
          <li className={location.pathname === '/market-prices' ? 'active' : ''}>
            <Link to="/market-prices" onClick={closeMobileMenu}>
              <FaShoppingCart /> Market Prices
            </Link>
          </li>
          <li className={location.pathname === '/crop-suggestions' ? 'active' : ''}>
            <Link to="/crop-suggestions" onClick={closeMobileMenu}>
              <FaSeedling /> Crop Suggestions
            </Link>
          </li>
          <li className={location.pathname === '/forum' ? 'active' : ''}>
            <Link to="/forum" onClick={closeMobileMenu}>
              <FaUsers /> Community Forum
            </Link>
          </li>
        </ul>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobile ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
