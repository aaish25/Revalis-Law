-- Create emergency_requests table
CREATE TABLE IF NOT EXISTS public.emergency_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  urgency text NOT NULL CHECK (urgency IN ('critical', 'urgent', 'high')),
  issue text NOT NULL,
  contact_mode text NOT NULL CHECK (contact_mode IN ('call', 'email', 'video')),
  phone text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'resolved', 'cancelled')),
  payment_id text NOT NULL,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  contacted_at timestamptz,
  resolved_at timestamptz
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_emergency_requests_user_id ON public.emergency_requests(user_id);

-- Create index on status for admin filtering
CREATE INDEX IF NOT EXISTS idx_emergency_requests_status ON public.emergency_requests(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_emergency_requests_created_at ON public.emergency_requests(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.emergency_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own emergency requests
CREATE POLICY "Users can view own emergency requests"
  ON public.emergency_requests
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own emergency requests
CREATE POLICY "Users can insert own emergency requests"
  ON public.emergency_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can view all emergency requests
CREATE POLICY "Admins can view all emergency requests"
  ON public.emergency_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Admins can update all emergency requests
CREATE POLICY "Admins can update all emergency requests"
  ON public.emergency_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_emergency_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
CREATE TRIGGER set_emergency_requests_updated_at
  BEFORE UPDATE ON public.emergency_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_emergency_requests_updated_at();

-- Grant permissions
GRANT SELECT, INSERT ON public.emergency_requests TO authenticated;
GRANT ALL ON public.emergency_requests TO service_role;
