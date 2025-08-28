import React, { createContext, useContext, useReducer, useEffect } from 'react'
import type { Product } from '@/lib/supabase'
import { calculateTreesPlanted, calculateMicroplasticsEliminated, calculateConservationImpact } from '@/lib/utils'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedOptions?: {
    bristleType?: 'soft' | 'medium'
    packSize?: string
  }
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

interface CartContextType {
  state: CartState
  addItem: (product: Product, quantity?: number, options?: CartItem['selectedOptions']) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getTotalTrees: () => number
  getTotalMicroplasticsEliminated: () => number
  getConservationImpact: () => ReturnType<typeof calculateConservationImpact>
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; options?: CartItem['selectedOptions'] } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: CartState }

const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, options } = action.payload
      const existingItemIndex = state.items.findIndex(
        item => 
          item.product.id === product.id && 
          JSON.stringify(item.selectedOptions) === JSON.stringify(options)
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        }
        return { ...state, items: updatedItems }
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}-${Math.random()}`,
          product,
          quantity,
          selectedOptions: options
        }
        return { ...state, items: [...state.items, newItem] }
      }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.itemId)
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.itemId
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'LOAD_CART':
      return action.payload

    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [isLoaded, setIsLoaded] = React.useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecofloss-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes, but only after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ecofloss-cart', JSON.stringify(state))
    }
  }, [state, isLoaded])

  const addItem = (product: Product, quantity = 1, options?: CartItem['selectedOptions']) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, options } })
  }

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getSubtotal = () => {
    return state.items.reduce((total, item) => total + ((item.product.price / 100) * item.quantity), 0)
  }

  const getTotalTrees = () => {
    return state.items.reduce((total, item) => {
      return total + calculateTreesPlanted(item.product.category, item.quantity)
    }, 0)
  }

  const getTotalMicroplasticsEliminated = () => {
    const products = state.items.map(item => ({
      type: item.product.category === 'toothpaste' ? 'floss' : item.product.category as 'floss' | 'toothbrush',
      quantity: item.quantity
    }))
    return calculateMicroplasticsEliminated(products)
  }

  const getConservationImpact = () => {
    return calculateConservationImpact(getSubtotal())
  }

  const contextValue: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    getTotalItems,
    getSubtotal,
    getTotalTrees,
    getTotalMicroplasticsEliminated,
    getConservationImpact
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}