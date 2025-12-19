-- Site Settings Table Migration
-- Run this in your Supabase SQL Editor

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Business Information
  firm_name TEXT NOT NULL DEFAULT 'Rivalis Law',
  attorney_name TEXT NOT NULL DEFAULT 'Aaishwarya Aeron, Esq.',
  attorney_credentials TEXT NOT NULL DEFAULT 'NY & MI Bar | Oxford AI Certified | Big 4 Trained',
  bar_admission TEXT NOT NULL DEFAULT 'New York and Michigan',
  firm_tagline TEXT DEFAULT 'Big 4 Trained Attorney | AI Governance | Global Immigration | M&A Transactions',
  
  -- Primary Contact
  phone_primary TEXT NOT NULL DEFAULT '+1 (313) 771-2283',
  phone_display TEXT NOT NULL DEFAULT '+1 (313) 771-2283',
  email_contact TEXT NOT NULL DEFAULT 'contact@rivalislaw.com',
  
  -- Service-Specific Emails
  email_employment TEXT DEFAULT 'employment@rivalislaw.com',
  email_ip TEXT DEFAULT 'ip@rivalislaw.com',
  email_privacy TEXT DEFAULT 'privacy@rivalislaw.com',
  email_ai TEXT DEFAULT 'ai@rivalislaw.com',
  email_formation TEXT DEFAULT 'formation@rivalislaw.com',
  email_deals TEXT DEFAULT 'deals@rivalislaw.com',
  email_investigations TEXT DEFAULT 'investigations@rivalislaw.com',
  email_contracts TEXT DEFAULT 'contracts@rivalislaw.com',
  email_legal TEXT DEFAULT 'legal@rivalislaw.com',
  
  -- Social Media
  linkedin_url TEXT DEFAULT 'https://linkedin.com/in/aaishaeron',
  
  -- Metadata
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_site_settings_updated_at();

-- Insert default settings (only one row should exist)
INSERT INTO site_settings (
  firm_name,
  attorney_name,
  attorney_credentials,
  bar_admission,
  firm_tagline,
  phone_primary,
  phone_display,
  email_contact
) VALUES (
  'Rivalis Law',
  'Aaishwarya Aeron, Esq.',
  'NY & MI Bar | Oxford AI Certified | Big 4 Trained',
  'New York and Michigan',
  'Big 4 Trained Attorney | AI Governance | Global Immigration | M&A Transactions',
  '+1 (313) 771-2283',
  '+1 (313) 771-2283',
  'contact@rivalislaw.com'
) ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read site settings (public information)
CREATE POLICY "Site settings are viewable by everyone"
  ON site_settings
  FOR SELECT
  USING (true);

-- Only admins can update site settings
CREATE POLICY "Only admins can update site settings"
  ON site_settings
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Prevent deletion and insertion (should only have one row)
CREATE POLICY "Prevent site settings deletion"
  ON site_settings
  FOR DELETE
  USING (false);

CREATE POLICY "Prevent additional site settings rows"
  ON site_settings
  FOR INSERT
  WITH CHECK (false);
