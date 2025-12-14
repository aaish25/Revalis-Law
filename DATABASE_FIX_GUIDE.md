# 🔧 Database Fix Instructions

## Problem Summary

Your database is missing:
1. ✗ `email` column in `payments` table
2. ✗ RLS policies allowing anonymous form submissions

## Quick Fix (5 minutes)

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Run the Migration

1. Open the file: `SUPABASE_MIGRATIONS.sql`
2. Copy **ALL** the SQL code
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press Cmd+Enter)

### Step 3: Verify Changes

The migration includes verification queries at the bottom. After running, you should see:

✅ `email` column added to `payments` table
✅ Multiple RLS policies created for `form_submissions` and `payments`
✅ Trigger created for auto-updating `consultation_paid` flag

### Step 4: Test Your Application

1. Refresh your browser at http://localhost:5173
2. Navigate to `/intake` (Client Intake Form)
3. Fill out and submit the form
4. Should now work without 401/400 errors! 🎉

## What the Migration Does

### 1. Adds Email Column
```sql
ALTER TABLE payments ADD COLUMN email TEXT;
```
- Allows tracking payments for anonymous users
- Required for consultation payment flow

### 2. Updates RLS Policies
```sql
CREATE POLICY "Allow anonymous form submission"
CREATE POLICY "Allow anonymous payment creation"
```
- Allows anonymous users to submit forms
- Allows anonymous users to create payments
- Still secure (users can only view their own data)

### 3. Adds Performance Optimization
```sql
ALTER TABLE profiles ADD COLUMN consultation_paid BOOLEAN;
```
- Optional flag for faster "has paid" lookups
- Auto-updated via database trigger

## Security Notes

✅ **Secure**: Anonymous users can INSERT but cannot view others' data
✅ **Private**: Users can only SELECT their own submissions (by user_id or email)
✅ **Admin Access**: Admins can view/update all records
✅ **Account Linking**: Allows updating `user_id` when account is created

## Troubleshooting

### Error: "column already exists"
**Solution**: Some columns already exist. That's fine! The migration uses `IF NOT EXISTS` so it's safe to re-run.

### Error: "policy already exists"  
**Solution**: The migration drops old policies first. If you see this, the old policies are being replaced with better ones.

### Still getting 401 errors?
**Verify**:
1. Check RLS is enabled: `ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;`
2. Check policies exist: Run the verification queries at the bottom of the SQL file
3. Check permissions: `GRANT SELECT, INSERT ON form_submissions TO anon;`

## Testing the Fix

### Test 1: Anonymous Form Submission
```javascript
// In browser console at http://localhost:5173/intake
await supabase
  .from('form_submissions')
  .insert({
    email: 'test@example.com',
    form_type: 'client-intake',
    form_data: { test: true },
    status: 'pending_payment'
  })
// Should succeed without 401 error
```

### Test 2: Payment Status Check
```javascript
// Check payment status by email (should work now)
await supabase
  .from('payments')
  .select('id')
  .eq('email', 'test@example.com')
  .eq('status', 'succeeded')
// Should succeed without 400 error
```

## After Migration

Your payment flow will now work:
1. ✅ User fills form (anonymous)
2. ✅ Form stored with email and status='pending_payment'
3. ✅ Payment modal appears
4. ✅ Payment recorded with email
5. ✅ Form status updated to 'pending'
6. ✅ Account creation nudge shows
7. ✅ If account created: payment + forms linked to user_id

## Need Help?

If you encounter any issues:

1. **Check Supabase logs**: Dashboard → Logs → API Logs
2. **Verify table structure**: Dashboard → Table Editor → payments
3. **Check RLS policies**: Dashboard → Authentication → Policies
4. **Test in SQL Editor**: Run the verification queries from migration file

The migration is designed to be **idempotent** (safe to run multiple times) and **backward compatible** (won't break existing data).
