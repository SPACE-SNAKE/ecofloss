# EcoFloss - Sustainable Oral Care E-Commerce Platform

> Eliminating microplastics while creating environmental impact through bamboo oral care products.

## 🌱 Project Overview

EcoFloss is a full-stack e-commerce platform focused on sustainable oral care products made from bamboo. Each purchase creates measurable environmental impact through verified tree planting and panda habitat conservation.

## ✨ Features

### 🛒 E-Commerce Core
- **Product Catalog**: Dynamic product loading from Stripe API
- **Shopping Cart**: Persistent cart with real-time updates
- **Secure Checkout**: PCI-compliant payment processing with Stripe Elements
- **Order Management**: Complete order confirmation flow

### 🌍 Environmental Impact
- **Conservation Tracking**: Real-time calculation of trees planted and pandas supported
- **Impact Visualization**: Environmental metrics displayed throughout user journey
- **Verified Projects**: 10% of profits go directly to bamboo reforestation

### 📧 Communication
- **Contact System**: Professional business inquiry forms
- **Email Integration**: Order confirmations and customer communication via EmailJS

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for development and building
- **Stripe Elements** for payment forms

### Backend
- **Express.js** API server
- **Stripe API** for payment processing
- **EmailJS** for email communication

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecofloss
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env.local` with:
   ```env
   # Stripe Configuration
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   
   # EmailJS Configuration  
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the servers**
   
   Frontend:
   ```bash
   npm run dev
   ```
   
   Backend (in separate terminal):
   ```bash
   node server.js
   ```

5. **Setup Stripe Products**
   ```bash
   node setup-stripe-products.js
   ```

## 🏪 Products & Pricing

- **Premium Bamboo Dental Floss** - $12.99
- **Bamboo Toothbrush (Individual)** - $8.99  
- **Bamboo Toothbrush (2-Pack)** - $15.99
- **Bamboo Interdental Brush Kit** - $16.99
- **Complete Travel Kit** - $24.99

## 🌐 API Endpoints

- `GET /products` - Fetch all products
- `POST /create-payment-intent` - Create payment intent
- `GET /health` - Health check

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a Pull Request

---

**Made with 🌱 for a sustainable future**
