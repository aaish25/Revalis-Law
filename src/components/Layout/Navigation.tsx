import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scrolling to hash on page load or hash change
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  // Handle navigation link clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHashLink = href.startsWith('/#');
    
    if (isHashLink) {
      e.preventDefault();
      const hash = href.substring(1); // Remove the leading /
      
      // If we're already on home page, just scroll
      if (location.pathname === '/') {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Navigate to home page with hash
        navigate('/' + hash);
      }
    }
    
    setMobileMenuOpen(false);
  };

  const coreServices = [
    { label: 'AI Governance & Compliance', href: '/services/governance' },
    { label: 'Global Expansion & Immigration', href: '/services/immigration' },
    { label: 'M&A & Corporate Transactions', href: '/services/ma' },
  ];

  const selectServices = [
    { label: 'Contract Review & Drafting', href: '/services/contracts' },
    { label: 'Data Privacy Compliance', href: '/services/data-privacy' },
    { label: 'IP Strategy & Protection', href: '/services/ip-strategy' },
    { label: 'Corporate Fraud Investigation', href: '/services/fraud-investigation' },
    { label: 'Employment Law Counsel', href: '/services/employment' },
    { label: 'Fundraising & Securities', href: '/services/fundraising' },
  ];

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Rivalis Law</Link>
        
        {/* Desktop Menu */}
        <ul className="nav-menu">
          <li>
            <a href="/#why-rivalis" className="nav-link" onClick={(e) => handleNavClick(e, '/#why-rivalis')}>
              Why Rivalis
            </a>
          </li>
          
          {/* Our 3 Specialties Dropdown */}
          <li className="nav-dropdown">
            <a href="/#services" className="nav-link" onClick={(e) => handleNavClick(e, '/#services')}>
              Our 3 Specialties
              <i className="fas fa-chevron-down" style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}></i>
            </a>
            <div className="nav-dropdown-menu">
              {coreServices.map((service) => (
                <Link key={service.href} to={service.href} className="nav-dropdown-item">
                  {service.label}
                </Link>
              ))}
            </div>
          </li>

          {/* Select Services Dropdown */}
          <li className="nav-dropdown">
            <a href="/#select-services" className="nav-link" onClick={(e) => handleNavClick(e, '/#select-services')}>
              Select Services
              <i className="fas fa-chevron-down" style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}></i>
            </a>
            <div className="nav-dropdown-menu">
              {selectServices.map((service) => (
                <Link key={service.href} to={service.href} className="nav-dropdown-item">
                  {service.label}
                </Link>
              ))}
            </div>
          </li>

          <li>
            <a href="/#how-we-work" className="nav-link" onClick={(e) => handleNavClick(e, '/#how-we-work')}>
              How We Work
            </a>
          </li>
          <li>
            <a href="/#qualify" className="nav-cta" onClick={(e) => handleNavClick(e, '/#qualify')}>
              Get Started
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="nav-mobile-menu">
          <a 
            href="/#why-rivalis" 
            className="nav-mobile-link" 
            onClick={(e) => handleNavClick(e, '/#why-rivalis')}
          >
            Why Rivalis
          </a>
          
          <div className="nav-mobile-section">
            <div className="nav-mobile-section-title">Our 3 Specialties</div>
            {coreServices.map((service) => (
              <Link 
                key={service.href} 
                to={service.href} 
                className="nav-mobile-link nested"
                onClick={() => setMobileMenuOpen(false)}
              >
                {service.label}
              </Link>
            ))}
          </div>

          <div className="nav-mobile-section">
            <div className="nav-mobile-section-title">Select Services</div>
            {selectServices.map((service) => (
              <Link 
                key={service.href} 
                to={service.href} 
                className="nav-mobile-link nested"
                onClick={() => setMobileMenuOpen(false)}
              >
                {service.label}
              </Link>
            ))}
          </div>

          <a 
            href="/#how-we-work" 
            className="nav-mobile-link" 
            onClick={(e) => handleNavClick(e, '/#how-we-work')}
          >
            How We Work
          </a>
          <a 
            href="/#qualify" 
            className="nav-mobile-cta" 
            onClick={(e) => handleNavClick(e, '/#qualify')}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};
