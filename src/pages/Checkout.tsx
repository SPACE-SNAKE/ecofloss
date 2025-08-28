import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import StripeCheckout from '@/components/StripeCheckout'
import { useCart } from '@/contexts/CartContext'

export default function Checkout() {
  const navigate = useNavigate()
  const { state } = useCart()
  const [orderStatus, setOrderStatus] = useState<'checkout' | 'success' | 'error'>('checkout')
  const [orderId, setOrderId] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSuccess = (newOrderId: string) => {
    setOrderId(newOrderId)
    setOrderStatus('success')
  }

  const handleError = (error: string) => {
    setErrorMessage(error)
    setOrderStatus('error')
  }

  // Redirect if cart is empty
  if (state.items.length === 0 && orderStatus === 'checkout') {
    return (
      <div className="bg-white py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-slate-400" />
            </div>
            <h1 className="text-3xl font-light text-slate-900">
              Your cart is empty
            </h1>
            <p className="text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
              Add some sustainable oral care products to your cart before checking out.
            </p>
            <Button
              onClick={() => navigate('/products')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-8 py-3 text-base font-medium rounded-sm"
            >
              Shop Products
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (orderStatus === 'success') {
    return (
      <div className="bg-white py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-light text-slate-900">
              Order Confirmed!
            </h1>
            <div className="h-px w-20 bg-emerald-500 mx-auto" />
            <div className="space-y-4">
              <p className="text-lg text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
                Thank you for your order! Your sustainable oral care products are on their way, 
                and your environmental impact is already being created.
              </p>
              <div className="bg-emerald-50 p-6 rounded-sm inline-block">
                <div className="text-sm text-emerald-800">
                  <strong>Order ID:</strong> {orderId}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-50 p-8 rounded-sm max-w-2xl mx-auto">
                <h3 className="text-xl font-medium text-slate-900 mb-4">What happens next?</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                    </div>
                    <div className="text-sm text-slate-600">
                      <strong className="text-slate-900">Order Processing:</strong> Your products will ship within 1-2 business days
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                    </div>
                    <div className="text-sm text-slate-600">
                      <strong className="text-slate-900">Tree Planting:</strong> Your trees will be planted within 30 days
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                    </div>
                    <div className="text-sm text-slate-600">
                      <strong className="text-slate-900">Impact Certificate:</strong> You'll receive GPS coordinates and photos within 60 days
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/impact')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-8 py-3 text-base font-medium rounded-sm"
              >
                Track Your Impact
              </Button>
              <Button
                onClick={() => navigate('/products')}
                variant="outline"
                className="border-slate-200 text-slate-600 hover:bg-slate-50 px-8 py-3 text-base font-medium rounded-sm"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (orderStatus === 'error') {
    return (
      <div className="bg-white py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-light text-slate-900">
              Payment Failed
            </h1>
            <div className="space-y-4">
              <p className="text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
                {errorMessage || 'There was an issue processing your payment. Please try again.'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setOrderStatus('checkout')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-8 py-3 text-base font-medium rounded-sm"
              >
                Try Again
              </Button>
              <Button
                onClick={() => navigate('/cart')}
                variant="outline"
                className="border-slate-200 text-slate-600 hover:bg-slate-50 px-8 py-3 text-base font-medium rounded-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-light text-white">
                Secure Checkout
              </h1>
              <p className="text-slate-300 font-light">
                Complete your order and start making an impact
              </p>
            </div>
            <Button
              onClick={() => navigate('/cart')}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-2 text-sm font-medium rounded-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white border border-slate-100 rounded-sm p-8">
            <StripeCheckout
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="bg-slate-50 py-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
              <span>PCI Compliant</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}