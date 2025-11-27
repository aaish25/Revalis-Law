import React, { useState } from 'react';
import { MainLayout, Hero, CTASection } from '../../components';
import { FormField } from '../../components/Forms/FormField';
import { Button } from '../../components/Common/Button';

export const AIGovernanceIntake: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
    aiUseCases: '',
    dataTypes: '',
    regulatoryRequirements: '',
    existingPolicies: '',
    timeline: '',
    budget: '',
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
      console.log('AI Governance intake submitted:', formData);
      alert('Thank you! Your AI governance intake has been submitted. Our AI legal team will review and contact you within 48 hours.');
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        industry: '',
        aiUseCases: '',
        dataTypes: '',
        regulatoryRequirements: '',
        existingPolicies: '',
        timeline: '',
        budget: '',
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
            AI Governance
            <br />
            <span className="text-accent">Legal Assessment</span>
          </>
        }
        subtitle="As AI regulations evolve rapidly, ensure your AI systems are compliant. Complete this form to begin your AI governance assessment."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'AI Governance Intake' },
        ]}
      />

      <section className="section bg-gray-50">
        <div className="section-container">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-6">Company Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Company Name"
                name="companyName"
                placeholder="Your Company Inc."
                required
                value={formData.companyName}
                onChange={handleChange}
              />

              <FormField
                label="Contact Name"
                name="contactName"
                placeholder="Your full name"
                required
                value={formData.contactName}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="your@company.com"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <FormField
              label="Industry"
              name="industry"
              placeholder="e.g., Healthcare, Finance, Technology, Retail"
              required
              value={formData.industry}
              onChange={handleChange}
            />

            <h3 className="text-2xl font-bold text-primary mb-6 mt-8">AI System Details</h3>

            <FormField
              label="AI Use Cases"
              name="aiUseCases"
              type="textarea"
              placeholder="Describe how your organization uses or plans to use AI (e.g., customer service chatbots, automated decision-making, content generation, predictive analytics)..."
              required
              value={formData.aiUseCases}
              onChange={handleChange}
            />

            <FormField
              label="Data Types Processed"
              name="dataTypes"
              type="textarea"
              placeholder="What types of data does your AI system process? (e.g., personal data, health information, financial data, public data)"
              value={formData.dataTypes}
              onChange={handleChange}
            />

            <FormField
              label="Regulatory Requirements"
              name="regulatoryRequirements"
              type="textarea"
              placeholder="Are you subject to specific regulations? (e.g., EU AI Act, HIPAA, CCPA, industry-specific regulations)"
              value={formData.regulatoryRequirements}
              onChange={handleChange}
            />

            <FormField
              label="Existing AI Policies"
              name="existingPolicies"
              type="textarea"
              placeholder="Do you have existing AI governance policies, ethics guidelines, or risk assessments?"
              value={formData.existingPolicies}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Timeline"
                name="timeline"
                placeholder="e.g., Immediate, Q1 2025, Planning"
                value={formData.timeline}
                onChange={handleChange}
              />

              <FormField
                label="Budget Range"
                name="budget"
                placeholder="e.g., $10,000-$25,000"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>

            <FormField
              label="Additional Information"
              name="additionalInfo"
              type="textarea"
              placeholder="Any other details about your AI governance needs..."
              value={formData.additionalInfo}
              onChange={handleChange}
            />

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> AI regulations are evolving rapidly. The EU AI Act, state-level AI laws, and industry regulations may impact your AI systems. Early compliance assessment can prevent costly remediation later.
              </p>
            </div>

            <div className="mt-8">
              <Button type="submit" variant="primary" size="lg" loading={loading}>
                Submit AI Governance Intake
              </Button>
            </div>
          </form>
        </div>
      </section>

      <CTASection
        title="Need Urgent AI Compliance Help?"
        subtitle="If you're facing an AI-related regulatory deadline or inquiry, contact our AI legal team immediately."
        buttons={[
          {
            text: 'Contact AI Team',
            icon: '🤖',
            href: 'mailto:ai@rivalislaw.com',
            variant: 'primary',
          },
          {
            text: 'Call: (202) 555-0199',
            icon: '📞',
            href: 'tel:+1-202-555-0199',
            variant: 'secondary',
          },
        ]}
      />
    </MainLayout>
  );
};

export default AIGovernanceIntake;

