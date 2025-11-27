import React from 'react';

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  price: string;
}

interface ServiceGridProps {
  services: ServiceItem[];
  columns?: 2 | 3;
  title?: string;
  subtitle?: string;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  services,
  columns = 2,
  title,
  subtitle,
}) => {
  return (
    <section className="section">
      <div className="section-container">
        {(title || subtitle) && (
          <div className="section-header">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}

        <div className={`cards-grid ${columns === 3 ? 'cards-grid-3' : ''}`}>
          {services.map((service, idx) => (
            <div key={idx} className="card">
              <div className="card-icon">
                <span style={{ fontSize: '1.5rem' }}>{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="card-price">{service.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
