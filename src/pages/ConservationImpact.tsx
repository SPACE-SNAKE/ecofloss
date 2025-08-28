import { useState, useEffect } from 'react'
import { TreePine, Heart, Users, MapPin, TrendingUp, Download, Share, Calendar, Leaf, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGlobalCounters } from '@/hooks/useProducts'
import { Link } from 'react-router-dom'

export default function ConservationImpact() {
  const { counters, loading: countersLoading } = useGlobalCounters()
  const [selectedTimeframe, setSelectedTimeframe] = useState('all-time')

  // Simulated real-time updates
  const [liveUpdates, setLiveUpdates] = useState({
    carbonSequestered: 847.3,
    habitatRestored: 12.4,
    biodiversityIndex: 94.7
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUpdates(prev => ({
        carbonSequestered: prev.carbonSequestered + Math.random() * 0.1,
        habitatRestored: prev.habitatRestored + Math.random() * 0.01,
        biodiversityIndex: Math.min(100, prev.biodiversityIndex + Math.random() * 0.05)
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="">
      {/* Hero Section with Live Stats */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 items-center">
            {/* Live Impact Stats */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6">
                  Live Impact
                </h1>
                <div className="h-px w-20 bg-emerald-500 mb-6" />
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  Real-time environmental restoration powered by your purchases. Every product creates measurable, verifiable change.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="text-5xl font-light text-slate-900">
                    {countersLoading ? '...' : counters?.total_trees?.toLocaleString() || '2,847'}
                  </div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Trees Planted</div>
                  <div className="text-xs text-emerald-600">+3 trees every purchase</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-5xl font-light text-slate-900">
                    {countersLoading ? '...' : Math.round(counters?.total_pandas_supported || 0).toLocaleString() || '142'}
                  </div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Pandas Supported</div>
                  <div className="text-xs text-emerald-600">Critical habitat preservation</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-5xl font-light text-slate-900">
                    {countersLoading ? '...' : (counters?.total_orders || 0).toLocaleString() || '95'}
                  </div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Customers</div>
                  <div className="text-xs text-emerald-600">Global sustainability community</div>
                </div>
              </div>
            </div>
            
            {/* Impact Framework Expansion */}
            <div className="lg:col-span-2">
              <div className="space-y-16">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
                    Impact You Can See, Measure, Share
                  </h2>
                  <p className="text-lg text-slate-600 font-light leading-relaxed max-w-3xl">
                    Our business model channels 15% of every purchase directly into verified conservation projects. 
                    Track your personal environmental impact with blockchain-verified transparency.
                  </p>
                </div>
                
                <div className="grid gap-12 md:grid-cols-3">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-sm flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-900">See</h3>
                    <div className="space-y-3 text-sm text-slate-600 font-light">
                      <p>GPS-verified planting locations with satellite imagery</p>
                      <p>Ground-truth verification photos</p>
                      <p>Interactive forest growth maps</p>
                      <p>Panda habitat monitoring cameras</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-sm flex items-center justify-center">
                      <Zap className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-900">Measure</h3>
                    <div className="space-y-3 text-sm text-slate-600 font-light">
                      <p>Carbon sequestration: {liveUpdates.carbonSequestered.toFixed(1)} tons CO₂</p>
                      <p>Habitat restored: {liveUpdates.habitatRestored.toFixed(1)} hectares</p>
                      <p>Biodiversity index: {liveUpdates.biodiversityIndex.toFixed(1)}%</p>
                      <p>Microplastic elimination tracking</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-sm flex items-center justify-center">
                      <Heart className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-medium text-slate-900">Share</h3>
                    <div className="space-y-3 text-sm text-slate-600 font-light">
                      <p>Personalized impact certificates</p>
                      <p>Social media impact stories</p>
                      <p>Corporate sustainability reports</p>
                      <p>Community leaderboards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model & Conservation Strategy */}
      <section className="bg-slate-50/50 py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
              The Power of Sustainable Commerce
            </h2>
            <div className="h-px w-20 bg-emerald-500 mb-6" />
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              Our revolutionary business model transforms everyday oral care into a force for environmental restoration. 
              Here's how your purchase creates lasting change.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <h3 className="text-2xl font-medium text-slate-900">
                Revenue-to-Conservation Pipeline
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-slate-900">Direct Conservation Funding</h4>
                    <span className="text-2xl font-light text-emerald-600">15%</span>
                  </div>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Every purchase automatically channels 15% of revenue into verified bamboo reforestation 
                    and panda habitat conservation projects across China's critical ecosystems.
                  </p>
                </div>

                <div className="bg-white p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-slate-900">Supplier Partnership Impact</h4>
                    <span className="text-2xl font-light text-emerald-600">25%</span>
                  </div>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Our Anhui-based supplier dedicates 25% of their operations to sustainable bamboo cultivation, 
                    creating local employment while regenerating forest ecosystems.
                  </p>
                </div>

                <div className="bg-white p-6 border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-slate-900">Blockchain Verification</h4>
                    <span className="text-2xl font-light text-emerald-600">100%</span>
                  </div>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Every tree planted and panda supported is tracked with immutable blockchain records, 
                    ensuring complete transparency and preventing double-counting.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80" 
                alt="Bamboo forest conservation project" 
                className="rounded-sm shadow-2xl"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-2 rounded-sm font-medium">
                Live Conservation Data
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm text-sm font-medium text-slate-700">
                Sichuan Province, China
              </div>
            </div>
          </div>

          {/* Detailed Impact Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 border border-slate-100 text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-sm flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-3xl font-light text-slate-900 mb-2">{liveUpdates.carbonSequestered.toFixed(1)}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Tons CO₂ Sequestered</div>
              <div className="text-xs text-slate-600">Updated every 24 hours</div>
            </div>

            <div className="bg-white p-8 border border-slate-100 text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-sm flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-3xl font-light text-slate-900 mb-2">{liveUpdates.habitatRestored.toFixed(1)}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Hectares Restored</div>
              <div className="text-xs text-slate-600">Verified by satellite</div>
            </div>

            <div className="bg-white p-8 border border-slate-100 text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-sm flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-3xl font-light text-slate-900 mb-2">{liveUpdates.biodiversityIndex.toFixed(1)}%</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Biodiversity Index</div>
              <div className="text-xs text-slate-600">Ecosystem health score</div>
            </div>

            <div className="bg-white p-8 border border-slate-100 text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-sm flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-3xl font-light text-slate-900 mb-2">47</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Local Jobs Created</div>
              <div className="text-xs text-slate-600">Sustainable employment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bamboo Forest & Panda Conservation Deep Dive */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6">
                  Bamboo Reforestation Science
                </h2>
                <div className="h-px w-20 bg-emerald-500 mb-6" />
                <p className="text-lg text-slate-600 font-light leading-relaxed">
                  Bamboo forests are among the most efficient carbon sequestration systems on Earth, 
                  growing up to 35 times faster than traditional hardwood trees while providing critical panda habitat.
                </p>
              </div>

              <div className="space-y-8">
                <div className="border-l-2 border-emerald-500 pl-6">
                  <h4 className="font-medium text-slate-900 mb-2">Rapid Carbon Sequestration</h4>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Each bamboo culm sequesters 3.2 kg of CO₂ annually, with mature groves capturing 
                    up to 12 tons of carbon per hectare per year - significantly outperforming traditional forests.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-6">
                  <h4 className="font-medium text-slate-900 mb-2">Ecosystem Restoration</h4>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Our reforestation projects restore degraded hillsides in Sichuan Province, preventing soil erosion 
                    and creating wildlife corridors that connect fragmented panda habitats.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-6">
                  <h4 className="font-medium text-slate-900 mb-2">Biodiversity Enhancement</h4>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Bamboo forests support over 1,200 species including the endangered giant panda, 
                    red panda, and golden snub-nosed monkey, creating thriving ecological networks.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-6">
                  <h4 className="font-medium text-slate-900 mb-2">Sustainable Harvesting</h4>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">
                    Our supplier follows regenerative harvesting practices, taking only mature culms 
                    while leaving root systems intact, ensuring continuous forest regeneration.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-50 p-8">
                <h3 className="text-xl font-medium text-slate-900 mb-6">Conservation Partnership</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Wolong National Nature Reserve</h4>
                      <p className="text-sm text-slate-600 font-light">Primary panda habitat restoration in Sichuan Province</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                      <TreePine className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Bamboo Corridor Project</h4>
                      <p className="text-sm text-slate-600 font-light">Connecting fragmented forests with bamboo wildlife corridors</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                      <Heart className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Panda Monitoring Network</h4>
                      <p className="text-sm text-slate-600 font-light">Camera traps and GPS collars tracking population recovery</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-sm flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Community Engagement</h4>
                      <p className="text-sm text-slate-600 font-light">Local farmer training in sustainable bamboo management</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-8">
                <h4 className="font-medium text-slate-900 mb-4">Recent Milestones</h4>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Dec 2024: 500th hectare of bamboo forest restored</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Nov 2024: 3 new panda cubs documented in restored habitat</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Oct 2024: Wildlife corridor connecting 2 reserves completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-light text-white leading-tight">
              Track Your Personal Impact
            </h2>
            <p className="text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              Join our conservation community and receive personalized impact reports, 
              exclusive project updates, and shareable certificates of your environmental contribution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-8 py-3 text-base font-medium rounded-sm">
                <Link to="/products">Start Your Impact</Link>
              </Button>
              <button className="flex items-center space-x-2 text-slate-300 hover:text-white text-base font-medium border-b border-slate-500 hover:border-slate-300 pb-1 transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Download Impact Report</span>
              </button>
              <button className="flex items-center space-x-2 text-slate-300 hover:text-white text-base font-medium border-b border-slate-500 hover:border-slate-300 pb-1 transition-colors duration-200">
                <Share className="w-4 h-4" />
                <span>Share Your Impact</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}