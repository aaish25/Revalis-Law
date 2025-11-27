import React from 'react';

interface RedFlag {
  icon: string;
  title: string;
  description: string;
}

interface RedFlagsProps {
  flags: RedFlag[];
  title?: string;
  subtitle?: string;
}

export const RedFlags: React.FC<RedFlagsProps> = ({
  flags,
  title = 'Red Flags We Find',
  subtitle = 'These are the contract terms that destroy value or create liability',
}) => {
  return (
    <section className="section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="flags-grid">
          {flags.map((flag, idx) => (
            <div key={idx} className="flag-card">
              <h4>
                <span className="icon" style={{ marginRight: '0.5rem' }}>
                  {flag.icon}
                </span>
                {flag.title}
              </h4>
              <p>{flag.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
