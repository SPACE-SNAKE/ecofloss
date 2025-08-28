import { Link } from 'react-router-dom'
import { ArrowRight, TreePine, Heart, Users, Award, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <div className="">
      {/* Hero Section with Founder Story */}
      <section className="relative bg-slate-900 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/20" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="text-emerald-400 text-sm font-medium tracking-wide uppercase">
                  Our Story
                </div>
                <h1 className="text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
                  From Crisis<br/>to Solution
                </h1>
                <div className="h-px w-20 bg-emerald-500" />
                <p className="text-lg text-slate-300 font-light leading-relaxed">
                  EcoFloss was born from a simple yet alarming discovery: every time we floss, we're releasing microplastics into our bodies and waterways. Founded by environmental scientist Dr. Maya Chen, our mission is to eliminate this hidden source of pollution while restoring critical ecosystems.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-8 py-3 text-base font-medium rounded-sm">
                  <Link to="/products">Shop Products</Link>
                </Button>
                <Button variant="outline" asChild className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 text-base font-medium rounded-sm">
                  <Link to="/impact">View Impact</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] bg-slate-800 rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&q=80"
                  alt="Founder Dr. Maya Chen"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-sm shadow-2xl max-w-xs">
                <div className="space-y-3">
                  <div className="text-sm text-slate-500 font-medium">Founded</div>
                  <div className="text-2xl font-light text-slate-900">2024</div>
                  <div className="text-sm text-slate-600">
                    After discovering microplastics in 73% of deep-sea fish specimens during marine research
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Journey */}
      <section className="bg-white py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-light text-slate-900 leading-tight">
                The Discovery That Changed Everything
              </h2>
              <div className="h-px w-20 bg-emerald-500 mx-auto" />
            </div>
            
            <div className="prose prose-lg prose-slate max-w-none">
              <div className="grid md:grid-cols-3 gap-12">
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900">The Research</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    While studying microplastic contamination in marine ecosystems, Dr. Chen discovered that conventional dental floss was a significant contributor to the problem. Her research revealed that a single floss session releases up to 2,000 microplastic particles.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900">The Realization</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    The health implications were staggering: microplastics were found in human bloodstreams, linked to cardiovascular disease and hormonal disruption. Dr. Chen knew she had to find a better way to maintain oral health without compromising human and planetary health.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <TreePine className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900">The Solution</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    After two years of research and development, EcoFloss partnered with sustainable bamboo producers in China to create the world's first truly plastic-free oral care system. Every product not only eliminates harmful microplastics but actively funds conservation efforts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-slate-50/50 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-20">
            <div className="text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-light text-slate-900 leading-tight">
                Our Mission & Values
              </h2>
              <div className="h-px w-20 bg-emerald-500 mx-auto" />
              <p className="text-lg text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
                We believe that personal health and planetary health are inseparable. Our commitment extends beyond creating superior products to measurably restoring the ecosystems that support all life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <TreePine className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900">Regenerative</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Every purchase funds verified reforestation projects, sequestering carbon and restoring biodiversity in critical ecosystems worldwide.
                </p>
              </div>

              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900">Transparent</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Real-time impact tracking with blockchain verification ensures every conservation dollar reaches its intended destination.
                </p>
              </div>

              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900">Health-First</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Premium oral care that eliminates microplastics while providing superior cleaning performance through natural bamboo fiber technology.
                </p>
              </div>

              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900">Community</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Building a global movement of conscious consumers who understand that small daily choices create meaningful environmental change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Showcase */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="text-emerald-600 text-sm font-medium tracking-wide uppercase">
                  Measurable Impact
                </div>
                <h2 className="text-4xl lg:text-5xl font-light text-slate-900 leading-tight">
                  Beyond Business as Usual
                </h2>
                <div className="h-px w-20 bg-emerald-500" />
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  EcoFloss operates on a revolutionary business model where 15% of all revenue directly funds verified conservation projects. We're not just carbon neutral—we're carbon negative, sequestering more CO₂ than our entire supply chain produces.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-3xl font-light text-emerald-600">2,847</div>
                  <div className="text-sm text-slate-600">Trees Planted</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-light text-emerald-600">142</div>
                  <div className="text-sm text-slate-600">Pandas Supported</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-light text-emerald-600">95</div>
                  <div className="text-sm text-slate-600">Active Customers</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-light text-emerald-600">12.4ha</div>
                  <div className="text-sm text-slate-600">Habitat Restored</div>
                </div>
              </div>

              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-8 py-3 text-base font-medium rounded-sm inline-flex items-center">
                <Link to="/impact">
                  View Live Impact Data
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-slate-100 rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
                  alt="Bamboo forest restoration"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-slate-900 text-white p-8 rounded-sm max-w-sm">
                <div className="space-y-4">
                  <div className="text-emerald-400 text-sm font-medium">Partnership</div>
                  <div className="text-xl font-light">Wolong National Nature Reserve</div>
                  <div className="text-sm text-slate-300 leading-relaxed">
                    Supporting giant panda conservation and bamboo forest restoration in Sichuan Province, China.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-slate-900 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-20">
            <div className="text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-light text-white leading-tight">
                Meet Our Team
              </h2>
              <div className="h-px w-20 bg-emerald-500 mx-auto" />
              <p className="text-lg text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
                A diverse group of scientists, entrepreneurs, and conservationists united by the belief that business can be a force for planetary healing.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center space-y-6">
                <div className="aspect-square bg-slate-800 rounded-sm overflow-hidden mx-auto max-w-xs">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b376?w=400&q=80"
                    alt="Dr. Maya Chen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-white">Dr. Maya Chen</h3>
                  <div className="text-emerald-400 text-sm">Founder & CEO</div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Marine biologist and environmental scientist with 15 years of microplastics research. PhD from Stanford, published author of 40+ peer-reviewed papers.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="aspect-square bg-slate-800 rounded-sm overflow-hidden mx-auto max-w-xs">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                    alt="David Kim"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-white">David Kim</h3>
                  <div className="text-emerald-400 text-sm">Head of Operations</div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Former sustainable supply chain director at Patagonia. Expertise in ethical sourcing and regenerative business practices across Asia-Pacific.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="aspect-square bg-slate-800 rounded-sm overflow-hidden mx-auto max-w-xs">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"
                    alt="Sarah Martinez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-white">Sarah Martinez</h3>
                  <div className="text-emerald-400 text-sm">Conservation Director</div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Former WWF program manager specializing in forest restoration and wildlife conservation. Leads our partnerships with conservation organizations worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-light text-white leading-tight">
              Join the Movement
            </h2>
            <p className="text-lg text-emerald-100 font-light leading-relaxed max-w-2xl mx-auto">
              Every EcoFloss product eliminates microplastics from your routine while funding measurable conservation impact. Transform your daily habits into environmental action.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Button asChild className="bg-white text-emerald-600 hover:bg-slate-50 border-0 px-8 py-3 text-base font-medium rounded-sm">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Link to="/impact" className="text-emerald-100 hover:text-white text-base font-medium border-b border-emerald-400 hover:border-white pb-1 transition-colors duration-200">
                Track Our Impact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}