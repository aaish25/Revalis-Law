import React from 'react';
import type { CardProps } from '../../types';

export const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  price,
  children,
  className = '',
}) => {
  return (
    <div className={`card ${className}`}>
      {icon && (
        <div className="card-icon">
          <span>{icon}</span>
        </div>
      )}

      <h3>{title}</h3>

      <p>{description}</p>

      {price && <div className="card-price">{price}</div>}

      {children}
    </div>
  );
};
