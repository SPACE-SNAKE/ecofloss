import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Heart, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGlobalCounters } from '@/hooks/useProducts'

export default function Homepage() {
  const { counters, loading: countersLoading } = useGlobalCounters()

  return (
    <div className="">
      {/* Hero Section - Sophisticated Veritree Style */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-stone-100">
        {/* Background Image with Sophisticated Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80')`,
            filter: 'grayscale(20%) brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-4xl">
            {/* Clean Typography Hierarchy */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-light text-white leading-[0.95] tracking-tight">
                  Restore Health.<br/>
                  Restore Nature.
                </h1>
                <div className="h-px w-24 bg-emerald-500" />
                <p className="text-xl lg:text-2xl text-white/80 max-w-2xl font-light leading-relaxed">
                  Eliminate microplastics from your daily routine while funding verified reforestation projects.
                </p>
              </div>

              {/* Sophisticated CTA */}
              <div className="flex items-center space-x-6 pt-4">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-8 py-4 text-base font-medium rounded-sm transition-all duration-200 hover:shadow-lg">
                  <Link to="/products" className="flex items-center space-x-2">
                    <span>Start Your Impact</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Link to="/impact" className="text-white/90 hover:text-white text-base font-medium border-b border-white/30 hover:border-white/60 pb-1 transition-colors duration-200">
                  View Live Data
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Impact Stats - Minimalist Section */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-center">
            {/* Live Stats */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-4">
                  Live Impact
                </h2>
                <div className="h-px w-16 bg-emerald-500" />
              </div>
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="text-4xl font-light text-slate-900">
                    {countersLoading ? '...' : counters?.total_trees?.toLocaleString() || '2,847'}
                  </div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Trees Planted</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-4xl font-light text-slate-900">
                    {countersLoading ? '...' : Math.round(counters?.total_pandas_supported || 0).toLocaleString() || '94'}
                  </div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Pandas Supported</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-4xl font-light text-slate-900">
                    {countersLoading ? '...' : (counters?.total_orders || 0).toLocaleString() || '1,293'}
                  </div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Customers</div>
                </div>
              </div>
            </div>
            
            {/* Impact Framework */}
            <div className="lg:col-span-2">
              <div className="space-y-16">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
                    Impact You Can See, Measure, Share
                  </h2>
                  <p className="text-lg text-slate-600 font-light leading-relaxed max-w-2xl">
                    Every product purchased creates verifiable environmental restoration with full transparency and blockchain-verified tracking.
                  </p>
                </div>
                
                <div className="grid gap-12 md:grid-cols-3">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-sm flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">See</h3>
                    <p className="text-sm text-slate-600 font-light leading-relaxed">
                      GPS-verified planting locations with satellite imagery and ground-truth verification.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-sm flex items-center justify-center">
                      <Zap className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">Measure</h3>
                    <p className="text-sm text-slate-600 font-light leading-relaxed">
                      Real-time growth monitoring, carbon sequestration, and biodiversity impact metrics.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-sm flex items-center justify-center">
                      <Heart className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">Share</h3>
                    <p className="text-sm text-slate-600 font-light leading-relaxed">
                      Downloadable certificates and shareable impact reports for social proof.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Product Showcase */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
              Sustainable Oral Care
            </h2>
            <div className="h-px w-16 bg-emerald-500 mb-6" />
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              Professional-grade bamboo products that eliminate microplastics while funding verified conservation projects.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Bamboo Dental Floss */}
            <div className="group">
              <div className="bg-slate-50 p-12 border border-slate-100 hover:border-slate-200 transition-all duration-300">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium text-slate-900">
                      Bamboo Dental Floss
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed">
                      Premium bamboo fiber floss with custom EcoFloss branding. Twin-line construction for superior strength and effectiveness.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <span>Twin-line bamboo fiber construction</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <span>Zero microplastic shedding</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <span>Custom sustainable packaging</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <span>Plants 3 trees per purchase</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex items-baseline space-x-2">
                        <div className="text-2xl font-light text-slate-900">$12.99</div>
                        <div className="text-sm text-slate-500">per container</div>
                      </div>
                      <div className="text-xs text-slate-400">Contains 30m of floss</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bamboo Toothbrush */}
            <div className="group">
              <div className="bg-slate-50 p-12 border border-slate-100 hover:border-slate-200 transition-all duration-300">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium text-slate-900">
                      Bamboo Toothbrush
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed">
                      Ergonomic bamboo handle with soft natural bristles. Features organic charcoal holder for enhanced cleaning power.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <span>Soft natural bristles</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <span>Organic charcoal holder design</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <span>100% biodegradable handle</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <span>Custom EcoFloss branding</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex items-baseline space-x-2">
                        <div className="text-2xl font-light text-slate-900">$8.99</div>
                        <div className="text-sm text-slate-500">individual</div>
                      </div>
                      <div className="text-xs text-slate-400">Available in 2-pack for $15.99</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Clean CTA */}
          <div className="text-center mt-20">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-8 py-4 text-base font-medium rounded-sm">
              <Link to="/products" className="flex items-center space-x-2">
                <span>View All Products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Clean Testimonials Section */}
      <section className="bg-slate-50/50 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
              Trusted by Conscious Consumers
            </h2>
            <div className="h-px w-16 bg-emerald-500 mb-6" />
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              Thousands of families have eliminated microplastics from their routine while creating measurable environmental impact.
            </p>
          </div>
          
          {/* Clean Testimonial Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-slate-100">
              <div className="space-y-6">
                <p className="text-slate-700 font-light leading-relaxed">
                  "The transparency is incredible. I can see exactly where my trees are planted and track their growth in real-time."
                </p>
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b332c371?w=40&h=40&fit=crop&crop=face" 
                    alt="Sarah Chen" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Sarah Chen</div>
                    <div className="text-xs text-slate-500">San Francisco, CA</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 border border-slate-100">
              <div className="space-y-6">
                <p className="text-slate-700 font-light leading-relaxed">
                  "Finally eliminated microplastics from my daily routine. The environmental impact tracking gives me confidence in my choices."
                </p>
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                    alt="Marcus Rodriguez" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Marcus Rodriguez</div>
                    <div className="text-xs text-slate-500">Austin, TX</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 border border-slate-100">
              <div className="space-y-6">
                <p className="text-slate-700 font-light leading-relaxed">
                  "My clients love the dual impact - reducing health risks while supporting verified conservation projects."
                </p>
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" 
                    alt="Emily Parker" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Emily Parker</div>
                    <div className="text-xs text-slate-500">Portland, OR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sophisticated CTA Section */}
      <section className="bg-slate-900 py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-light text-white leading-tight">
              Ready to Make Your Impact?
            </h2>
            <p className="text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              Join the movement eliminating microplastics while restoring critical habitats.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-8 py-4 text-base font-medium rounded-sm">
                <Link to="/products" className="flex items-center space-x-2">
                  <span>Start Shopping</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Link to="/impact" className="text-slate-300 hover:text-white text-base font-medium border-b border-slate-500 hover:border-slate-300 pb-1 transition-colors duration-200">
                View Impact Data
              </Link>
            </div>
          </div>
          
          {/* Minimal Trust Signals */}
          <div className="flex justify-center items-center space-x-8 mt-16 pt-8 border-t border-slate-800 text-sm text-slate-400">
            <span>Free Shipping</span>
            <span className="w-px h-4 bg-slate-700" />
            <span>30-Day Returns</span>
            <span className="w-px h-4 bg-slate-700" />
            <span>Verified Impact</span>
          </div>
        </div>
      </section>
    </div>
  )
}