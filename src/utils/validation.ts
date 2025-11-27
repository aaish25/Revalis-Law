import { z } from 'zod';

/**
 * Common validation schemas for forms
 */

// Email validation
export const emailSchema = z.string().email('Please enter a valid email address');

// Phone validation (flexible format)
export const phoneSchema = z.string().regex(
  /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
  'Please enter a valid phone number'
);

// Required string
export const requiredString = z.string().min(1, 'This field is required');

// Client intake form schema
export const clientIntakeSchema = z.object({
  fullName: requiredString,
  email: emailSchema,
  phone: phoneSchema,
  company: z.string().optional(),
  serviceType: requiredString,
  description: requiredString.min(10, 'Please provide more details'),
  urgency: z.enum(['immediate', 'standard', 'flexible']).default('standard'),
});

// Qualification form schema
export const qualificationSchema = z.object({
  companyName: requiredString,
  industry: requiredString,
  employeeCount: z.string().optional(),
  annualRevenue: z.string().optional(),
  legalNeeds: requiredString.min(10, 'Please provide more details'),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  referralSource: z.string().optional(),
  additionalInfo: z.string().optional(),
});

// Immigration intake schema
export const immigrationIntakeSchema = z.object({
  fullName: requiredString,
  email: emailSchema,
  phone: phoneSchema,
  citizenship: requiredString,
  currentStatus: requiredString,
  visaType: requiredString,
  employerName: z.string().optional(),
  jobTitle: z.string().optional(),
  urgency: z.string().optional(),
  previousApplications: z.string().optional(),
  additionalInfo: z.string().optional(),
});

// AI Governance intake schema
export const aiGovernanceIntakeSchema = z.object({
  companyName: requiredString,
  contactName: requiredString,
  email: emailSchema,
  phone: z.string().optional(),
  industry: requiredString,
  aiUseCases: requiredString.min(20, 'Please describe your AI use cases in more detail'),
  dataTypes: z.string().optional(),
  regulatoryRequirements: z.string().optional(),
  existingPolicies: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  additionalInfo: z.string().optional(),
});

// Contact form schema
export const contactSchema = z.object({
  name: requiredString,
  email: emailSchema,
  subject: requiredString,
  message: requiredString.min(10, 'Please provide more details'),
});

// Type exports
export type ClientIntakeFormData = z.infer<typeof clientIntakeSchema>;
export type QualificationFormData = z.infer<typeof qualificationSchema>;
export type ImmigrationIntakeFormData = z.infer<typeof immigrationIntakeSchema>;
export type AIGovernanceIntakeFormData = z.infer<typeof aiGovernanceIntakeSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Validation helper function
 */
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  });

  return { success: false, errors };
}

