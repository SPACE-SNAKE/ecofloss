import 'dotenv/config'
import Stripe from 'stripe'

// Load environment variables from .env.local
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const products = [
  {
    name: 'Premium Bamboo Dental Floss',
    description: 'Professional twin-line bamboo fiber floss with custom EcoFloss branding. Zero microplastic shedding with superior strength and natural antibacterial properties. Each 30-meter container is packaged in sustainable, biodegradable materials.',
    price: 1299, // $12.99
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80'],
    metadata: {
      category: 'floss',
      trees_planted: '3',
      pandas_supported: '1.0',
      inventory_count: '150'
    }
  },
  {
    name: 'Bamboo Toothbrush - Individual',
    description: 'CE-certified bamboo toothbrush with organic charcoal holder design. Features soft Dupont bristles and 100% biodegradable bamboo handle. Ergonomically designed for effective daily cleaning with custom EcoFloss branding.',
    price: 899, // $8.99
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'],
    metadata: {
      category: 'toothbrush',
      trees_planted: '1',
      pandas_supported: '0.5',
      inventory_count: '200'
    }
  },
  {
    name: 'Bamboo Toothbrush - 2 Pack',
    description: 'Duo set of CE-certified bamboo toothbrushes with organic charcoal holders. Perfect for couples or family use. Features soft Dupont bristles, biodegradable handles, and comes in eco-friendly packaging.',
    price: 1599, // $15.99
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'],
    metadata: {
      category: 'toothbrush',
      trees_planted: '2',
      pandas_supported: '1.0',
      inventory_count: '100'
    }
  },
  {
    name: 'Bamboo Interdental Brush Kit',
    description: 'Professional 8-piece bamboo interdental brush set for comprehensive oral care. Includes multiple sizes for different tooth gaps. 100% biodegradable handles with soft, effective bristles for plaque removal.',
    price: 1699, // $16.99
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80'],
    metadata: {
      category: 'floss',
      trees_planted: '2',
      pandas_supported: '0.75',
      inventory_count: '75'
    }
  },
  {
    name: 'Complete Bamboo Oral Care Travel Kit',
    description: 'All-in-one sustainable travel solution including bamboo toothbrush, dental floss, and interdental brushes. Comes in compact, biodegradable travel case with custom EcoFloss branding. Perfect for eco-conscious travelers.',
    price: 2499, // $24.99
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'],
    metadata: {
      category: 'toothbrush',
      trees_planted: '5',
      pandas_supported: '2.0',
      inventory_count: '50'
    }
  }
]

async function createStripeProducts() {
  console.log('🚀 Setting up EcoFloss products in Stripe...\n')
  
  const createdProducts = []
  
  for (const productData of products) {
    try {
      // Create product
      console.log(`📦 Creating product: ${productData.name}`)
      const product = await stripe.products.create({
        name: productData.name,
        description: productData.description,
        images: productData.images,
        metadata: productData.metadata
      })
      
      // Create price for the product
      console.log(`💰 Creating price: $${(productData.price / 100).toFixed(2)}`)
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: productData.price,
        currency: 'usd'
      })
      
      createdProducts.push({
        product_id: product.id,
        price_id: price.id,
        name: productData.name,
        price: productData.price
      })
      
      console.log(`✅ Created: ${product.id} with price ${price.id}\n`)
      
    } catch (error) {
      console.error(`❌ Error creating ${productData.name}:`, error.message)
    }
  }
  
  console.log('📋 Product Summary:')
  console.log('==================')
  createdProducts.forEach(p => {
    console.log(`${p.name}: ${p.product_id} (${p.price_id})`)
  })
  
  console.log('\n🎉 Stripe product setup complete!')
  console.log('💡 You can now view these products in your Stripe dashboard')
  console.log('🔗 https://dashboard.stripe.com/test/products')
  
  return createdProducts
}

// Run the setup
createStripeProducts().catch(console.error)