import React from 'react';
import { MainLayout, Hero, ClientIntakeForm, CTASection } from '../../components';

export const ClientIntakePage: React.FC = () => {
  const handleFormSubmit = async (data: any) => {
    console.log('Form submitted:', data);
    // TODO: Connect to API
    alert('Thank you! Your form has been submitted. We will contact you within 24 hours.');
  };

  return (
    <MainLayout>
      <Hero
        title={
          <>
            Client Intake
            <br />
            <span className="text-accent">Get Started Today</span>
          </>
        }
        subtitle="Complete this form to help us understand your legal needs. All information is confidential and protected by attorney-client privilege."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Get Started' },
        ]}
      />

      <section className="section bg-gray-50">
        <div className="section-container">
          <ClientIntakeForm onSubmit={handleFormSubmit} />
        </div>
      </section>

      <CTASection
        title="Prefer to Speak Directly?"
        subtitle="Our team is available to discuss your needs over the phone. Call us during business hours or send an email anytime."
        buttons={[
          {
            text: 'Call: (202) 555-0199',
            icon: '📞',
            href: 'tel:+1-202-555-0199',
            variant: 'primary',
          },
          {
            text: 'Email Us',
            icon: '✉️',
            href: 'mailto:contact@rivalislaw.com',
            variant: 'secondary',
          },
        ]}
      />
    </MainLayout>
  );
};

export default ClientIntakePage;

