-- =====================================================
-- SUPABASE DATABASE MIGRATIONS
-- Run these in your Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. ADD EMAIL COLUMN TO PAYMENTS TABLE
-- =====================================================
-- This allows us to track payments for both logged-in 
-- and anonymous users before account creation

ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(email);

-- Update existing payments to copy email from user profile
UPDATE payments 
SET email = profiles.email 
FROM profiles 
WHERE payments.user_id = profiles.id 
  AND payments.email IS NULL;

COMMENT ON COLUMN payments.email IS 'Email address for payment tracking, supports both authenticated and anonymous users';

-- =====================================================
-- 2. ADD PENDING_PAYMENT STATUS TO FORM_SUBMISSIONS
-- =====================================================
-- Allow form_submissions.status to include 'pending_payment'

-- Drop the existing check constraint
ALTER TABLE form_submissions 
DROP CONSTRAINT IF EXISTS form_submissions_status_check;

-- Add new constraint with 'pending_payment' included
ALTER TABLE form_submissions
ADD CONSTRAINT form_submissions_status_check 
CHECK (status IN ('pending', 'pending_payment', 'reviewed', 'in_progress', 'completed', 'archived'));

-- If you're using an enum type instead (uncomment if needed):
-- ALTER TYPE form_submission_status ADD VALUE IF NOT EXISTS 'pending_payment';

-- =====================================================
-- 3. UPDATE ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
-- These policies allow anonymous users to submit forms
-- and create payments before account creation

-- Drop ALL existing policies for form_submissions
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'form_submissions') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON form_submissions', r.policyname);
    END LOOP;
END $$;

-- Drop ALL existing policies for payments
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'payments') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON payments', r.policyname);
    END LOOP;
END $$;

-- =====================================================
-- FORM_SUBMISSIONS POLICIES
-- =====================================================

-- Policy 1: Allow EVERYONE (including anonymous) to INSERT form submissions
CREATE POLICY "Allow anonymous form submission"
ON form_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Allow EVERYONE to SELECT (we'll handle privacy in application layer for anonymous)
CREATE POLICY "Allow form submission reads"
ON form_submissions
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy 3: Allow updates for linking to user accounts
CREATE POLICY "Allow user_id updates for account linking"
ON form_submissions
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- PAYMENTS POLICIES
-- =====================================================

-- Policy 1: Allow EVERYONE (including anonymous) to INSERT payments
CREATE POLICY "Allow anonymous payment creation"
ON payments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Allow EVERYONE to SELECT payments (we'll handle privacy in application)
CREATE POLICY "Allow payment reads"
ON payments
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy 3: Allow updates for linking to user accounts
CREATE POLICY "Allow user_id updates for account linking"
ON payments
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- 4. OPTIONAL: ADD CONSULTATION_PAID TO PROFILES
-- =====================================================
-- This provides faster lookups for paid users
-- (Optional performance optimization)

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS consultation_paid BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN profiles.consultation_paid IS 'Quick flag to check if user has paid for consultation';

-- Create function to auto-update this flag when payment succeeds
CREATE OR REPLACE FUNCTION update_consultation_paid_flag()
RETURNS TRIGGER AS $$
BEGIN
  -- If a payment is marked as succeeded and has a user_id, update their profile
  IF NEW.status = 'succeeded' AND NEW.user_id IS NOT NULL THEN
    UPDATE profiles 
    SET consultation_paid = true 
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update flag
DROP TRIGGER IF EXISTS trigger_update_consultation_paid ON payments;
CREATE TRIGGER trigger_update_consultation_paid
  AFTER INSERT OR UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_consultation_paid_flag();

-- =====================================================
-- 5. VERIFY RLS IS ENABLED
-- =====================================================

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 6. GRANT PERMISSIONS
-- =====================================================

-- CRITICAL: Grant permissions to authenticated and anonymous users
-- These are required for RLS policies to work

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Specific table permissions
GRANT SELECT, INSERT, UPDATE ON form_submissions TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON payments TO anon, authenticated;
GRANT SELECT ON services TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON purchases TO anon, authenticated;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify your changes worked:

-- 1. Check if email column exists in payments
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'payments' AND column_name = 'email';

-- 2. Check RLS policies for form_submissions
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'form_submissions';

-- 3. Check RLS policies for payments
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'payments';

-- 4. Test anonymous form submission (should return success)
-- (Run this in SQL editor to test)
INSERT INTO form_submissions (email, form_type, form_data, status)
VALUES ('test@example.com', 'client-intake', '{"test": true}'::jsonb, 'pending_payment')
RETURNING *;

-- =====================================================
-- MIGRATION COMPLETE!
-- =====================================================
-- After running these migrations:
-- 1. Anonymous users can submit forms
-- 2. Anonymous users can create payments
-- 3. Payments are tracked by email
-- 4. Users can view their pre-account submissions after signup
-- 5. Account linking works automatically
-- =====================================================
