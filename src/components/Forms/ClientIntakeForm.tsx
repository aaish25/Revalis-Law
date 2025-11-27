import React, { useState } from 'react';
import { FormField } from './FormField';
import { Button } from '../Common/Button';

interface IntakeFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  description: string;
  urgency: string;
}

interface ClientIntakeFormProps {
  onSubmit?: (data: IntakeFormData) => void;
  serviceType?: string;
}

export const ClientIntakeForm: React.FC<ClientIntakeFormProps> = ({
  onSubmit,
  serviceType = '',
}) => {
  const [formData, setFormData] = useState<IntakeFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: serviceType,
    description: '',
    urgency: 'standard',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.serviceType.trim()) newErrors.serviceType = 'Please select a service';
    if (!formData.description.trim()) newErrors.description = 'Please describe your needs';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (onSubmit) {
        onSubmit(formData);
      }
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        serviceType: serviceType,
        description: '',
        urgency: 'standard',
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-primary mb-6">Client Intake Form</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          name="fullName"
          placeholder="John Doe"
          required
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="john@company.com"
          required
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormField
          label="Phone"
          name="phone"
          type="tel"
          placeholder="(555) 123-4567"
          required
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <FormField
          label="Company"
          name="company"
          placeholder="Your Company Name"
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FormField
          label="Service Type"
          name="serviceType"
          type="select"
          required
          value={formData.serviceType}
          onChange={handleChange}
          error={errors.serviceType}
        />

        <FormField
          label="Urgency"
          name="urgency"
          type="select"
          value={formData.urgency}
          onChange={handleChange}
        />
      </div>

      <FormField
        label="Description of Your Needs"
        name="description"
        type="textarea"
        placeholder="Please describe your legal needs in detail..."
        required
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        className="mt-6"
      />

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-gray-700">
          <strong>Confidential Notice:</strong> This form and all information provided are strictly confidential and privileged. 
          Please do not include sensitive information without consulting with an attorney first.
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
        >
          Submit Form
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => setFormData({
            fullName: '',
            email: '',
            phone: '',
            company: '',
            serviceType: serviceType,
            description: '',
            urgency: 'standard',
          })}
        >
          Clear Form
        </Button>
      </div>
    </form>
  );
};

