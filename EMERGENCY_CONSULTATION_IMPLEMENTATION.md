# Emergency Consultation Implementation Guide

## Overview
This document outlines the complete implementation of the emergency consultation feature with $499 paywall, requiring user authentication and account creation.

## Architecture

### Flow Diagram
```
User clicks FAB button → Check if logged in → 
  If NOT logged in: Redirect to /login?redirect=/dashboard&tab=emergency
  If logged in: Redirect to /dashboard?tab=emergency →
User fills emergency form →
User clicks "Pay $499 & Submit Request" →
Stripe Checkout (payment processing) →
Payment Success → Store in Supabase + Send emails →
Redirect to /dashboard?tab=emergency&success=true →
Show success message + Display request in history
```

## Components Created/Modified

### 1. EnhancedFooter.tsx (MODIFIED)
**Location:** `/src/components/Layout/EnhancedFooter.tsx`

**Changes:**
- Added `useNavigate` and `useAuth` hooks
- Created `handleEmergencyClick` function to check authentication
- Converted FAB links to buttons with click handlers
- Both emergency call and schedule buttons redirect to `/dashboard?tab=emergency`
- Unauthenticated users redirected to `/login?redirect=/dashboard&tab=emergency`

**Key Code:**
```tsx
const handleEmergencyClick = () => {
  if (!user) {
    navigate('/login?redirect=/dashboard&tab=emergency');
  } else {
    navigate('/dashboard?tab=emergency');
  }
};
```

### 2. EmergencyConsultationForm.tsx (NEW)
**Location:** `/src/components/Forms/EmergencyConsultationForm.tsx`

**Features:**
- Urgency level selection (Critical, Urgent, High Priority)
- Issue description textarea (minimum 50 characters)
- Contact method selection (Call, Email, Video)
- Conditional phone number field
- Stripe payment integration ($499)
- Form data stored in localStorage before payment redirect
- Success state after submission

**Payment Flow:**
1. User fills form
2. Form data saved to localStorage
3. Create Stripe checkout session
4. Redirect to Stripe payment page
5. After payment, PaymentSuccess page processes the data

### 3. UserDashboard.tsx (MODIFIED)
**Location:** `/src/pages/Dashboard/UserDashboard.tsx`

**Changes:**
- Added `useSearchParams` hook
- Added 'emergency' to tab type union
- Added emergency tab button in navigation
- Added query param detection to auto-switch to emergency tab
- Added success message display when `?success=true` param present
- Integrated EmergencyConsultationForm component
- Integrated EmergencyHistory component

**New Tab:**
- Emergency Consultation tab shows:
  - Success message (if just submitted)
  - Emergency consultation form
  - Request history

### 4. EmergencyHistory.tsx (NEW)
**Location:** `/src/components/Dashboard/EmergencyHistory.tsx`

**Features:**
- Fetches user's emergency requests from Supabase
- Displays requests in chronological order (newest first)
- Shows urgency level with color coding
- Displays status badges
- Shows issue description
- Displays admin notes (if any)
- Shows contact timestamps

