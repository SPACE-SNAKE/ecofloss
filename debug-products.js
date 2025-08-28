// Debug script to check products in database
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pvyjxnfnuxbzprsbeihq.supabase.co'
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2eWp4bmZudXhienByc2JlaWhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjMzNDE0MSwiZXhwIjoyMDcxOTEwMTQxfQ.NBHsXYVaSFXBLlbYZ_9gotsd0L9GzZwuDuc2QYg0PyU'

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function debugProducts() {
  console.log('🔍 Checking products in database...')
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('❌ Error fetching products:', error)
    return
  }

  console.log(`📦 Found ${products.length} products:`)
  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name} - $${product.price} (ID: ${product.id})`)
  })

  // Check for duplicates by name
  const names = products.map(p => p.name)
  const duplicates = names.filter((name, index) => names.indexOf(name) !== index)
  
  if (duplicates.length > 0) {
    console.log('⚠️  Duplicate product names found:', duplicates)
    
    // Clean up duplicates - keep the first occurrence
    for (const dupName of [...new Set(duplicates)]) {
      const dupeProducts = products.filter(p => p.name === dupName)
      console.log(`🗑️  Removing ${dupeProducts.length - 1} duplicates of "${dupName}"`)
      
      // Keep the first one, delete the rest
      for (let i = 1; i < dupeProducts.length; i++) {
        const { error: deleteError } = await supabase
          .from('products')
          .delete()
          .eq('id', dupeProducts[i].id)
        
        if (deleteError) {
          console.error(`❌ Error deleting duplicate ${dupeProducts[i].id}:`, deleteError)
        } else {
          console.log(`✅ Deleted duplicate: ${dupeProducts[i].id}`)
        }
      }
    }
    
    console.log('🧹 Cleanup complete!')
  } else {
    console.log('✅ No duplicates found')
  }
}

debugProducts()