# Payment Flow Demo - Complete Integration Guide

## Overview
This document demonstrates the complete consultation payment flow implementation using toast notifications instead of persistent banners.

## How It Works - User Journey

### Scenario 1: New User Fills Form (First Time)

1. **User visits ClientIntakePage** (`/forms/client-intake`)
   - No FormAccessGuard restrictions (first form is free to fill)
   - User fills out form with their email

2. **User submits form**
   - Form data sent to Supabase
   - `submitForm()` checks: `hasConsultationPaid(email)` → Returns `false`
   - Form stored with status: `'pending_payment'`
   - Returns: `{ needsPayment: true }`

3. **Payment Modal appears automatically**
   ```tsx
   <PaymentModal
     isOpen={showPaymentModal}
     email="user@example.com"
     amount={299}
   />
   ```
   - Shows $299 consultation fee breakdown
   - Stripe payment form (ready for integration)

4. **User completes payment**
   - Stripe processes payment
   - `handlePaymentSuccess(stripePaymentId)` called
   - Records in `payments` table
   - Updates form status to `'pending'`
   - Payment modal closes

5. **Account Creation Nudge appears**
   ```tsx
   <AccountCreationNudge
     isOpen={showNudgeModal}
     email="user@example.com"
     paymentId="pay_123"
   />
   ```
   - Shows benefits of creating account
   - Two options: "Create Account" or "Skip for Now"

### Scenario 2A: User Creates Account Immediately

6. **User clicks "Create Account"**
   - Navigates to `/signup` with state:
     ```tsx
     {
       email: "user@example.com",
       paymentId: "pay_123",
       fromConsultation: true
     }
     ```
   - Email pre-filled in signup form
   - After signup completes:
     - `linkConsultationToAccount(userId, email)` runs
     - Links payment record to new user_id
     - Links form submission to new user_id
     - Clears localStorage flags
   - User redirected to dashboard
   - ✅ **Can now access all forms freely**

### Scenario 2B: User Skips Account Creation

6. **User clicks "Skip for Now"**
   - `handleSkipAccount()` called
   - Sets localStorage flags:
     ```javascript
     localStorage.setItem('pending_account_creation', 'true')
     localStorage.setItem('consultation_email', 'user@example.com')
     localStorage.setItem('consultation_payment_id', 'pay_123')
     ```
   - Toast notification shows:
     > **Consultation Confirmed!**
     > 
     > Your consultation is confirmed! You'll need to create an account before filling any other forms. We've sent confirmation to user@example.com
   - User stays on current page
   - ⚠️ **Cannot access other forms until account created**

### Scenario 3: Returning User Tries to Access Another Form

7. **User (who skipped) visits another form** (e.g., `/forms/immigration-intake`)
   - `FormAccessGuard` wraps the page
   - Checks: `canAccessForms(user)` → Returns:
     ```javascript
     {
       canAccess: false,
       reason: "Please create an account to access additional forms after your consultation payment."
     }
     ```

8. **Toast notification appears automatically**
   ```tsx
   toast({
     title: "Account Required",
     description: "You need to create an account to access additional forms...",
     action: <Button>Create Account</Button>,
     duration: 10000 // 10 seconds
   })
   ```
   - User sees prominent toast with CTA button
   - Can click "Create Account" → Goes to `/signup`
   - Toast auto-dismisses after 10 seconds
   - **No persistent banner cluttering the UI**

## Component Architecture

### 1. FormAccessGuard Component
**Location**: `src/components/Common/FormAccessGuard.tsx`

**Purpose**: Protects forms from users who paid but haven't created accounts

**Usage**:
```tsx
<FormAccessGuard>
  <YourFormContent />
</FormAccessGuard>
```

**What it does**:
- Checks if user is logged in
- If not logged in, checks localStorage for payment flags
- If payment exists but no account: Shows toast notification
- Toast includes "Create Account" button
- Does NOT redirect automatically (better UX)

### 2. PaymentModal Component
**Location**: `src/components/Common/PaymentModal.tsx`

**Purpose**: Collects $299 consultation payment

**Usage**:
```tsx
<PaymentModal
  isOpen={showPaymentModal}
  onClose={closePaymentModal}
  onSuccess={handlePaymentSuccess}
  email={currentEmail}
  amount={299}
/>
```

**Props**:
- `isOpen`: Controls modal visibility
- `onClose`: Handler to close modal
- `onSuccess`: Called with Stripe payment ID after successful payment
- `email`: User's email for payment record
- `amount`: Payment amount (default: 299)

### 3. AccountCreationNudge Component
**Location**: `src/components/Common/AccountCreationNudge.tsx`

