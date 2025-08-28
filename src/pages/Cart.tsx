import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, TreePine, Heart, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'

export default function Cart() {
  const { 
    state, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getSubtotal, 
    getTotalItems,
    getTotalTrees,
    getTotalMicroplasticsEliminated,
    getConservationImpact
  } = useCart()

  const subtotal = getSubtotal()
  const conservationImpact = getConservationImpact()
  const totalTrees = getTotalTrees()
  const microplasticsEliminated = getTotalMicroplasticsEliminated()

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-bamboo-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-xl text-gray-600 mb-8">
            Start your journey to plastic-free oral care and panda conservation
          </p>
          <Button asChild size="lg" variant="bamboo">
            <Link to="/products" className="flex items-center space-x-2">
              <span>Shop Bamboo Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Plastic-Free Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {state.items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-bamboo-200 p-6">
              <div className="flex items-start space-x-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.product.image_urls[0] || '/placeholder-product.jpg'}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://via.placeholder.com/200x200/22c55e/ffffff?text=${encodeURIComponent(item.product.category)}`
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.product.name}
                  </h3>
                  
                  {/* Health Impact */}
                  <div className="bg-green-50 p-3 rounded-lg mb-3 border-l-4 border-bamboo-500">
                    <p className="text-sm font-medium text-bamboo-700">
                      {item.product.category === 'floss' 
                        ? 'Eliminates Your #1 Microplastic Source' 
                        : 'Completes Your Microplastic-Free Routine'}
                    </p>
                  </div>

                  {/* Conservation Impact */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <TreePine className="h-4 w-4 text-bamboo-500" />
                      <span>Plants {item.product.trees_planted_per_purchase * item.quantity} trees</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-bamboo-500" />
                      <span>Supports pandas</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-bamboo-600">
                        {formatPrice((item.product.price / 100) * item.quantity)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Clear Cart Button */}
          {state.items.length > 0 && (
            <div className="text-center pt-4">
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-gray-600 hover:text-red-600"
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-bamboo-50 rounded-lg p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            {/* Financial Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Carbon-Neutral Shipping</span>
                <span className="text-xs text-green-600">Included</span>
              </div>
              <div className="border-t border-bamboo-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-xl font-bold text-bamboo-600">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>

            {/* Conservation Impact Summary */}
            <div className="bg-white rounded-lg p-4 mb-6 border border-bamboo-200">
              <h3 className="text-lg font-semibold text-bamboo-700 mb-4 flex items-center">
                <TreePine className="h-5 w-5 mr-2" />
                Your Environmental Impact
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Trees to be planted</span>
                  <span className="font-bold text-bamboo-600">{totalTrees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Conservation donation</span>
                  <span className="font-bold text-bamboo-600">{formatPrice(conservationImpact.totalDonation)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Microplastics eliminated</span>
                  <span className="font-bold text-green-600">{microplasticsEliminated.toFixed(1)}g/year</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-bamboo-50 rounded-lg">
                <p className="text-xs text-bamboo-700 text-center">
                  10% of your purchase ({formatPrice(conservationImpact.totalDonation)}) goes directly to bamboo reforestation and panda habitat conservation
                </p>
              </div>
            </div>

            {/* Health Impact */}
            <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Your Health Impact
              </h3>
              <p className="text-sm text-green-700">
                By switching to bamboo oral care, you'll eliminate <strong>{microplasticsEliminated.toFixed(1)} grams</strong> of microplastics from your annual intake - directly protecting your bloodstream and organs.
              </p>
            </div>

            {/* Checkout Button */}
            <Button asChild size="lg" variant="bamboo" className="w-full mb-4">
              <Link to="/checkout" className="flex items-center justify-center space-x-2">
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <div className="text-center">
              <Link 
                to="/products" 
                className="text-bamboo-600 hover:text-bamboo-700 text-sm font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}