**Status Colors:**
- Pending: Orange (#f59e0b)
- Contacted: Blue (#3b82f6)
- In Progress: Purple (#8b5cf6)
- Resolved: Green (#10b981)
- Cancelled: Gray (#6b7280)

### 5. PaymentSuccess.tsx (MODIFIED)
**Location:** `/src/pages/PaymentSuccess.tsx`

**Changes:**
- Added emergency consultation detection via localStorage
- Added email function call for emergency requests
- Added redirect to dashboard with success param
- Sends email notification to user and admin
- Clears localStorage after processing

**New Emergency Flow:**
```tsx
// Check for emergency data
const emergencyData = localStorage.getItem('emergencyConsultationData');

if (emergencyData) {
  // Send emergency email
  await fetch('/.netlify/functions/send-emergency-email', {...});
  
  // Clear localStorage
  localStorage.removeItem('emergencyConsultationData');
  
  // Redirect to dashboard
  navigate('/dashboard?tab=emergency&success=true');
}
```

## Backend Functions

### 6. send-emergency-email.js (NEW)
**Location:** `/netlify/functions/send-emergency-email.js`

**Features:**
- POST endpoint accepting emergency request data
- Stores request in Supabase `emergency_requests` table
- Sends two emails via Resend:
  1. **User Confirmation Email:**
     - Gold-themed professional design
     - Request details and confirmation
     - 2-hour response promise
     - Emergency phone number
  2. **Admin Priority Alert:**
     - Red urgent header
     - Client information
     - Issue description
     - Call/email action buttons
     - Timestamp

**Required Environment Variables:**
- `RESEND_API_KEY`: Resend API key
- `VITE_SUPABASE_URL`: Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (for admin access)

**Email Templates:**
Both templates are inline HTML with:
- Responsive design
- Professional styling
- Color-coded urgency levels
- Clear call-to-action buttons
- Footer with contact information

### 7. create-checkout-session.js (MODIFIED)
**Location:** `/netlify/functions/create-checkout-session.js`

**Changes:**
- Added `serviceId` and `serviceName` parameters
- Added emergency consultation product handling
- Updated product name and description based on `serviceId`
- Amount now expected in cents (no multiplication)
- Added service_id to Stripe metadata

**Emergency Service ID:**
```javascript
if (serviceId === 'emergency-consultation') {
  productName = 'Emergency Legal Consultation';
  productDescription = 'Urgent legal consultation with response within 2 hours';
}
```

## Database Schema

### 8. emergency_requests Table (NEW)
**Migration File:** `EMERGENCY_REQUESTS_MIGRATION.sql`

**Schema:**
```sql
CREATE TABLE emergency_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  urgency text CHECK (urgency IN ('critical', 'urgent', 'high')),
  issue text NOT NULL,
  contact_mode text CHECK (contact_mode IN ('call', 'email', 'video')),
  phone text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'resolved', 'cancelled')),
  payment_id text NOT NULL,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  contacted_at timestamptz,
  resolved_at timestamptz
);
```

**Indexes:**
- `idx_emergency_requests_user_id`: Fast user lookups
- `idx_emergency_requests_status`: Admin filtering
- `idx_emergency_requests_created_at`: Chronological sorting

**RLS Policies:**
- Users can view and insert their own requests
- Admins can view and update all requests
- Automatic `updated_at` timestamp via trigger

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install resend @supabase/supabase-js
```

### Step 2: Create Supabase Table
1. Go to Supabase SQL Editor
2. Run the SQL from `EMERGENCY_REQUESTS_MIGRATION.sql`
3. Verify table creation in Table Editor

### Step 3: Configure Environment Variables

#### Netlify Environment Variables:
1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add the following:
   - `RESEND_API_KEY`: Your Resend API key
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `VITE_STRIPE_PUBLIC_KEY`: Your Stripe publishable key

### Step 4: Configure Resend
1. Sign up at resend.com
2. Get API key from dashboard
3. For production: Add and verify your domain
4. For development: Use @resend.dev temporary domain

### Step 5: Test the Flow
1. **Without Account:**
   - Click floating emergency button
   - Should redirect to login
   - After login, should redirect to dashboard emergency tab

2. **With Account:**
   - Click floating emergency button
   - Should go directly to dashboard emergency tab
   - Fill out emergency form
   - Complete $499 payment
   - Verify email received
   - Check request in history

### Step 6: Admin Dashboard (Future Enhancement)
The admin dashboard will need to be updated to show emergency requests:
- Location: `/src/pages/Dashboard/AdminDashboard.tsx`
- Add emergency requests tab
- Show all pending requests sorted by urgency
- Allow status updates
- Add admin notes functionality

## Email Configuration

### User Confirmation Email
**Subject:** Emergency Consultation Request Received - Rivalis Law

**Content:**
- Gold-themed header
- Request confirmation
- Urgency level display
- Issue summary
- Contact method preference
- Response timeline (2 hours)
- Emergency phone number
- Payment confirmation

### Admin Alert Email
**Subject:** 🚨 URGENT: Emergency Legal Consultation Request

**Content:**
- Red urgent header
- Client name and email
- Phone number
- Urgency level indicator
- Full issue description
- Contact mode preference
- Call/Email action buttons
- Payment ID reference
- Timestamp

## Testing Checklist

- [ ] FAB buttons redirect correctly when logged out
- [ ] FAB buttons redirect correctly when logged in
- [ ] Emergency tab loads without errors
- [ ] Emergency form validates properly
- [ ] Form requires 50+ characters for issue
- [ ] Phone field appears when "call" selected
- [ ] Payment redirects to Stripe
- [ ] Payment success stores in database
- [ ] User receives confirmation email
- [ ] Admin receives alert email
- [ ] Success message appears after payment
- [ ] Request history displays correctly
- [ ] Request status colors are correct
- [ ] Admin notes display when present

## File Structure
```
rivalis/
├── netlify/
│   └── functions/
│       ├── create-checkout-session.js (MODIFIED)
│       └── send-emergency-email.js (NEW)
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   └── EmergencyHistory.tsx (NEW)
│   │   ├── Forms/
│   │   │   └── EmergencyConsultationForm.tsx (NEW)
│   │   └── Layout/
│   │       └── EnhancedFooter.tsx (MODIFIED)
│   └── pages/
│       ├── Dashboard/
│       │   └── UserDashboard.tsx (MODIFIED)
│       └── PaymentSuccess.tsx (MODIFIED)
└── EMERGENCY_REQUESTS_MIGRATION.sql (NEW)
```

## Pricing
- Emergency Consultation: **$499**
- Response Time: **Within 2 hours**
- Emergency Phone: **+1 (555) 123-4567** (update this number in production)

## Future Enhancements

1. **Admin Dashboard Integration:**
   - Emergency requests queue
   - Priority sorting
   - One-click status updates
   - Response time tracking
   - Performance metrics

2. **Real-time Notifications:**
   - WebSocket integration for instant admin alerts
   - Browser notifications
   - SMS alerts for critical urgency

3. **Enhanced History:**
   - Filter by status/urgency
   - Search functionality
   - Export to PDF
   - Download request details

4. **Communication Features:**
   - In-app messaging
   - Video call scheduling
   - Document sharing
   - Calendar integration

5. **Analytics:**
   - Response time metrics
   - Request volume tracking
   - Revenue analytics
   - User satisfaction scores

## Support

For issues or questions about this implementation:
1. Check console logs for detailed error messages
2. Verify all environment variables are set
3. Ensure Supabase table exists with correct RLS policies
4. Test Resend API key with test email
5. Verify Stripe keys are correct for your environment

## Production Checklist

Before deploying to production:
- [ ] Update emergency phone number in all components
- [ ] Configure custom email domain in Resend
- [ ] Update email "from" addresses
- [ ] Test with real Stripe account (not test mode)
- [ ] Set up monitoring for failed email sends
- [ ] Create admin documentation
- [ ] Train support team on emergency workflow
- [ ] Set up alerts for pending requests over 2 hours
- [ ] Configure backup contact methods
- [ ] Test all edge cases

## Notes

- Using @resend.dev temporary domain for development
- Will migrate to custom domain (noreply@rivalislaw.com) in production
- Emergency requests stored indefinitely for legal compliance
- Payment IDs tracked for reconciliation
- All timestamps in UTC
