import React, { useState } from 'react';
import { MainLayout, Hero, CTASection } from '../../components';
import { FormField } from '../../components/Forms/FormField';
import { Button } from '../../components/Common/Button';

export const QualificationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    employeeCount: '',
    annualRevenue: '',
    legalNeeds: '',
    timeline: '',
    budget: '',
    referralSource: '',
    additionalInfo: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Qualification form submitted:', formData);
      alert('Thank you! Your qualification form has been submitted. A member of our team will review and contact you shortly.');
      setFormData({
        companyName: '',
        industry: '',
        employeeCount: '',
        annualRevenue: '',
        legalNeeds: '',
        timeline: '',
        budget: '',
        referralSource: '',
        additionalInfo: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Hero
        title={
          <>
            Client Qualification
            <br />
            <span className="text-accent">Tell Us About Your Business</span>
          </>
        }
        subtitle="Help us understand your business so we can provide the best possible legal counsel. This information helps us match you with the right attorney and services."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Qualification Form' },
        ]}
      />

      <section className="section bg-gray-50">
        <div className="section-container">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-6">Business Information</h3>

            <FormField
              label="Company Name"
              name="companyName"
              placeholder="Your Company Inc."
              required
              value={formData.companyName}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Industry"
                name="industry"
                placeholder="e.g., Technology, Healthcare, Finance"
                required
                value={formData.industry}
                onChange={handleChange}
              />

              <FormField
                label="Number of Employees"
                name="employeeCount"
                placeholder="e.g., 1-10, 11-50, 51-200"
                value={formData.employeeCount}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Annual Revenue"
                name="annualRevenue"
                placeholder="e.g., <$1M, $1M-$10M, $10M+"
                value={formData.annualRevenue}
                onChange={handleChange}
              />

              <FormField
                label="Timeline"
                name="timeline"
                placeholder="e.g., Immediate, 1-2 weeks, 1 month"
                value={formData.timeline}
                onChange={handleChange}
              />
            </div>

            <FormField
              label="Legal Services Needed"
              name="legalNeeds"
              type="textarea"
              placeholder="Describe what legal services you're looking for..."
              required
              value={formData.legalNeeds}
              onChange={handleChange}
            />

            <FormField
              label="Budget Range"
              name="budget"
              placeholder="e.g., $5,000-$10,000"
              value={formData.budget}
              onChange={handleChange}
            />

            <FormField
              label="How Did You Hear About Us?"
              name="referralSource"
              placeholder="e.g., Google, Referral, LinkedIn"
              value={formData.referralSource}
              onChange={handleChange}
            />

            <FormField
              label="Additional Information"
              name="additionalInfo"
              type="textarea"
              placeholder="Any other details that would help us understand your needs..."
              value={formData.additionalInfo}
              onChange={handleChange}
            />

            <div className="mt-8">
              <Button type="submit" variant="primary" size="lg" loading={loading}>
                Submit Qualification Form
              </Button>
            </div>
          </form>
        </div>
      </section>

      <CTASection
        title="Questions About Our Services?"
        subtitle="Our team is happy to discuss your needs and explain how we can help."
        buttons={[
          {
            text: 'Call Us',
            icon: '📞',
            href: 'tel:+1-202-555-0199',
            variant: 'primary',
          },
        ]}
      />
    </MainLayout>
  );
};

export default QualificationForm;

