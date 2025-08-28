import { useState, useEffect } from 'react'

interface StripeProduct {
  id: string
  name: string
  description: string | null
  price: number
  price_id: string
  images: string[]
  category: string
  trees_planted_per_purchase: number
  pandas_supported_per_purchase: number
  inventory_count: number
  is_active: boolean
  image_urls: string[]
}

export function useStripeProducts() {
  const [products, setProducts] = useState<StripeProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3001/products')
        
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        
        const data = await response.json()
        setProducts(data.products)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}