// Database setup script for EcoFloss
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pvyjxnfnuxbzprsbeihq.supabase.co'
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eWp4bmZudXhienByc2JlaWhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjMzNDE0MSwiZXhwIjoyMDcxOTEwMTQxfQ.NBHsXYVaSFXBLlbYZ_9gotsd0L9GzZwuDuc2QYg0PyU'

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function setupDatabase() {
  console.log('🌱 Setting up EcoFloss database...')

  // Insert initial products
  const products = [
    {
      name: '100% Bamboo Dental Floss',
      description: 'Eliminate your #1 source of daily microplastic intake with our 100% organic bamboo dental floss. Stronger than plastic, naturally antibacterial, and completely biodegradable within 60-90 days. Each purchase plants 3 bamboo trees and supports panda habitat conservation.',
      price: 8.99,
      inventory_count: 500,
      image_urls: [
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80'
      ],
      category: 'floss',
      trees_planted_per_purchase: 3,
      pandas_supported_per_purchase: 1.0,
      is_active: true
    },
    {
      name: 'Biodegradable Bamboo Toothbrush',
      description: 'Complete your plastic-free oral care routine with our ergonomic bamboo toothbrush. Natural antimicrobial handle with soft natural bristles for effective, gentle cleaning. Supports panda habitat preservation with every purchase.',
      price: 6.99,
      inventory_count: 300,
      image_urls: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
        'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80'
      ],
      category: 'toothbrush',
      trees_planted_per_purchase: 1,
      pandas_supported_per_purchase: 0.5,
      is_active: true
    }
  ]

  try {
    // Insert products
    const { data: insertedProducts, error: productsError } = await supabase
      .from('products')
      .insert(products)
      .select()

    if (productsError) {
      console.error('❌ Error inserting products:', productsError)
      return
    }

    console.log('✅ Products inserted successfully:', insertedProducts.length, 'products')

    // Initialize global counters
    const counters = [
      { metric_name: 'total_trees', metric_value: 2847 },
      { metric_name: 'total_pandas_supported', metric_value: 142 },
      { metric_name: 'total_orders', metric_value: 95 },
      { metric_name: 'total_revenue', metric_value: 1247.83 }
    ]

    const { data: insertedCounters, error: countersError } = await supabase
      .from('global_counters')
      .upsert(counters, { onConflict: 'metric_name' })
      .select()

    if (countersError) {
      console.error('❌ Error inserting counters:', countersError)
      return
    }

    console.log('✅ Global counters initialized:', insertedCounters.length, 'counters')
    console.log('🎉 Database setup complete!')
    console.log('\n🌱 Products available:')
    insertedProducts.forEach(product => {
      console.log(`  • ${product.name} - $${product.price}`)
    })

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
  }
}

setupDatabase()