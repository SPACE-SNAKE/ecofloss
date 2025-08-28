import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

// Debug environment variables
console.log('🔍 Environment check:')
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? `${process.env.STRIPE_SECRET_KEY.substring(0, 12)}...` : 'NOT FOUND')

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY environment variable is required')
  process.exit(1)
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Create payment intent endpoint
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', items, customerInfo } = req.body

    // Validate required fields
    if (!amount || !items || !customerInfo) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customer_email: customerInfo.email,
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        items_count: items.length,
        order_type: 'ecofloss_order'
      }
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({ error: 'Failed to create payment intent' })
  }
})

// Get products from Stripe
app.get('/products', async (req, res) => {
  try {
    // Fetch products and prices separately
    const [productsResponse, pricesResponse] = await Promise.all([
      stripe.products.list({ active: true }),
      stripe.prices.list({ active: true, limit: 100 })
    ])
    
    // Create a map of product ID to price
    const priceMap = new Map()
    pricesResponse.data.forEach(price => {
      if (price.product && typeof price.product === 'string') {
        priceMap.set(price.product, price)
      }
    })
    
    // Transform Stripe products to our format
    const transformedProducts = productsResponse.data.map(product => {
      const price = priceMap.get(product.id)
      const metadata = product.metadata || {}
      
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price ? price.unit_amount : 0,
        price_id: price ? price.id : '',
        images: product.images || [],
        image_urls: product.images || [],
        category: metadata.category || 'oral-care',
        trees_planted_per_purchase: parseInt(metadata.trees_planted || '1'),
        pandas_supported_per_purchase: parseFloat(metadata.pandas_supported || '0.5'),
        inventory_count: parseInt(metadata.inventory_count || '100'),
        is_active: product.active
      }
    })
    
    res.json({ 
      products: transformedProducts,
      count: transformedProducts.length 
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 EcoFloss API server running on http://localhost:${PORT}`)
  console.log(`💳 Stripe configured: ${process.env.STRIPE_SECRET_KEY ? 'YES' : 'NO'}`)
})