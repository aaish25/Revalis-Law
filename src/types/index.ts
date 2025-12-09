// Database types
export * from './database';

// Design system types
export interface ColorVariant {
  primary: string;
  secondary: string;
  accent: string;
}

// Button types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  as?: 'a' | 'button';
  href?: string;
}

// Card types
export interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  price?: string;
  children?: React.ReactNode;
  className?: string;
}

// Service types
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  price: string;
  features: string[];
}

// Form types
export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  className?: string;
  disabled?: boolean;
}

export interface FormSubmissionData {
  [key: string]: string | number | boolean | File | undefined;
}

