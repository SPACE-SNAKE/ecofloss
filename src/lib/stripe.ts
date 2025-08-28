import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe with publishable key (replace with your actual key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

export { stripePromise }

// Product configuration for Stripe
export const STRIPE_PRODUCTS = {
  'bamboo_floss': {
    productId: 'prod_SwpXUSqLeqeQ31',
    priceId: 'price_1S0vsEK1wIvlmIcF3oZeUCKG',
    name: 'Premium Bamboo Dental Floss',
    amount: 1299, // $12.99 in cents
  },
  'bamboo_toothbrush_single': {
    productId: 'prod_SwpXWtF5mUtEvL', 
    priceId: 'price_1S0vsFK1wIvlmIcFcuH4cMNI',
    name: 'Bamboo Toothbrush - Individual', 
    amount: 899, // $8.99 in cents
  },
  'bamboo_toothbrush_2pack': {
    productId: 'prod_SwpX6uE5LMIf0N',
    priceId: 'price_1S0vsFK1wIvlmIcFNwardss5',
    name: 'Bamboo Toothbrush - 2 Pack',
    amount: 1599, // $15.99 in cents
  },
  'interdental_brush_kit': {
    productId: 'prod_SwpXjT6MS5l0UI',
    priceId: 'price_1S0vsGK1wIvlmIcFJPQ3MBYi',
    name: 'Bamboo Interdental Brush Kit',
    amount: 1699, // $16.99 in cents
  },
  'travel_kit': {
    productId: 'prod_SwpXHzKP7imPa8',
    priceId: 'price_1S0vsHK1wIvlmIcFMv3eHuOM',
    name: 'Complete Bamboo Oral Care Travel Kit',
    amount: 2499, // $24.99 in cents
  }
} as const

export type StripeProductKey = keyof typeof STRIPE_PRODUCTS