**Purpose**: Encourages account creation after payment

**Usage**:
```tsx
<AccountCreationNudge
  isOpen={showNudgeModal}
  email={currentEmail}
  paymentId={paymentId}
  onSkip={handleSkipAccount}
/>
```

**Features**:
- Shows benefits of creating account
- "Create Account" button → Navigate to signup
- "Skip for Now" button → Call onSkip handler
- Sets localStorage flags if skipped

### 4. useFormSubmissionWithPayment Hook
**Location**: `src/hooks/useFormSubmissionWithPayment.ts`

**Purpose**: Centralized state management for entire payment flow

**Usage**:
```tsx
const {
  showPaymentModal,
  showNudgeModal,
  currentEmail,
  paymentId,
  handleFormSubmit,
  handlePaymentSuccess,
  handleSkipAccount,
  closePaymentModal,
} = useFormSubmissionWithPayment();
```

**Returns**:
- **State**: `showPaymentModal`, `showNudgeModal`, `currentEmail`, `paymentId`
- **Handlers**: 
  - `handleFormSubmit(email, needsPayment)` - Initiates flow after form submission
  - `handlePaymentSuccess(stripePaymentId)` - Processes successful payment
  - `handleSkipAccount()` - Handles user skipping account creation
  - `closePaymentModal()` - Closes payment modal

**What it does**:
- Manages all modal visibility states
- Stores user email and payment ID
- Records payment to database
- Updates form submissions after payment
- Shows appropriate toast notifications
- Sets localStorage flags

## Toast Notifications Used

### 1. Form Submitted Successfully
**Trigger**: Form submitted, no payment needed (user already paid)
```tsx
toast({
  title: "Form Submitted Successfully",
  description: "Thank you! Your form has been submitted. We will contact you within 24 hours.",
  duration: 5000,
});
```

### 2. Consultation Confirmed
**Trigger**: User skips account creation after payment
```tsx
toast({
  title: "Consultation Confirmed!",
  description: "Your consultation is confirmed! You'll need to create an account before filling any other forms. We've sent confirmation to user@example.com",
  duration: 8000,
});
```

### 3. Account Required (Most Important!)
**Trigger**: User tries to access form without account after paying
```tsx
toast({
  title: "Account Required",
  description: "You need to create an account to access additional forms after your consultation payment.",
  action: (
    <button onClick={goToSignup}>
      Create Account
    </button>
  ),
  duration: 10000,
});
```

### 4. Payment Error
**Trigger**: Payment succeeded but database error
```tsx
toast({
  title: "Error",
  description: "Payment was successful but there was an error. Please contact us.",
  variant: "destructive",
});
```

## Database Schema

### payments table
```sql
id: uuid (primary key)
user_id: uuid (nullable - null for anonymous)
email: text (required)
stripe_payment_id: text
amount: decimal
currency: text (default: 'usd')
status: text ('pending', 'succeeded', 'failed')
payment_method: text
metadata: jsonb
created_at: timestamp
```

### form_submissions table
```sql
id: uuid (primary key)
user_id: uuid (nullable)
email: text (required)
form_type: text (e.g., 'client-intake')
form_data: jsonb
status: text ('pending_payment', 'pending', 'reviewed')
created_at: timestamp
```

## Key Functions

### consultationFlow.ts

#### hasConsultationPaid(email, userId?)
- Checks if user has paid for consultation
- Queries `payments` table
- Returns boolean

#### canAccessForms(user)
- Determines if user can access additional forms
- Returns: `{ canAccess: boolean, reason?: string }`
- Logic:
  - Logged in user → ✅ Can access
  - Anonymous + paid → ❌ Cannot access (needs account)
  - Anonymous + not paid → ✅ Can access first form

#### setAccountCreationPending(email, paymentId)
- Sets localStorage flags for returning users
- Called when user skips account creation

### supabase.ts

#### submitForm(formType, email, formData)
- Submits form to database
- Checks payment status
- Returns: `{ ...data, needsPayment: boolean }`

#### recordConsultationPayment(email, stripePaymentId, amount, userId?)
- Records payment in payments table
- Supports both logged-in and anonymous users

#### updateFormSubmissionsAfterPayment(email)
- Updates all forms for email from 'pending_payment' → 'pending'
- Called after successful payment

## Integration Steps for Other Forms

To add the payment flow to any form:

1. **Import required components and hook**:
```tsx
import { FormAccessGuard } from '../../components/Common/FormAccessGuard';
import { PaymentModal } from '../../components/Common/PaymentModal';
import { AccountCreationNudge } from '../../components/Common/AccountCreationNudge';
import { useFormSubmissionWithPayment } from '../../hooks/useFormSubmissionWithPayment';
```

