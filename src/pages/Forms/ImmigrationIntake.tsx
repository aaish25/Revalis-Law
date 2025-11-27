import React, { useState } from 'react';
import { MainLayout, Hero, CTASection } from '../../components';
import { FormField } from '../../components/Forms/FormField';
import { Button } from '../../components/Common/Button';

export const ImmigrationIntake: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    citizenship: '',
    currentStatus: '',
    visaType: '',
    employerName: '',
    jobTitle: '',
    urgency: '',
    previousApplications: '',
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
      console.log('Immigration intake submitted:', formData);
      alert('Thank you! Your immigration intake form has been submitted. Our immigration team will review and contact you within 24 hours.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        citizenship: '',
        currentStatus: '',
        visaType: '',
        employerName: '',
        jobTitle: '',
        urgency: '',
        previousApplications: '',
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
            Immigration Intake
            <br />
            <span className="text-accent">Start Your Immigration Case</span>
          </>
        }
        subtitle="Complete this confidential form to begin your immigration consultation. All information is protected by attorney-client privilege."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/#services' },
          { label: 'Immigration', href: '/services/immigration' },
          { label: 'Intake Form' },
        ]}
      />

      <section className="section bg-gray-50">
        <div className="section-container">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-6">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Full Legal Name"
                name="fullName"
                placeholder="As shown on passport"
                required
                value={formData.fullName}
                onChange={handleChange}
              />

              <FormField
                label="Country of Citizenship"
                name="citizenship"
                placeholder="e.g., India, China, Brazil"
                required
                value={formData.citizenship}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-6 mt-8">Immigration Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Current Immigration Status"
                name="currentStatus"
                placeholder="e.g., H-1B, F-1, B-1/B-2, None"
                required
                value={formData.currentStatus}
                onChange={handleChange}
              />

              <FormField
                label="Visa Type Seeking"
                name="visaType"
                placeholder="e.g., H-1B, L-1, EB-1, Green Card"
                required
                value={formData.visaType}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Employer/Sponsor Name"
                name="employerName"
                placeholder="Company name (if applicable)"
                value={formData.employerName}
                onChange={handleChange}
              />

              <FormField
                label="Job Title/Position"
                name="jobTitle"
                placeholder="Your current or prospective title"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </div>

            <FormField
              label="Urgency Level"
              name="urgency"
              placeholder="e.g., Urgent (within 30 days), Standard, Planning ahead"
              value={formData.urgency}
              onChange={handleChange}
            />

            <FormField
              label="Previous Immigration Applications"
              name="previousApplications"
              type="textarea"
              placeholder="List any previous visa applications, denials, or immigration history..."
              value={formData.previousApplications}
              onChange={handleChange}
            />

            <FormField
              label="Additional Information"
              name="additionalInfo"
              type="textarea"
              placeholder="Any other details relevant to your immigration case..."
              value={formData.additionalInfo}
              onChange={handleChange}
            />

            <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Confidential Notice:</strong> All information provided is strictly confidential and protected by attorney-client privilege. We will not share your information with USCIS or any third party without your consent.
              </p>
            </div>

            <div className="mt-8">
              <Button type="submit" variant="primary" size="lg" loading={loading}>
                Submit Immigration Intake
              </Button>
            </div>
          </form>
        </div>
      </section>

      <CTASection
        title="Urgent Immigration Matter?"
        subtitle="If you have an urgent immigration deadline or emergency, call our immigration hotline immediately."
        buttons={[
          {
            text: 'Immigration Hotline',
            icon: '📞',
            href: 'tel:+1-202-555-0199',
            variant: 'primary',
          },
          {
            text: 'Email Immigration Team',
            icon: '✉️',
            href: 'mailto:immigration@rivalislaw.com',
            variant: 'secondary',
          },
        ]}
      />
    </MainLayout>
  );
};

export default ImmigrationIntake;

