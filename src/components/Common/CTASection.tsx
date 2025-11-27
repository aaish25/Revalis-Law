import React from 'react';

interface CTAButton {
  text: string;
  icon?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
}

interface CTASectionProps {
  id?: string;
  title: string;
  subtitle: string;
  buttons: CTAButton[];
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  id,
  title,
  subtitle,
  buttons,
  className = '',
}) => {
  return (
    <section id={id} className={`cta-section ${className}`}>
      <div className="section-container">
        <h2>{title}</h2>
        <p>{subtitle}</p>

        <div className="cta-group">
          {buttons.map((btn, idx) => (
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
      </div>
    </section>
  );
};
