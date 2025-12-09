import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { submitForm } from '../../lib/supabase';
import '../../styles/form-page.css';
import '../../styles/home.css';

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
      await submitForm('immigration-intake', formData.email, formData);
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
    } catch (error) {
      console.error('Error submitting immigration intake:', error);
      alert('There was an error submitting your form. Please try again or call (202) 555-0199.');
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
            <Link to="/">Home</Link> / <Link to="/services/immigration">Immigration</Link> / <span>Intake Form</span>
          </div>

          <div className="form-hero-badge" style={{ background: 'rgba(231, 76, 60, 0.2)', borderColor: '#e74c3c', color: '#ff6b6b' }}>
            <i className="fas fa-passport"></i>
            Immigration Case Assessment
          </div>

          <h1>Start Your <span className="highlight">Immigration Case</span></h1>

          <p className="form-hero-subtitle">
            Complete this confidential intake form to begin your immigration consultation. 
            Our team specializes in H-1B, L-1, O-1, and green card cases.
          </p>

          <div className="form-hero-features">
            <div className="form-hero-feature">
              <i className="fas fa-bolt"></i>
              <span>24-Hour RFE Response</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-shield-alt"></i>
              <span>100% Confidential</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-building"></i>
              <span>Big 4 Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="form-section-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2>Immigration Intake Form</h2>
              <p>All information is protected by attorney-client privilege</p>
            </div>

            <div className="form-card-body">
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <h3 className="form-section-title">
                  <i className="fas fa-user"></i>
                  Personal Information
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Full Legal Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-input"
                      placeholder="As shown on passport"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Country of Citizenship <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="citizenship"
                      className="form-input"
                      placeholder="e.g., India, China, Brazil"
                      value={formData.citizenship}
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
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-divider"></div>

                {/* Immigration Details */}
                <h3 className="form-section-title">
                  <i className="fas fa-passport"></i>
                  Immigration Details
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Current Immigration Status <span className="required">*</span>
                    </label>
                    <select
                      name="currentStatus"
                      className="form-select"
                      value={formData.currentStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select current status...</option>
                      <option value="h1b">H-1B</option>
                      <option value="l1">L-1A/L-1B</option>
                      <option value="f1">F-1 (Student)</option>
                      <option value="f1-opt">F-1 OPT</option>
                      <option value="b1b2">B-1/B-2 (Visitor)</option>
                      <option value="o1">O-1</option>
                      <option value="green-card">Green Card Holder</option>
                      <option value="none">No Current US Status</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Visa Type Seeking <span className="required">*</span>
                    </label>
                    <select
                      name="visaType"
                      className="form-select"
                      value={formData.visaType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select visa type...</option>
                      <option value="h1b">H-1B (Specialty Occupation)</option>
                      <option value="h1b-transfer">H-1B Transfer</option>
                      <option value="l1a">L-1A (Manager/Executive)</option>
                      <option value="l1b">L-1B (Specialized Knowledge)</option>
                      <option value="o1a">O-1A (Extraordinary Ability)</option>
                      <option value="o1b">O-1B (Arts/Entertainment)</option>
                      <option value="eb1">EB-1 Green Card</option>
                      <option value="eb2">EB-2 Green Card</option>
                      <option value="eb3">EB-3 Green Card</option>
                      <option value="perm">PERM Labor Certification</option>
                      <option value="rfe-response">RFE Response Needed</option>
                      <option value="other">Other/Not Sure</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Employer/Sponsor Name
                    </label>
                    <input
                      type="text"
                      name="employerName"
                      className="form-input"
                      placeholder="Company name (if applicable)"
                      value={formData.employerName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Job Title/Position
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      className="form-input"
                      placeholder="Your current or prospective title"
                      value={formData.jobTitle}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Urgency Level <span className="required">*</span>
                  </label>
                  <select
                    name="urgency"
                    className="form-select"
                    value={formData.urgency}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select urgency...</option>
                    <option value="rfe-emergency">🚨 RFE Emergency (Under 15 days)</option>
                    <option value="visa-expiring">Visa Expiring Soon (Under 30 days)</option>
                    <option value="urgent">Urgent (Within 1-2 months)</option>
                    <option value="standard">Standard (2-4 months)</option>
                    <option value="planning">Planning Ahead (4+ months)</option>
                  </select>
                </div>

                <div className="form-divider"></div>

                {/* Additional Information */}
                <h3 className="form-section-title">
                  <i className="fas fa-file-alt"></i>
                  Additional Information
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Previous Immigration Applications
                  </label>
                  <textarea
                    name="previousApplications"
                    className="form-textarea"
                    placeholder="List any previous visa applications, denials, RFEs, or relevant immigration history..."
                    value={formData.previousApplications}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Additional Details
                  </label>
                  <textarea
                    name="additionalInfo"
                    className="form-textarea"
                    placeholder="Any other details relevant to your immigration case..."
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-info-box">
                  <h4><i className="fas fa-shield-alt"></i> Confidential Notice</h4>
                  <p>All information provided is strictly confidential and protected by attorney-client privilege. We will not share your information with USCIS or any third party without your explicit consent.</p>
                </div>

                <button type="submit" className="form-submit-btn" disabled={loading}>
                  <i className="fas fa-paper-plane"></i>
                  {loading ? 'Submitting...' : 'Submit Immigration Intake'}
                </button>

                <div className="form-note">
                  <i className="fas fa-clock"></i>
                  <span>Our immigration team will review your case and respond within 24 hours</span>
                </div>
              </form>

              {/* Contact Box */}
              <div className="form-contact-box">
                <h4>🚨 RFE Emergency?</h4>
                <p>If you have an RFE deadline or urgent immigration crisis, call immediately:</p>
                <a href="tel:+1-202-555-0199" className="form-contact-item">
                  <i className="fas fa-phone-volume"></i>
                  <span>Emergency: (202) 555-0199</span>
                </a>
                <a href="mailto:immigration@rivalislaw.com" className="form-contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>immigration@rivalislaw.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="form-cta-section">
        <h2>Learn More About Our Immigration Services</h2>
        <p>Explore our H-1B, L-1, O-1, and green card expertise.</p>
        <div className="form-cta-buttons">
          <Link to="/services/immigration" className="form-cta-btn primary">
            <i className="fas fa-passport"></i>
            Immigration Services
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

export default ImmigrationIntake;

