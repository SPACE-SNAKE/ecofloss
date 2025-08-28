import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/supabase'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: true })

        if (error) {
          setError(error.message)
        } else {
          setProducts(data || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error, refetch: () => fetchProducts() }
}

export function useGlobalCounters() {
  const [counters, setCounters] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCounters() {
      try {
        const { data, error } = await supabase
          .from('global_counters')
          .select('*')

        if (error) {
          setError(error.message)
        } else {
          const countersMap = data?.reduce((acc, counter) => {
            acc[counter.metric_name] = counter.metric_value
            return acc
          }, {} as Record<string, number>) || {}
          setCounters(countersMap)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCounters()

    // Set up real-time subscription for counter updates
    const subscription = supabase
      .channel('global_counters')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'global_counters' },
        (payload) => {
          console.log('Counter updated:', payload)
          fetchCounters() // Refetch counters when they change
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { counters, loading, error }
}