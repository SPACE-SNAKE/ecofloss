import { useState } from 'react'
import { Send, Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import emailjs from '@emailjs/browser'

interface ContactForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  companySize: string
  reason: string
  treesEstimate: string
  message: string
  agreeToComms: boolean
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    reason: '',
    treesEstimate: '',
    message: '',
    agreeToComms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // EmailJS configuration (replace with your actual service details)
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_placeholder',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_placeholder',
        {
          from_name: `${form.firstName} ${form.lastName}`,
          from_email: form.email,
          phone: form.phone,
          company: form.company,
          company_size: form.companySize,
          reason: form.reason,
          trees_estimate: form.treesEstimate,
          message: form.message,
          to_email: 'hello@ecofloss.com'
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_placeholder'
      )
      
      setSubmitStatus('success')
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        companySize: '',
        reason: '',
        treesEstimate: '',
        message: '',
        agreeToComms: false
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof ContactForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = form.firstName && form.lastName && form.email && form.phone && 
                     form.company && form.companySize && form.reason && form.treesEstimate

  return (
    <div className="">
      {/* Hero Section */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
              Contact Us to Get Started
            </h1>
            <div className="h-px w-20 bg-emerald-500 mx-auto" />
            <p className="text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
              Ready to eliminate microplastics while funding conservation? Let's create measurable environmental impact together.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-20">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-light text-slate-900">
                    Start Your Impact Journey
                  </h2>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Join businesses worldwide in creating positive environmental change through sustainable oral care.
                  </p>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Send className="h-3 w-3 text-white" />
                      </div>
                      <div className="text-emerald-800 font-medium">
                        Thank you! We'll be in touch within 24 hours.
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-sm p-6">
                    <div className="text-red-800">
                      There was an error sending your message. Please try again or email us directly.
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500 font-light"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500 font-light"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500 font-light"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500 font-light"
                        required
                      />
                    </div>
                  </div>

                  {/* Company Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500 font-light"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">
                        Company Size <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.companySize}
                        onChange={(e) => handleInputChange('companySize', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500 font-light bg-white"
                        required
                      >
                        <option value="">Please Select</option>
                        <option value="1-5">1-5 employees</option>
                        <option value="5-25">5-25 employees</option>
                        <option value="25-50">25-50 employees</option>
                        <option value="50-100">50-100 employees</option>
                        <option value="100-500">100-500 employees</option>
                        <option value="500-1000">500-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>
                  </div>

                  {/* Business Fields */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">
                        Reason for Reaching Out <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.reason}
                        onChange={(e) => handleInputChange('reason', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500 font-light bg-white"
                        required
                      >
                        <option value="">Please Select</option>
                        <option value="bulk-orders">Bulk orders for corporate wellness programs</option>
                        <option value="partnership">Partnership opportunities</option>
                        <option value="sustainability">Corporate sustainability initiatives</option>
                        <option value="learn-more">Learn more about EcoFloss</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">
                        Estimated Annual Product Volume <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.treesEstimate}
                        onChange={(e) => handleInputChange('treesEstimate', e.target.value)}
                        className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500 font-light bg-white"
                        required
                      >
                        <option value="">Please Select</option>
                        <option value="less-than-100">Less than 100 units (1-300 trees planted)</option>
                        <option value="100-999">100-999 units (300-3000 trees planted)</option>
                        <option value="1000+">1000+ units (3000+ trees planted)</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-700">
                      How Can We Help?
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-200 rounded-sm focus:outline-none focus:border-emerald-500 font-light resize-none"
                      placeholder="Tell us about your sustainability goals, product needs, or any specific questions you have..."
                    />
                  </div>

                  {/* Consent */}
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agreeToComms}
                        onChange={(e) => handleInputChange('agreeToComms', e.target.checked)}
                        className="mt-1 h-4 w-4 border-slate-300 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-slate-600 leading-relaxed">
                        I agree to receive communications from EcoFloss about products, sustainability initiatives, and conservation impact updates.
                      </span>
                    </label>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      You may unsubscribe at any time. For more information, please review our Privacy Policy. 
                      By clicking submit, you consent to allow EcoFloss to store and process your information to provide the requested content.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white border-0 py-3 text-base font-medium rounded-sm transition-colors duration-200"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Request a Meeting</span>
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-light text-slate-900">
                  Get in Touch
                </h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Ready to make an impact? We're here to help you eliminate microplastics while funding conservation.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-slate-900">Email Us</div>
                    <div className="text-slate-600 font-light">
                      <a href="mailto:hello@ecofloss.com" className="hover:text-emerald-600 transition-colors">
                        hello@ecofloss.com
                      </a>
                    </div>
                    <div className="text-sm text-slate-500">
                      We respond within 24 hours
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-slate-900">Call Us</div>
                    <div className="text-slate-600 font-light">
                      <a href="tel:+1-555-ECO-FLOSS" className="hover:text-emerald-600 transition-colors">
                        +1 (555) ECO-FLOSS
                      </a>
                    </div>
                    <div className="text-sm text-slate-500">
                      Mon-Fri 9AM-5PM PST
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-slate-900">Visit Us</div>
                    <div className="text-slate-600 font-light">
                      123 Sustainability St<br />
                      San Francisco, CA 94102
                    </div>
                    <div className="text-sm text-slate-500">
                      By appointment only
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium text-slate-900">Office Hours</div>
                    <div className="text-slate-600 font-light">
                      Monday - Friday: 9:00 AM - 5:00 PM PST<br />
                      Weekend: Emergency support only
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Stats */}
              <div className="bg-slate-50 p-6 rounded-sm space-y-6">
                <h4 className="font-medium text-slate-900">Current Impact</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Trees Planted</span>
                    <span className="font-light text-emerald-600">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Pandas Supported</span>
                    <span className="font-light text-emerald-600">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">CO₂ Sequestered</span>
                    <span className="font-light text-emerald-600">847.3 tons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}