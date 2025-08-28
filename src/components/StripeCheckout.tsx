import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Loader2, CreditCard, TreePine, Heart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'
import emailjs from '@emailjs/browser'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

interface CheckoutFormProps {
  onSuccess: (orderId: string) => void
  onError: (error: string) => void
}

function CheckoutForm({ onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { state, getSubtotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US'
  })

  const calculateImpact = () => {
    let totalTrees = 0
    let totalPandas = 0
    
    state.items.forEach(item => {
      totalTrees += item.product.trees_planted_per_purchase * item.quantity
      totalPandas += item.product.pandas_supported_per_purchase * item.quantity
    })
    
    return { totalTrees, totalPandas }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)
    
    if (!cardElement) {
      return
    }

    setIsProcessing(true)

    try {
      // Create payment intent via API
      const response = await fetch('http://localhost:3001/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getSubtotal(),
          items: state.items,
          customerInfo: customerInfo
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const { clientSecret } = await response.json()

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              postal_code: customerInfo.zipCode,
              country: customerInfo.country,
            },
          },
        },
      })

      if (error) {
        onError(error.message || 'Payment failed')
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Generate order ID
        const orderId = `ECO-${Date.now()}`
        
        // Send order confirmation email
        const impact = calculateImpact()
        
        try {
          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder',
            'template_order_confirmation', // You'd create this template in EmailJS
            {
              to_email: customerInfo.email,
              customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
              order_id: orderId,
              order_total: formatPrice(getSubtotal()),
              trees_planted: impact.totalTrees,
              pandas_supported: impact.totalPandas.toFixed(1),
              items: state.items.map(item => `${item.product.name} x${item.quantity}`).join(', ')
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_placeholder'
          )
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError)
          // Don't fail the order if email fails
        }

        clearCart()
        onSuccess(orderId)
      }
    } catch (error) {
      onError('An unexpected error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  const impact = calculateImpact()

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Information */}
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-slate-900">Shipping Information</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              First Name *
            </label>
            <input
              type="text"
              required
              value={customerInfo.firstName}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={customerInfo.lastName}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Address *
          </label>
          <input
            type="text"
            required
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              City *
            </label>
            <input
              type="text"
              required
              value={customerInfo.city}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              ZIP Code *
            </label>
            <input
              type="text"
              required
              value={customerInfo.zipCode}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, zipCode: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Impact Preview */}
      <div className="bg-emerald-50 p-6 rounded-sm space-y-4">
        <h4 className="font-medium text-emerald-900">Your Environmental Impact</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <TreePine className="h-5 w-5 text-emerald-600" />
            <span className="text-sm text-emerald-800">
              <strong>{impact.totalTrees}</strong> trees will be planted
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Heart className="h-5 w-5 text-emerald-600" />
            <span className="text-sm text-emerald-800">
              <strong>{impact.totalPandas.toFixed(1)}</strong> pandas supported
            </span>
          </div>
        </div>
        <p className="text-xs text-emerald-700">
          You'll receive a personalized impact certificate with GPS coordinates of your planted trees.
        </p>
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-slate-900 flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Payment Information
        </h3>
        
        <div className="p-4 border border-slate-200 rounded-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1e293b',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  '::placeholder': {
                    color: '#64748b',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
            }}
          />
        </div>
        
        <p className="text-xs text-slate-500">
          Your payment information is encrypted and secure. We never store card details.
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-slate-50 p-6 rounded-sm space-y-4">
        <h4 className="font-medium text-slate-900">Order Summary</h4>
        {state.items.map(item => (
          <div key={item.id} className="flex justify-between items-center">
            <span className="text-sm text-slate-600">
              {item.product.name} x{item.quantity}
            </span>
            <span className="text-sm font-medium text-slate-900">
              {formatPrice((item.product.price / 100) * item.quantity)}
            </span>
          </div>
        ))}
        <div className="pt-2 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-900">Total</span>
            <span className="font-medium text-slate-900">{formatPrice(getSubtotal())}</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white border-0 py-3 text-base font-medium rounded-sm transition-colors duration-200"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing Payment...</span>
          </div>
        ) : (
          <span>Complete Order - {formatPrice(getSubtotal())}</span>
        )}
      </Button>

      <div className="text-center">
        <p className="text-xs text-slate-500">
          By completing this purchase, you agree to our Terms of Service and Privacy Policy.
          Free shipping on all orders. 30-day money-back guarantee.
        </p>
      </div>
    </form>
  )
}

interface StripeCheckoutProps {
  onSuccess: (orderId: string) => void
  onError: (error: string) => void
}

export default function StripeCheckout({ onSuccess, onError }: StripeCheckoutProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onSuccess={onSuccess} onError={onError} />
    </Elements>
  )
}