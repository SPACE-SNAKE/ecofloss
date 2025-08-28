import { Link } from 'react-router-dom'
import { ShoppingCart, TreePine, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStripeProducts } from '@/hooks/useStripeProducts'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'
export default function ProductCatalog() {
  const { products, loading, error } = useStripeProducts()
  const { addItem } = useCart()

  if (loading) {
    return (
      <div className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-64"></div>
            <div className="grid lg:grid-cols-2 gap-16">
              {[1, 2].map((i) => (
                <div key={i} className="bg-slate-50 p-12 space-y-6">
                  <div className="aspect-[4/3] bg-slate-200 rounded"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded w-full"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded p-8 text-center">
            <h1 className="text-xl font-medium text-red-700 mb-2">Unable to Load Products</h1>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = (product: any) => {
    addItem(product, 1)
  }

  return (
    <div className="">
      {/* Professional Page Header */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6">
              Sustainable Oral Care
            </h1>
            <div className="h-px w-20 bg-emerald-500 mb-6" />
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              Professional-grade bamboo products that eliminate microplastics while funding verified conservation projects. Each purchase creates measurable environmental impact.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Products Grid */}
      <section className="bg-slate-50/50 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-white border border-slate-100 hover:border-slate-200 transition-all duration-300 overflow-hidden">
                  {/* Clean Product Image */}
                  <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden">
                    <img
                      src={product.image_urls[0] || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://via.placeholder.com/600x450/64748b/ffffff?text=${encodeURIComponent(product.name)}`
                      }}
                    />
                    {/* Subtle overlay badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm text-xs font-medium text-slate-700">
                      {product.category === 'floss' ? 'Zero Microplastics' : 'CE Certified'}
                    </div>
                  </div>

                  {/* Professional Product Info */}
                  <div className="p-12">
                    <div className="space-y-8">
                      {/* Title and Description */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-medium text-slate-900">
                          {product.name}
                        </h3>
                        <p className="text-slate-600 font-light leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Impact Metrics */}
                      <div className="flex items-center space-x-6 text-sm text-slate-600">
                        <div className="flex items-center space-x-2">
                          <TreePine className="h-4 w-4 text-emerald-600" />
                          <span>Plants {product.trees_planted_per_purchase} trees</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="h-4 w-4 text-emerald-600" />
                          <span>Supports {product.pandas_supported_per_purchase} pandas</span>
                        </div>
                      </div>

                      {/* Professional Features */}
                      <div className="space-y-3 text-sm text-slate-600">
                        {product.category === 'floss' ? (
                          <>
                            <div className="flex items-center space-x-3">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                              <span>Twin-line bamboo fiber construction</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                              <span>Zero microplastic shedding</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                              <span>Natural antibacterial properties</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                              <span>Biodegradable in 60-90 days</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center space-x-3">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                              <span>Soft Dupont bristles</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                              <span>Organic charcoal holder design</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                              <span>100% biodegradable handle</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                              <span>CE certified for safety</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Clean Pricing and CTA */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div className="flex items-baseline justify-between">
                          <div className="space-y-1">
                            <div className="text-2xl font-light text-slate-900">
                              {formatPrice(product.price / 100)}
                            </div>
                            <div className="text-xs text-slate-500">
                              Free shipping • Carbon neutral
                            </div>
                          </div>
                          <div className="text-right text-xs text-slate-500">
                            In Stock
                            <div className="text-emerald-600">({product.inventory_count} available)</div>
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0 py-3 text-base font-medium rounded-sm transition-colors duration-200"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean CTA Section */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-light text-white leading-tight">
              Transform Your Oral Care Routine
            </h2>
            <p className="text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              Join the movement eliminating microplastics while restoring critical habitats. Every purchase creates measurable environmental change.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-8 py-3 text-base font-medium rounded-sm">
                <Link to="/impact">View Impact Data</Link>
              </Button>
              <Link to="/about" className="text-slate-300 hover:text-white text-base font-medium border-b border-slate-500 hover:border-slate-300 pb-1 transition-colors duration-200">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}