import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations

// Services
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  
  if (error) throw error;
  return data;
};

export const getServiceBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateServicePrice = async (id: string, price: number) => {
  const { data, error } = await supabase
    .from('services')
    .update({ price })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Form Submissions
export const submitForm = async (
  formType: string,
  email: string,
  formData: Record<string, unknown>
) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('form_submissions')
    .insert({
      form_type: formType,
      email,
      form_data: formData,
      user_id: user?.id || null,
      status: 'pending'
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getFormSubmissions = async (formType?: string) => {
  let query = supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (formType) {
    query = query.eq('form_type', formType);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const updateFormSubmissionStatus = async (
  id: string,
  status: string,
  adminNotes?: string
) => {
  const { data, error } = await supabase
    .from('form_submissions')
    .update({ status, admin_notes: adminNotes })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// User Profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateUserProfile = async (
  userId: string,
  updates: { full_name?: string; company_name?: string; phone?: string }
) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Purchases
export const getUserPurchases = async (userId: string) => {
  const { data, error } = await supabase
    .from('purchases')
    .select(`
      *,
      service:services(*),
      form_submission:form_submissions(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getAllPurchases = async () => {
  const { data, error } = await supabase
    .from('purchases')
    .select(`
      *,
      service:services(*),
      form_submission:form_submissions(*),
      profile:profiles(*)
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Payments
export const getUserPayments = async (userId: string) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Admin: Get all users
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Admin: Update user role
export const updateUserRole = async (userId: string, role: 'user' | 'admin') => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
