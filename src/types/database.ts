// Database types for Supabase
// These types match the database schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company_name: string | null;
          phone: string | null;
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company_name?: string | null;
          phone?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          company_name?: string | null;
          phone?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          price: number | null;
          price_type: 'fixed' | 'hourly' | 'custom' | 'starting_at';
          features: Json;
          category: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          short_description?: string | null;
          price?: number | null;
          price_type?: 'fixed' | 'hourly' | 'custom' | 'starting_at';
          features?: Json;
          category?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          short_description?: string | null;
          price?: number | null;
          price_type?: 'fixed' | 'hourly' | 'custom' | 'starting_at';
          features?: Json;
          category?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      form_submissions: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          form_type: string;
          form_data: Json;
          status: 'pending' | 'reviewed' | 'in_progress' | 'completed' | 'archived';
          assigned_to: string | null;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          form_type: string;
          form_data: Json;
          status?: 'pending' | 'reviewed' | 'in_progress' | 'completed' | 'archived';
          assigned_to?: string | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          email?: string;
          form_type?: string;
          form_data?: Json;
          status?: 'pending' | 'reviewed' | 'in_progress' | 'completed' | 'archived';
          assigned_to?: string | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      purchases: {
        Row: {
          id: string;
          user_id: string | null;
          service_id: string | null;
          form_submission_id: string | null;
          status: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled';
          amount: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          service_id?: string | null;
          form_submission_id?: string | null;
          status?: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled';
          amount?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          service_id?: string | null;
          form_submission_id?: string | null;
          status?: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled';
          amount?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          user_id: string | null;
          purchase_id: string | null;
          stripe_payment_id: string | null;
          stripe_customer_id: string | null;
          amount: number;
          currency: string;
          status: 'pending' | 'succeeded' | 'failed' | 'refunded';
          payment_method: string | null;
          receipt_url: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          purchase_id?: string | null;
          stripe_payment_id?: string | null;
          stripe_customer_id?: string | null;
          amount: number;
          currency?: string;
          status?: 'pending' | 'succeeded' | 'failed' | 'refunded';
          payment_method?: string | null;
          receipt_url?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          purchase_id?: string | null;
          stripe_payment_id?: string | null;
          stripe_customer_id?: string | null;
          amount?: number;
          currency?: string;
          status?: 'pending' | 'succeeded' | 'failed' | 'refunded';
          payment_method?: string | null;
          receipt_url?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Convenience types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Service = Database['public']['Tables']['services']['Row'];
export type FormSubmission = Database['public']['Tables']['form_submissions']['Row'];
export type Purchase = Database['public']['Tables']['purchases']['Row'];
export type Payment = Database['public']['Tables']['payments']['Row'];

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ServiceInsert = Database['public']['Tables']['services']['Insert'];
export type FormSubmissionInsert = Database['public']['Tables']['form_submissions']['Insert'];
export type PurchaseInsert = Database['public']['Tables']['purchases']['Insert'];
export type PaymentInsert = Database['public']['Tables']['payments']['Insert'];

// Update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
export type ServiceUpdate = Database['public']['Tables']['services']['Update'];
export type FormSubmissionUpdate = Database['public']['Tables']['form_submissions']['Update'];
export type PurchaseUpdate = Database['public']['Tables']['purchases']['Update'];
export type PaymentUpdate = Database['public']['Tables']['payments']['Update'];
