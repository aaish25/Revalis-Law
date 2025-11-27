import React from 'react';

interface HeroProps {
  title: string | React.ReactNode;
  subtitle: string;
  price?: string;
  priceNote?: string;
  breadcrumb?: Array<{ label: string; href?: string }>;
  ctaButtons?: Array<{
    text: string;
    icon?: string;
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    onClick?: () => void;
  }>;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  price,
  priceNote,
  breadcrumb,
  ctaButtons,
  className = '',
}) => {
  return (
    <section className={`hero ${className}`}>
      <div className="hero-container">
        {breadcrumb && (
          <div className="breadcrumb">
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                {item.href ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span>{item.label}</span>
                )}
                {idx < breadcrumb.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </div>
        )}

        <h1>{title}</h1>

        <p className="hero-subtitle">{subtitle}</p>

        {price && (
          <>
            <div className="price-hero">{price}</div>
            {priceNote && <p className="price-note">{priceNote}</p>}
          </>
        )}

        {ctaButtons && (
          <div className="cta-group">
            {ctaButtons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.href || '#'}
                className={`btn btn-${btn.variant || 'primary'}`}
                onClick={btn.onClick}
              >
                {btn.icon && <span>{btn.icon}</span>}
                {btn.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
