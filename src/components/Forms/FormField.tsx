import React from 'react';
import type { FormFieldProps } from '../../types';

export const FormField: React.FC<FormFieldProps & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}> = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  error = '',
  helpText = '',
  className = '',
  disabled = false,
  value = '',
  onChange = () => {},
}) => {
  const baseClasses = 'form-input';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';

  if (type === 'textarea') {
    return (
      <div className={`form-group ${className}`}>
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={`form-textarea ${errorClasses}`}
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        {helpText && <p className="text-gray-500 text-sm mt-1">{helpText}</p>}
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div className={`form-group ${className}`}>
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
        <select
          id={name}
          name={name}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={`form-select ${errorClasses}`}
        >
          <option value="">Select {label.toLowerCase()}</option>
        </select>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        {helpText && <p className="text-gray-500 text-sm mt-1">{helpText}</p>}
      </div>
    );
  }

  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${errorClasses}`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {helpText && <p className="text-gray-500 text-sm mt-1">{helpText}</p>}
    </div>
  );
};