2. **Use the hook**:
```tsx
const {
  showPaymentModal,
  showNudgeModal,
  currentEmail,
  paymentId,
  handleFormSubmit,
  handlePaymentSuccess,
  handleSkipAccount,
  closePaymentModal,
} = useFormSubmissionWithPayment();
```

3. **Wrap page content with FormAccessGuard**:
```tsx
return (
  <FormAccessGuard>
    {/* Your form content */}
  </FormAccessGuard>
);
```

4. **Add modals inside FormAccessGuard**:
```tsx
<FormAccessGuard>
  <PaymentModal
    isOpen={showPaymentModal}
    onClose={closePaymentModal}
    onSuccess={handlePaymentSuccess}
    email={currentEmail}
    amount={299}
  />
  
  <AccountCreationNudge
    isOpen={showNudgeModal}
    email={currentEmail}
    paymentId={paymentId}
    onSkip={handleSkipAccount}
  />
  
  {/* Rest of your page */}
</FormAccessGuard>
```

5. **Update form submission handler**:
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const result = await submitForm('your-form-type', formData.email, formData);
    handleFormSubmit(formData.email, result.needsPayment || false);
    
    // Clear form
    setFormData(initialState);
  } catch (error) {
    alert('Error submitting form. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

## Testing Checklist

- [ ] First-time user can fill form
- [ ] Payment modal appears after form submission
- [ ] Payment can be processed (Stripe integration needed)
- [ ] Account creation nudge appears after payment
- [ ] User can create account from nudge
- [ ] Payment and form linked to new account
- [ ] User can skip account creation
- [ ] Toast confirms skipped account creation
- [ ] localStorage flags set correctly
- [ ] Returning user (who skipped) sees toast when accessing other forms
- [ ] Toast has "Create Account" button
- [ ] Clicking button navigates to signup
- [ ] Signup prefills email
- [ ] After signup, user can access all forms
- [ ] Logged-in user can access all forms without payment gate

## Next Steps

1. **Integrate Stripe**:
   - Add Stripe publishable key to `.env`
   - Install `@stripe/stripe-js` and `@stripe/react-stripe-js`
   - Update PaymentModal to use Stripe Elements
   - Set up webhook for payment confirmation

2. **Update Signup Flow**:
   - Detect `fromConsultation` state
   - Call `linkConsultationToAccount()` after successful signup
   - Show confirmation message
   - Clear localStorage flags

3. **Apply to All Forms**:
   - Update remaining 8 forms with FormAccessGuard
   - Use same hook pattern

4. **Database Updates** (Optional):
   - Add `consultation_paid` boolean to profiles table for faster lookups
   - Add indexes on email fields in payments and form_submissions

## Why Toast > Persistent Banner

✅ **Better UX**:
- Only shows when relevant (user action triggered)
- Doesn't clutter the interface
- Auto-dismisses to avoid annoyance

✅ **More Actionable**:
- Includes direct "Create Account" CTA button
- Shows in context of user's action
- Clear call-to-action

✅ **Less Invasive**:
- Doesn't take permanent screen real estate
- User can dismiss if needed
- Appears at appropriate moments

✅ **Modern Pattern**:
- Standard UI pattern users understand
- Consistent with shadcn/ui design system
- Professional appearance

## File Structure

```
src/
├── components/
│   ├── Common/
│   │   ├── FormAccessGuard.tsx        ✅ Guards forms, shows toast
│   │   ├── PaymentModal.tsx           ✅ Collects payment
│   │   └── AccountCreationNudge.tsx   ✅ Encourages account creation
│   └── ui/
│       ├── toast.tsx                   ✅ shadcn toast component
│       └── toaster.tsx                 ✅ Toast container
├── hooks/
│   ├── use-toast.ts                    ✅ shadcn toast hook
│   └── useFormSubmissionWithPayment.ts ✅ Payment flow state management
├── lib/
│   └── supabase.ts                     ✅ Database functions
├── utils/
│   └── consultationFlow.ts             ✅ Business logic utilities
└── pages/
    └── Forms/
        └── ClientIntakePage.tsx        ✅ Example integration
```

## Example: ClientIntakePage Integration

See `src/pages/Forms/ClientIntakePage.tsx` for complete working example with:
- ✅ FormAccessGuard wrapper
- ✅ Payment modal integration
- ✅ Account creation nudge
- ✅ Toast notifications
- ✅ Complete payment flow handling

This serves as the reference implementation for all other forms.
