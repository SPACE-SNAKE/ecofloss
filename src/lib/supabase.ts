import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database schema
export interface Product {
  id: string
  name: string
  description: string
  price: number
  inventory_count: number
  image_urls: string[]
  category: 'floss' | 'toothbrush' | 'toothpaste'
  trees_planted_per_purchase: number
  pandas_supported_per_purchase: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_email: string
  customer_name: string
  shipping_address: any
  billing_address: any
  items: any[]
  subtotal: number
  tax_amount: number
  shipping_cost: number
  total_amount: number
  conservation_donation: number
  stripe_payment_intent_id?: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  tracking_number?: string
  created_at: string
  updated_at: string
}

export interface ConservationImpact {
  id: string
  order_id: string
  trees_planted: number
  pandas_supported: number
  bamboo_reforestation_donation: number
  panda_conservation_donation: number
  total_environmental_impact: number
  created_at: string
}

export interface GlobalCounter {
  id: string
  metric_name: 'total_trees' | 'total_pandas_supported' | 'total_orders' | 'total_revenue'
  metric_value: number
  last_updated: string
}