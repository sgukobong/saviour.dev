export interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string; // Added for AI context
  tags: string[];
  github_url?: string;
  live_url?: string;
  case_study_url?: string;
  image_url?: string;
  featured?: boolean;        // Added
  order_int?: number;        // Added
  created_at: string;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
  is_read?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ExternalPost {
  id: string;
  platform: 'Medium' | 'LinkedIn' | 'Dev.to' | 'Substack' | 'Other';
  url: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
  author_name?: string;
  published_at: string;
  metadata_status: 'pending' | 'processed' | 'error';
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  cover_image?: string;
  published_at: string;
}

export interface PaymentRecord {
  id: string;
  client_id?: string; // Linked to auth
  client_name: string;
  client_email: string;
  service_name: string;
  description?: string;
  amount: number;
  currency: 'NGN' | 'USD';
  invoice_number: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  payment_reference?: string;
  created_at: string;
  paid_at?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'client' | 'user';
}