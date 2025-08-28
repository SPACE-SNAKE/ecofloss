import { Link } from 'react-router-dom'
import { Leaf, TreePine, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bamboo-50 border-t border-bamboo-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Leaf className="h-8 w-8 text-bamboo-500" />
                <TreePine className="h-6 w-6 text-bamboo-600" />
              </div>
              <span className="text-xl font-bold text-bamboo-700">EcoFloss</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Eliminating microplastic intake while creating a symbiotic relationship with nature. 
              Every purchase makes you healthier and helps reforest bamboo habitats for pandas.
            </p>
            <div className="flex items-center space-x-2 text-sm text-bamboo-600">
              <Heart className="h-4 w-4" />
              <span>Made with care for humans and pandas</span>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-bamboo-600 text-sm transition-colors">
                  Bamboo Dental Floss
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-bamboo-600 text-sm transition-colors">
                  Bamboo Toothbrushes
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-600 hover:text-bamboo-600 text-sm transition-colors">
                  Conservation Impact
                </Link>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Natural Toothpaste (Coming Soon)</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-bamboo-600 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-600 hover:text-bamboo-600 text-sm transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-bamboo-600 text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-bamboo-600 text-sm transition-colors">
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-bamboo-600 text-sm transition-colors">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-bamboo-600 text-sm transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-bamboo-600 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-bamboo-600 text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-bamboo-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © 2024 EcoFloss. All rights reserved. | 10% of profits support conservation.
            </div>
            <div className="flex items-center space-x-2 text-sm text-bamboo-600">
              <Mail className="h-4 w-4" />
              <span>hello@ecofloss.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}