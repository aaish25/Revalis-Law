import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavLink {
  label: string;
  href: string;
}

interface NavigationProps {
  links?: NavLink[];
  ctaText?: string;
  ctaHref?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  links = [
    { label: 'All Services', href: '/' },
    { label: 'Select Services', href: '/#services' },
  ],
  ctaText = 'Get Started',
  ctaHref = '/intake',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span style={{ color: 'var(--color-accent)' }}>⚖</span> Rivalis Law
        </Link>

        {/* Desktop Menu */}
        <ul
          className="nav-menu"
          style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            alignItems: 'center',
          }}
        >
          {links.map((link) => (
            <li key={link.href} className="hidden md:block">
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
          <li className="hidden md:block">
            <a href={ctaHref} className="nav-cta">
              {ctaText}
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            width: '32px',
            height: '32px',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span
            style={{
              height: '2px',
              width: '100%',
              background: 'var(--color-primary)',
              transition: 'transform 0.3s',
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
            }}
          />
          <span
            style={{
              height: '2px',
              width: '100%',
              background: 'var(--color-primary)',
              transition: 'opacity 0.3s',
              opacity: mobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              height: '2px',
              width: '100%',
              background: 'var(--color-primary)',
              transition: 'transform 0.3s',
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'white',
            borderTop: '1px solid var(--color-gray-200)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaHref}
            className="nav-cta"
            style={{ textAlign: 'center' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {ctaText}
          </a>
        </div>
      )}
    </nav>
  );
};
