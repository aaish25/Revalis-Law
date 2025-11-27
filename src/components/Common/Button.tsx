import React from 'react';
import type { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className = '',
  type = 'button',
  as = 'button',
  href = '#',
  onClick,
}) => {
  // Size adjustments
  const sizeStyles = {
    sm: { padding: '0.75rem 1.5rem', fontSize: '0.9rem' },
    md: { padding: '1.125rem 2.25rem', fontSize: '1.05rem' },
    lg: { padding: '1.25rem 2.5rem', fontSize: '1.1rem' },
  };

  const style = sizeStyles[size];

  const buttonClass = `btn btn-${variant} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const content = loading ? (
    <>
      <span
        style={{
          display: 'inline-block',
          width: '1rem',
          height: '1rem',
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      Loading...
    </>
  ) : (
    children
  );

  if (as === 'a') {
    return (
      <a
        href={href}
        className={buttonClass}
        style={style}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={buttonClass}
      style={style}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
