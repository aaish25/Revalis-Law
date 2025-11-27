import React from 'react';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

interface ProcessFlowProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
  backgroundColor?: 'white' | 'gray';
  className?: string;
}

export const ProcessFlow: React.FC<ProcessFlowProps> = ({
  steps,
  title,
  subtitle,
  backgroundColor = 'gray',
  className = '',
}) => {
  const bgClass = backgroundColor === 'gray' ? 'process-section' : '';

  return (
    <section className={`section ${bgClass} ${className}`}>
      <div className="section-container">
        {(title || subtitle) && (
          <div className="section-header">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}

        <div className="process-list">
          {steps.map((step, idx) => (
            <div key={idx} className="process-item">
              <div className="process-number">{step.number}</div>
              <div className="process-content">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
