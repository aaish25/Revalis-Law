import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import '../../styles/form-page.css';
import '../../styles/home.css';

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
    <>
      <Navigation />

      {/* Hero */}
      <section className="form-hero">
        <div className="form-hero-container">
          <div className="form-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/services/governance">AI Governance</Link> / <span>Intake Form</span>
          </div>

          <div className="form-hero-badge">
            <i className="fas fa-robot"></i>
            Oxford AI Programme Certified Counsel
          </div>

          <h1>AI Governance <span className="highlight">Assessment</span></h1>

          <p className="form-hero-subtitle">
            EU AI Act enforcement begins in 2025. Ensure your AI systems are compliant. 
            Complete this form for a comprehensive AI governance assessment.
          </p>

          <div className="form-hero-features">
            <div className="form-hero-feature">
              <i className="fas fa-graduation-cap"></i>
              <span>Oxford AI Certified</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-globe"></i>
              <span>EU AI Act Expertise</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-shield-alt"></i>
              <span>Risk Assessment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="form-section-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2>AI Governance Intake Form</h2>
              <p>Help us understand your AI systems and compliance needs</p>
            </div>

            <div className="form-card-body">
              <form onSubmit={handleSubmit}>
                {/* Company Information */}
                <h3 className="form-section-title">
                  <i className="fas fa-building"></i>
                  Company Information
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Company Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      className="form-input"
                      placeholder="Your Company Inc."
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Contact Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      className="form-input"
                      placeholder="Your full name"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="your@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Industry <span className="required">*</span>
                  </label>
                  <select
                    name="industry"
                    className="form-select"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select industry...</option>
                    <option value="technology">Technology / SaaS</option>
                    <option value="healthcare">Healthcare / Life Sciences</option>
                    <option value="finance">Finance / Banking</option>
                    <option value="insurance">Insurance</option>
                    <option value="retail">Retail / E-commerce</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="legal">Legal / Professional Services</option>
                    <option value="education">Education</option>
                    <option value="government">Government / Public Sector</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-divider"></div>

                {/* AI System Details */}
                <h3 className="form-section-title">
                  <i className="fas fa-brain"></i>
                  AI System Details
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    AI Use Cases <span className="required">*</span>
                  </label>
                  <textarea
                    name="aiUseCases"
                    className="form-textarea"
                    placeholder="Describe how your organization uses or plans to use AI (e.g., customer service chatbots, automated decision-making, content generation, predictive analytics, hiring tools)..."
                    value={formData.aiUseCases}
                    onChange={handleChange}
                    required
                    style={{ minHeight: '120px' }}
                  ></textarea>
                  <p className="form-help">The more detail you provide, the better we can assess your compliance needs.</p>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Data Types Processed
                  </label>
                  <textarea
                    name="dataTypes"
                    className="form-textarea"
                    placeholder="What types of data does your AI system process? (e.g., personal data, health information, financial data, biometric data, public data)"
                    value={formData.dataTypes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Regulatory Requirements
                  </label>
                  <textarea
                    name="regulatoryRequirements"
                    className="form-textarea"
                    placeholder="Are you subject to specific regulations? (e.g., EU AI Act, HIPAA, CCPA, GDPR, SOC 2, industry-specific regulations)"
                    value={formData.regulatoryRequirements}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Existing AI Policies
                  </label>
                  <select
                    name="existingPolicies"
                    className="form-select"
                    value={formData.existingPolicies}
                    onChange={handleChange}
                  >
                    <option value="">Select current state...</option>
                    <option value="none">No existing AI policies</option>
                    <option value="basic">Basic policies in place</option>
                    <option value="moderate">Moderate governance framework</option>
                    <option value="comprehensive">Comprehensive AI governance</option>
                    <option value="unsure">Not sure / Need assessment</option>
                  </select>
                </div>

                <div className="form-divider"></div>

                {/* Timeline & Budget */}
                <h3 className="form-section-title">
                  <i className="fas fa-calendar-alt"></i>
                  Timeline & Budget
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      className="form-select"
                      value={formData.timeline}
                      onChange={handleChange}
                    >
                      <option value="">Select timeline...</option>
                      <option value="immediate">Immediate (Active compliance issue)</option>
                      <option value="urgent">Urgent (Within 1-2 months)</option>
                      <option value="quarter">This Quarter</option>
                      <option value="planning">Planning Ahead (3-6 months)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      className="form-select"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select budget range...</option>
                      <option value="under-25k">Under $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="over-100k">Over $100,000</option>
                      <option value="unsure">Not sure / Need quote</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    className="form-textarea"
                    placeholder="Any other details about your AI governance needs, specific concerns, or questions..."
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-info-box">
                  <h4><i className="fas fa-exclamation-triangle"></i> AI Regulation Alert</h4>
                  <p>AI regulations are evolving rapidly. The EU AI Act, state-level AI laws, and industry regulations may impact your AI systems. Early compliance assessment can prevent costly remediation and potential fines of up to €35 million or 7% of global revenue.</p>
                </div>

                <button type="submit" className="form-submit-btn" disabled={loading}>
                  <i className="fas fa-paper-plane"></i>
                  {loading ? 'Submitting...' : 'Submit AI Governance Intake'}
                </button>

                <div className="form-note">
                  <i className="fas fa-clock"></i>
                  <span>Our AI legal team will review and respond within 48 hours</span>
                </div>
              </form>

              {/* Contact Box */}
              <div className="form-contact-box">
                <h4>Need Urgent AI Compliance Help?</h4>
                <p>If you're facing an AI-related regulatory deadline or inquiry, contact us directly:</p>
                <a href="mailto:ai@rivalislaw.com" className="form-contact-item">
                  <i className="fas fa-robot"></i>
                  <span>ai@rivalislaw.com</span>
                </a>
                <a href="tel:+1-202-555-0199" className="form-contact-item">
                  <i className="fas fa-phone"></i>
                  <span>(202) 555-0199</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="form-cta-section">
        <h2>Learn More About AI Governance</h2>
        <p>Explore our AI governance services including EU AI Act compliance, risk assessments, and governance frameworks.</p>
        <div className="form-cta-buttons">
          <Link to="/services/governance" className="form-cta-btn primary">
            <i className="fas fa-robot"></i>
            AI Governance Services
          </Link>
          <a href="tel:+1-202-555-0199" className="form-cta-btn secondary">
            <i className="fas fa-phone"></i>
            Call: (202) 555-0199
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="form-footer">
        <p>&copy; 2024 Rivalis Law. Licensed in New York & Michigan.</p>
        <p><Link to="/">Return to Main Site</Link></p>
      </footer>
    </>
  );
};

export default AIGovernanceIntake;

