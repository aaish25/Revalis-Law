# Site Settings Setup Guide

## Overview

The Site Settings feature allows the admin to manage firm information, contact details, and social media links directly from the admin dashboard without requiring code changes or redeployment.

## Setup Steps

### 1. Run Database Migration

Execute the SQL migration in your Supabase SQL Editor:

```bash
# Open the file and copy the contents
cat SITE_SETTINGS_MIGRATION.sql
```

Or run it directly in Supabase Dashboard:
1. Go to your Supabase project
2. Navigate to **SQL Editor**
3. Paste the contents of `SITE_SETTINGS_MIGRATION.sql`
4. Click **Run**

### 2. Deploy Application

The code changes are already integrated. Just deploy normally:

```bash
# Build and deploy (if using Netlify)
npm run build
# Netlify will auto-deploy from git push
```

### 3. Configure Settings (Post-Deployment)

After deployment, log in as admin:

1. **Navigate to Admin Dashboard**
   - Go to `/dashboard` (you must be logged in as admin)

2. **Open Site Settings Tab**
   - Click on **⚙️ Site Settings** tab

3. **Edit Settings**
   - Click **Edit Settings** button
   - Update all fields as needed
   - Click **Save Changes**

## What Can Be Configured

### Business Information
- **Firm Name**: Your law firm's name
- **Attorney Name**: Principal attorney's name with credentials
- **Attorney Credentials**: Bar admissions and certifications
- **Bar Admission**: States where admitted to practice
- **Firm Tagline**: Short description for footers and headers

### Contact Information
- **Primary Phone**: Main phone number for tel: links
- **Display Phone**: Formatted phone number for display

### Service-Specific Emails
Customize email addresses for each practice area:
- General Contact
- Employment Law
- IP Strategy
- Data Privacy
- AI Governance
- Entity Formation
- M&A / Deals
- Investigations
- Contracts
- Legal (General)

### Social Media
- **LinkedIn URL**: Link to attorney's LinkedIn profile

## Database Schema

The `site_settings` table stores all configuration:

```sql
- id: UUID (Primary Key)
- firm_name: TEXT
- attorney_name: TEXT
- attorney_credentials: TEXT
- bar_admission: TEXT
- firm_tagline: TEXT
- phone_primary: TEXT
- phone_display: TEXT
- email_contact: TEXT
- email_employment: TEXT
- email_ip: TEXT
- email_privacy: TEXT
- email_ai: TEXT
- email_formation: TEXT
- email_deals: TEXT
- email_investigations: TEXT
- email_contracts: TEXT
- email_legal: TEXT
- linkedin_url: TEXT
- updated_at: TIMESTAMPTZ
- updated_by: UUID (FK to auth.users)
```

## Security

- **RLS Enabled**: Row Level Security is enabled
- **Read Access**: Anyone can view settings (public information)
- **Write Access**: Only admins can update settings
- **Audit Trail**: Tracks who updated settings and when

## Usage in Components

To use site settings in any component:

```tsx
import { useSiteSettings } from '../contexts/SiteSettingsContext';

function MyComponent() {
  const { settings, loading, error } = useSiteSettings();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading settings</div>;
  
  return (
    <div>
      <h1>{settings?.firm_name}</h1>
      <p>{settings?.attorney_credentials}</p>
      <a href={`tel:${settings?.phone_primary}`}>Call Us</a>
      <a href={`mailto:${settings?.email_contact}`}>Email Us</a>
    </div>
  );
}
```

## Fallback Behavior

If the database fetch fails, the context automatically falls back to hardcoded default values to ensure the site continues working.

## Benefits

1. **No Redeployment Needed**: Update contact info instantly
2. **Admin-Friendly**: Simple UI in the admin dashboard
3. **Audit Trail**: Track who changed what and when
4. **Type-Safe**: Full TypeScript support
5. **Consistent**: Settings used throughout the entire application

## Future Enhancements

Potential additions:
- Office address fields
- Business hours
- Additional social media links (Twitter, Facebook, etc.)
- Logo upload
- Color scheme customization
- Multiple office locations
