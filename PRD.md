# EcoFloss - Product Requirements Document (PRD)

## Executive Summary

EcoFloss is a revolutionary e-commerce platform addressing humanity's #1 source of daily microplastic intake through bamboo-based oral care products. The platform combines health-focused messaging around microplastics reduction with environmental conservation impact, creating a truly symbiotic relationship between human health and planetary wellness.

## Core Mission Statement

"EcoFloss eliminates your daily microplastic intake while creating a symbiotic relationship with nature. Every bamboo product you purchase makes you healthier by reducing plastic ingestion and helps reforest bamboo habitats for pandas - it's the ultimate win-win for human health and environmental conservation."

## Market Problem & Opportunity

### The Microplastics Health Crisis
- **Critical Statistic**: 99% of males globally have microplastics in their testicles
- **Primary Intake Source**: Daily toothbrushing with plastic toothbrushes and dental floss
- **Health Impact**: Dental floss directly scrapes gums, providing direct bloodstream access for microplastics
- **Scale**: Billions of people perform this plastic-ingesting activity 1-2 times daily

### Environmental Problem
- Plastic toothbrushes and dental floss are among the most frequently discarded items globally
- Short product lifecycle (3-4 months for toothbrushes, weeks for floss)
- Major contributors to ocean and forest pollution
- Non-biodegradable materials persist in ecosystems for centuries

### Market Gap
- People switching to bamboo toothbrushes but still using plastic floss
- No comprehensive solution addressing both products simultaneously
- Limited awareness of dental floss as primary microplastic source
- No existing platforms combining health benefits with conservation impact

## Solution Overview

EcoFloss provides the first comprehensive bamboo oral care solution, completely eliminating plastic from daily oral hygiene while supporting bamboo reforestation and panda conservation through a 10% revenue sharing model.

## Target Audience

### Primary Demographics
- Health-conscious consumers aged 25-45
- Environmental sustainability advocates
- High-income households ($50k+ annually)
- Urban and suburban professionals
- Parents concerned about family health

### Psychographics
- Values personal health optimization
- Willing to pay premium for sustainable products
- Active on social media sharing wellness content
- Researches product ingredients and sourcing
- Supports environmental causes through purchasing decisions

## Product Portfolio

### Core Products

#### 1. Bamboo Dental Floss
**Primary Product - Market Disruptor**
- **Materials**: 100% organic bamboo fiber
- **Packaging**: Biodegradable cardboard dispenser
- **Pack Sizes**: 
  - Single (30-day supply) - $8.99
  - 3-Pack (90-day supply) - $24.99 (Save 7%)
  - 6-Pack (180-day supply) - $44.99 (Save 16%)
- **Key Benefits**:
  - Eliminates #1 source of daily microplastic intake
  - Naturally antibacterial properties
  - Biodegradable within 60-90 days
  - Stronger than traditional plastic floss
- **Conservation Impact**: Each purchase plants 2-3 bamboo trees

#### 2. Bamboo Toothbrushes
**Complementary Product**
- **Materials**: Bamboo handle, natural bristles
- **Bristle Options**: Soft, Medium (Adult size focus)
- **Packaging**: Biodegradable bamboo fiber packaging
- **Pricing**: 
  - Single brush - $6.99
  - 4-Pack family set - $24.99 (Save 11%)
- **Key Benefits**:
  - Completes plastic-free oral care routine
  - Biodegradable handle
  - Ergonomic design matching traditional brushes
  - Natural antimicrobial properties
- **Conservation Impact**: Each purchase supports panda habitat preservation

#### 3. Natural Toothpaste (Future Product)
**Phase 2 Addition**
- **Formulation**: 100% natural ingredients, fluoride-free option
- **Packaging**: Recyclable glass containers or bamboo tubes
- **Development Status**: Supplier sourcing phase

### Product Sourcing Strategy
- **Primary Source**: AliExpress verified suppliers with organic certifications
- **Quality Standards**: 100% organic, biodegradable certifications required
- **Supplier Vetting**: Sample orders, quality testing, customer reviews analysis
- **Inventory Model**: Dropshipping with safety stock for high-velocity items

## Technical Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for optimal development experience
- **UI Components**: shadcn/ui for consistent, professional design system
- **Styling**: Tailwind CSS with custom earth-tone color palette
- **State Management**: React Context + useReducer for cart and global state
- **Forms**: React Hook Form with Zod validation

### Backend & Database
- **Backend as a Service**: Supabase
- **Database**: PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth (admin only - guest checkout for customers)
- **Real-time Features**: Supabase real-time subscriptions for live counters
- **File Storage**: Supabase Storage for product images and documentation

### Payment Processing
- **Primary Processor**: Stripe
- **Features**: 
  - One-time payments (no subscriptions initially)
  - Automatic conservation donation calculation (10% of revenue)
  - Multi-currency support preparation
  - Tax calculation integration for future expansion

### Deployment & Hosting
- **Frontend Hosting**: Vercel (optimal for React/Vite)
- **CDN**: Vercel Edge Network for global performance
- **Domain**: ecofloss.com (to be registered)
- **SSL**: Automatic HTTPS via Vercel

## Database Schema

### Core Tables

#### products
```sql
- id (UUID, Primary Key)
- name (TEXT)
- description (TEXT)
- price (DECIMAL)
- inventory_count (INTEGER)
- image_urls (TEXT[])
- category (TEXT) -- 'floss' | 'toothbrush' | 'toothpaste'
- trees_planted_per_purchase (INTEGER)
- pandas_supported_per_purchase (DECIMAL)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### orders
```sql
- id (UUID, Primary Key)
- order_number (TEXT, Unique)
- customer_email (TEXT)
- customer_name (TEXT)
- shipping_address (JSONB)
- billing_address (JSONB)
- items (JSONB) -- Array of {product_id, quantity, price}
- subtotal (DECIMAL)
- tax_amount (DECIMAL)
- shipping_cost (DECIMAL)
- total_amount (DECIMAL)
- conservation_donation (DECIMAL) -- 10% of subtotal
- stripe_payment_intent_id (TEXT)
- status (TEXT) -- 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
- tracking_number (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### conservation_impact
```sql
- id (UUID, Primary Key)
- order_id (UUID, Foreign Key)
- trees_planted (INTEGER)
- pandas_supported (DECIMAL)
- bamboo_reforestation_donation (DECIMAL) -- 5% of order total
- panda_conservation_donation (DECIMAL) -- 5% of order total
- total_environmental_impact (DECIMAL) -- Combined donation amount
- created_at (TIMESTAMP)
```

#### global_counters
```sql
- id (UUID, Primary Key)
- metric_name (TEXT) -- 'total_trees', 'total_pandas_supported', 'total_orders', 'total_revenue'
- metric_value (DECIMAL)
- last_updated (TIMESTAMP)
```

#### inventory_alerts
```sql
- id (UUID, Primary Key)
- product_id (UUID, Foreign Key)
- current_stock (INTEGER)
- reorder_point (INTEGER)
- supplier_contact (TEXT)
- alert_sent (BOOLEAN)
- created_at (TIMESTAMP)
```

## User Experience & Interface Design

### Design System

#### Color Palette
- **Primary Green**: #22C55E (Vibrant bamboo green)
- **Secondary Green**: #16A34A (Deep forest green)
- **Accent Green**: #15803D (Dark bamboo green)
- **Earth Brown**: #A16207 (Natural bamboo tone)
- **Cream**: #FEF3C7 (Bamboo fiber color)
- **Panda Black**: #000000
- **Pure White**: #FFFFFF
- **Text Gray**: #374151

#### Typography
- **Headers**: Inter Bold (clean, modern, trustworthy)
- **Body Text**: Inter Regular (excellent readability)
- **Accent Text**: Inter Medium (for highlights and CTAs)

#### Visual Elements
- **Icons**: Lucide React (consistent, minimal nature icons)
- **Images**: High-contrast product photography with natural backgrounds
- **Graphics**: Organic shapes, leaf patterns, bamboo illustrations
- **Layout**: Clean, spacious design with generous white space

### Page-by-Page User Stories & Specifications

## 1. Homepage (`/`)

### User Story
"As a health-conscious consumer, I want to quickly understand how my daily oral care routine is harming my health and discover a solution that also helps the environment, so I can make an informed purchase decision."

### Layout Sections

#### Hero Section
- **Background**: Subtle bamboo forest pattern overlay
- **Headline**: "Eliminate Your #1 Source of Daily Microplastic Intake"
- **Subheadline**: "Switch to bamboo oral care and plant trees with every purchase - healthier you, healthier planet"
- **CTA Button**: "Shop Bamboo Products" (prominent green button)
- **Hero Image**: Split image showing plastic vs bamboo toothbrush/floss
- **Conservation Counter**: Live display "🌱 X Trees Planted | 🐼 X Pandas Supported"

#### Problem Education Section
- **Section Title**: "The Hidden Health Crisis in Your Bathroom"
- **Statistic Highlight**: Large callout "99% of males have microplastics in their testicles"
- **Content Blocks**:
  1. **Daily Plastic Ingestion**: "Every time you brush and floss, you're ingesting microplastics directly into your bloodstream"
  2. **Gum Contact Reality**: "Dental floss scrapes your gums 20+ times per use, creating direct access to your circulatory system"
  3. **Accumulation Impact**: "These microplastics accumulate in organs - we don't know the long-term effects, but early research is alarming"
- **Visual Element**: Animated diagram showing microplastic journey from floss to bloodstream

#### Environmental Impact Section
- **Section Title**: "Your Oral Care = Ocean Pollution"
- **Content Blocks**:
  1. **Usage Statistics**: "Billions of plastic toothbrushes and floss containers discarded annually"
  2. **Ocean Impact**: "Dental products are among the most common beach and ocean pollutants"
  3. **Lifecycle Problem**: "3-month toothbrush lifecycle creates massive waste streams"
- **Visual Element**: Before/after images of ocean pollution vs clean beaches

#### Solution Showcase Section
- **Section Title**: "The Bamboo Solution: Health Meets Sustainability"
- **Product Preview Cards**:
  1. **Bamboo Dental Floss Card**
     - Product image with zoom capability
     - "Eliminates microplastic intake"
     - "Plants 3 trees per purchase"
     - Price display with quantity options
     - "Add to Cart" button
  2. **Bamboo Toothbrush Card**
     - Product image with zoom capability
     - "Completes your plastic-free routine"
     - "Supports panda habitat preservation"
     - Price display with quantity options
     - "Add to Cart" button

#### Conservation Impact Section
- **Section Title**: "Every Purchase Creates Real Environmental Impact"
- **Impact Statistics**: 
  - Real-time counter: "X Trees Planted This Month"
  - Real-time counter: "X Pandas Supported Through Habitat Protection"
  - "10% of every purchase goes directly to conservation"
- **Split Funding Visual**: 
  - 50% Bamboo Reforestation illustration
  - 50% Panda Conservation illustration
- **CTA**: "See Our Live Impact Dashboard"

### Technical Implementation
- **Components**: Hero, ProblemEducation, EnvironmentalImpact, ProductShowcase, ConservationImpact
- **State Management**: Global cart state, live conservation counters
- **Performance**: Lazy loading for images, optimized for Core Web Vitals
- **SEO**: Comprehensive meta tags, structured data for products

## 2. Product Catalog (`/products`)

### User Story
"As a customer ready to purchase, I want to see detailed information about both bamboo products, compare options, and understand the specific health and environmental benefits of each, so I can choose the right products for my needs."

### Layout & Components

#### Page Header
- **Title**: "Plastic-Free Oral Care Products"
- **Subtitle**: "Complete your transformation to healthier, sustainable oral care"
- **Filter Options**: Product type (All, Floss, Toothbrushes), Price range, Pack size

#### Product Grid
**Two Main Products with Detailed Cards**

##### Bamboo Dental Floss Card
- **Product Images**: 
  - Primary: Close-up of bamboo floss dispenser
  - Secondary: Floss texture detail
  - Tertiary: Packaging and contents
- **Product Name**: "100% Bamboo Dental Floss"
- **Health Benefit Highlight**: "Eliminates Your #1 Microplastic Source"
- **Environmental Benefit**: "Plants 3 Bamboo Trees Per Purchase"
- **Product Specifications**:
  - Material: 100% organic bamboo fiber
  - Length: 30 meters per dispenser
  - Packaging: Biodegradable cardboard
  - Durability: Stronger than plastic alternatives
- **Pack Options**:
  - Single Pack (30-day supply) - $8.99
  - 3-Pack (90-day supply) - $24.99 (Save $2)
  - 6-Pack (180-day supply) - $44.99 (Save $9)
- **Conservation Impact Preview**: "Your purchase will plant X trees"
- **Add to Cart Button**: Quantity selector + "Add to Cart"

##### Bamboo Toothbrush Card
- **Product Images**:
  - Primary: Toothbrush with natural bristles
  - Secondary: Handle texture and ergonomics
  - Tertiary: Packaging design
- **Product Name**: "Biodegradable Bamboo Toothbrush"
- **Health Benefit Highlight**: "Complete Your Microplastic-Free Routine"
- **Environmental Benefit**: "Supports Panda Habitat Conservation"
- **Product Specifications**:
  - Handle: Sustainably harvested bamboo
  - Bristles: Natural fiber (soft/medium options)
  - Lifecycle: 3-4 months recommended use
  - Disposal: 100% biodegradable
- **Options**:
  - Single Brush - $6.99
  - 4-Pack Family Set - $24.99 (Save $3)
- **Bristle Options**: Soft, Medium (radio button selection)
- **Conservation Impact Preview**: "Supports panda habitat preservation"
- **Add to Cart Button**: Quantity selector + bristle selection + "Add to Cart"

#### Educational Content Section
- **Section Title**: "Why Bamboo is Superior to Plastic"
- **Comparison Table**:
  | Feature | Bamboo Products | Plastic Products |
  |---------|----------------|------------------|
  | Microplastic Release | Zero | High |
  | Biodegradability | 60-90 days | 500+ years |
  | Strength | Superior | Standard |
  | Antibacterial | Natural | Chemical treatments |
  | Environmental Impact | Positive (reforestation) | Negative (pollution) |

### Technical Implementation
- **Components**: ProductGrid, ProductCard, ComparisonTable, FilterSidebar
- **State Management**: Cart state, filter states, product selection options
- **Performance**: Image optimization, lazy loading, efficient re-renders
- **Accessibility**: Keyboard navigation, screen reader compatibility

## 3. Individual Product Pages (`/product/bamboo-floss` & `/product/bamboo-toothbrush`)

### User Story
"As a customer considering a purchase, I want comprehensive information about a specific product, including detailed benefits, specifications, and impact information, so I can make a confident buying decision."

### Bamboo Floss Product Page

#### Product Gallery Section
- **Main Image**: Large, zoomable product photo
- **Thumbnail Gallery**: 4-6 images showing different angles, packaging, usage
- **Image Features**: Zoom on hover, click to enlarge, mobile swipe navigation

#### Product Information Section
- **Product Name**: "100% Bamboo Dental Floss"
- **Price Display**: Pack options with savings calculator
- **Health Benefits List**:
  - ✅ Eliminates microplastic ingestion
  - ✅ Natural antibacterial properties
  - ✅ Stronger than plastic alternatives
  - ✅ No chemical treatments or coatings
- **Environmental Benefits List**:
  - 🌱 Plants 3 bamboo trees per purchase
  - 🌍 100% biodegradable in 60-90 days
  - ♻️ Zero ocean pollution contribution
  - 🐼 Supports bamboo habitat restoration

#### Detailed Specifications
- **Material Composition**: 100% organic bamboo fiber
- **Product Dimensions**: 30 meters length, 1mm thickness
- **Packaging**: Biodegradable cardboard dispenser
- **Origin**: Sustainably sourced bamboo forests
- **Certifications**: Organic, biodegradable, sustainable sourcing

#### Conservation Impact Calculator
- **Interactive Element**: "Your Purchase Impact"
- **Real-time Calculation**: Based on selected quantity
- **Impact Display**: 
  - Trees to be planted: X bamboo trees
  - CO2 offset: X kg carbon dioxide
  - Panda support: $X to habitat preservation
  - Plastic eliminated: X grams from your annual intake

#### Add to Cart Section
- **Quantity Selector**: 1, 3, 6-pack options
- **Price Calculator**: Shows savings for bulk purchases
- **Add to Cart Button**: Large, prominent CTA
- **Conservation Preview**: "This purchase plants X trees"

### Bamboo Toothbrush Product Page

#### Similar structure with toothbrush-specific content:
- **Bristle Selection**: Soft vs Medium with descriptions
- **Handle Ergonomics**: Detailed comfort and grip information
- **Replacement Timeline**: 3-4 month usage recommendations
- **Family Pack Options**: Individual vs 4-pack family sets

### Technical Implementation
- **Components**: ProductGallery, ProductInfo, SpecificationTable, ImpactCalculator, AddToCartForm
- **State Management**: Product options, impact calculations, cart integration
- **Performance**: Image optimization, smooth animations, fast load times

## 4. Shopping Cart (`/cart`)

### User Story
"As a customer who has selected products, I want to review my order, see the total environmental impact of my purchase, and easily proceed to checkout, so I can complete my purchase with confidence about both the products and their positive impact."

### Layout & Functionality

#### Cart Header
- **Page Title**: "Your Plastic-Free Oral Care Cart"
- **Item Count**: "X items in your cart"
- **Impact Preview**: "Your order will plant X trees and support X pandas"

#### Cart Items Section
**Each Cart Item Card includes**:
- **Product Image**: Thumbnail with product name
- **Product Details**: Name, selected options (pack size, bristle type)
- **Quantity Controls**: Decrease/increase buttons with current quantity
- **Unit Price**: Individual product price
- **Line Total**: Quantity × unit price
- **Remove Button**: "Remove from cart" with confirmation
- **Conservation Impact**: "This item plants X trees"

#### Order Summary Section
- **Subtotal**: Sum of all line items
- **Shipping**: "FREE Carbon-Neutral Shipping" (highlighted in green)
- **Tax**: Calculated based on shipping location (if applicable)
- **Conservation Donation**: "10% for Environmental Impact: $X"
  - Breakdown: "$X for bamboo reforestation, $X for panda conservation"
- **Order Total**: Final amount to be charged

#### Environmental Impact Summary
- **Total Trees to be Planted**: Large, prominent number
- **Total Pandas Supported**: Contribution amount or symbolic representation
- **CO2 Offset**: Environmental impact in measurable terms
- **Microplastics Eliminated**: "You'll eliminate X grams of annual plastic intake"

#### Shipping Information
- **Carbon-Neutral Shipping Notice**: "We offset 100% of shipping emissions"
- **Delivery Timeline**: "5-7 business days to most locations"
- **Packaging**: "Plastic-free packaging made from recycled materials"

#### Action Buttons
- **Continue Shopping**: Returns to product catalog
- **Proceed to Checkout**: Large, prominent green button
- **Save Cart**: Option to save cart via email (guest-friendly)

### Technical Implementation
- **Components**: CartHeader, CartItem, OrderSummary, ImpactSummary, ShippingInfo
- **State Management**: Cart state with persistence, quantity updates, impact calculations
- **Validation**: Inventory checks, shipping restrictions, minimum order requirements
- **Performance**: Optimistic updates, efficient re-renders

## 5. Checkout Page (`/checkout`)

### User Story
"As a customer ready to purchase, I want a simple, secure checkout process that collects necessary information, processes my payment safely, and confirms my environmental impact, so I can complete my purchase quickly and confidently."

### Layout Sections

#### Checkout Progress Indicator
- **Steps**: Shipping → Payment → Confirmation
- **Visual Progress Bar**: Shows current step
- **Step Validation**: Completed steps marked with checkmarks

#### Order Summary Sidebar (Fixed/Sticky)
- **Products Ordered**: List with images, quantities, prices
- **Subtotal, Shipping, Tax, Total**
- **Conservation Impact**: "Planting X trees, Supporting X pandas"
- **Final Total**: Prominent display

#### Shipping Information Form
- **Customer Contact**:
  - Email address (required for order confirmation)
  - Phone number (optional, for delivery updates)
- **Shipping Address**:
  - Full name
  - Address line 1 & 2
  - City, State/Province, ZIP/Postal Code
  - Country (dropdown)
- **Shipping Options**:
  - Standard Carbon-Neutral (FREE) - 5-7 business days
  - Express Carbon-Neutral (+$9.99) - 2-3 business days
- **Special Instructions**: Optional field for delivery preferences

#### Payment Information Section
- **Stripe Elements Integration**:
  - Card number field
  - Expiry date field
  - CVC field
  - Billing ZIP code
- **Billing Address**:
  - Checkbox: "Same as shipping address"
  - If different: Full billing address form
- **Security Notice**: "SSL encrypted, secure payment processing"

#### Order Confirmation Section
- **Environmental Impact Summary**:
  - "Your order plants X bamboo trees"
  - "Supports X pandas through habitat conservation"
  - "Eliminates X grams of annual microplastic intake"
- **Email Confirmation Notice**: "Order details will be sent to [email]"
- **Terms Agreement**: Checkbox with links to Terms of Service and Privacy Policy

#### Action Buttons
- **Back to Cart**: Returns to cart for modifications
- **Complete Order**: Large, secure payment button
  - Shows final total
  - Includes security icons (SSL, Stripe)
  - Loading state during processing

### Post-Purchase Success Page (`/order-confirmation/[order-id]`)

#### Thank You Message
- **Header**: "Thank You for Choosing a Healthier Planet!"
- **Order Number**: Prominent display with copy button
- **Email Confirmation**: "Order details sent to [email]"

#### Order Details
- **Products Purchased**: List with quantities and prices
- **Shipping Address**: Where order is being sent
- **Payment Method**: Last 4 digits of card used

#### Environmental Impact Achievement
- **Celebration Graphics**: Animated trees being planted, pandas in forest
- **Impact Statement**: "Congratulations! Your order will:"
  - Plant X bamboo trees in reforestation areas
  - Support X pandas through habitat conservation
  - Eliminate X grams of microplastics from your annual intake
- **Impact Timeline**: "Trees will be planted within 30 days"

#### What Happens Next
- **Shipping Timeline**: "Order processing begins immediately"
- **Tracking Information**: "You'll receive tracking details via email"
- **Conservation Updates**: "Monthly impact reports will be sent to your email"

### Technical Implementation
- **Payment Processing**: Stripe Payment Intents for secure transactions
- **Form Validation**: Real-time validation with error handling
- **State Management**: Multi-step form state, order processing status
- **Security**: SSL encryption, PCI compliance through Stripe
- **Error Handling**: Payment failures, validation errors, network issues
- **Confirmation**: Order storage in database, email notifications triggered

## 6. Conservation Impact Dashboard (`/impact`)

### User Story
"As someone who cares about environmental impact, I want to see real-time data about how all EcoFloss purchases are contributing to conservation efforts, so I can feel confident about the platform's environmental commitments and share the positive impact with others."

### Layout Sections

#### Page Header
- **Title**: "Our Living Impact Dashboard"
- **Subtitle**: "Real-time conservation impact from our community"
- **Last Updated**: "Updated every hour with new order data"

#### Global Impact Counters
**Large, Animated Counter Section**:
- **Trees Planted Counter**: 
  - Large animated number (e.g., 2,847 trees)
  - Subtext: "Bamboo trees planted this year"
  - Visual: Growing tree animation
- **Pandas Supported Counter**:
  - Large animated number (e.g., 142 pandas)
  - Subtext: "Pandas supported through habitat preservation"
  - Visual: Panda illustration with forest background
- **Orders Completed Counter**:
  - Number of total orders processed
  - Subtext: "Customers choosing plastic-free oral care"
- **Microplastics Prevented Counter**:
  - Total grams of microplastics eliminated
  - Subtext: "Microplastics prevented from entering bloodstreams"

#### Monthly Progress Section
- **Current Month Progress Bars**:
  - Reforestation goal: X/1000 trees (with percentage)
  - Conservation goal: X pandas supported this month
  - Customer goal: X new customers joined the movement
- **Monthly Growth Chart**: Visual graph showing month-over-month impact growth

#### Impact Breakdown Section
- **Funding Allocation Pie Chart**:
  - 50% Bamboo Reforestation Projects
  - 50% Panda Habitat Conservation
  - Visual breakdown of how the 10% revenue share is allocated
- **Partner Organizations**:
  - Logo and brief description of reforestation partners
  - Logo and brief description of panda conservation partners
  - "Learn more about our partners" links

#### Geographic Impact Map
- **Interactive World Map**:
  - Markers showing reforestation project locations
  - Panda habitat preservation areas highlighted
  - Click for details about specific projects
- **Regional Impact Statistics**:
  - Trees planted by region
  - Conservation projects by country

#### Impact Timeline
- **Monthly Achievements**:
  - "March 2024: Planted 500 trees in Sichuan Province"
  - "February 2024: Supported 50 pandas through habitat restoration"
  - "January 2024: Prevented 2.1kg of microplastics from entering human bodies"
- **Upcoming Goals**:
  - "Goal: Plant 1,000 trees by June 2024"
  - "Goal: Support 100 new pandas by end of year"

#### Documentation Section
- **Proof of Impact**:
  - Photos from reforestation sites
  - Updates from panda conservation projects
  - Certificates and documentation from partner organizations
- **Transparency Reports**:
  - Monthly donation receipts
  - Partner organization progress reports
  - Third-party verification documents

#### Community Sharing Section
- **Social Sharing Tools**:
  - "Share our impact" buttons for social media
  - Pre-written posts highlighting conservation achievements
  - Custom graphics showing impact numbers
- **Newsletter Signup**:
  - "Get monthly impact updates in your inbox"
  - Email subscription for conservation reports

### Technical Implementation
- **Real-time Updates**: Supabase real-time subscriptions for live counters
- **Data Visualization**: Chart.js or D3.js for graphs and charts
- **Interactive Map**: Mapbox or Google Maps for geographic visualization
- **Performance**: Cached data with periodic updates, optimized for mobile
- **Animation**: Smooth counter animations, progressive data loading

## 7. About Us Page (`/about`)

### User Story
"As a potential customer, I want to understand the story behind EcoFloss, the founder's motivation, and the company's commitment to both health and environmental causes, so I can trust the brand and feel confident about supporting the mission."

### Layout Sections

#### Hero Section
- **Page Title**: "Our Mission: Healthier Humans, Healthier Planet"
- **Mission Statement**: 
  "EcoFloss exists to eliminate humanity's #1 source of daily microplastic intake while creating a truly symbiotic relationship with nature. Every bamboo product you purchase makes you healthier by reducing plastic ingestion and helps reforest bamboo habitats for pandas - it's the ultimate win-win for human health and environmental conservation."
- **Hero Image**: Split image showing healthy person + thriving bamboo forest

#### Founder's Story Section
- **Section Title**: "The Discovery That Changed Everything"
- **Personal Story**:
  - "After extensive research into microplastics and health, I discovered that 99% of males globally have microplastics in their testicles"
  - "The shocking realization: our daily oral care routine - something we do to stay healthy - was actually making us sick"
  - "Dental floss directly contacts our bloodstream through gum scraping, making it the #1 source of microplastic intake"
  - "I couldn't find a comprehensive solution, so I created EcoFloss"
- **Founder Photo**: Professional headshot with nature background
- **Quote**: "When I learned that brushing my teeth was poisoning my body, I knew I had to create a better solution for everyone."

#### The Health Crisis Section
- **Section Title**: "The Microplastics Health Emergency"
- **Key Statistics**:
  - 99% of males have microplastics in testicles
  - Unknown long-term health effects, but early research is alarming
  - Daily oral care = highest source of microplastic ingestion
  - Billions of people unknowingly poisoning themselves 1-2x daily
- **Scientific Backing**:
  - Links to research studies
  - Expert quotes and endorsements
  - Health authority warnings about microplastics

#### Environmental Commitment Section
- **Section Title**: "Beyond Health: Healing the Planet"
- **Environmental Philosophy**:
  - Every health solution should also benefit the environment
  - Bamboo products create positive environmental impact
  - Conservation funding creates measurable change
  - True sustainability means regeneration, not just reduction
- **Conservation Partnerships**:
  - Details about reforestation partners
  - Panda conservation organization relationships
  - Transparent funding allocation (10% of all revenue)

#### Our Products Philosophy Section
- **Section Title**: "Why Bamboo is the Perfect Solution"
- **Product Philosophy**:
  - Bamboo naturally eliminates microplastic intake
  - Stronger and more effective than plastic alternatives
  - 100% biodegradable with positive environmental impact
  - Creates regenerative cycle: purchase → conservation → healthier planet
- **Quality Commitment**:
  - 100% organic, sustainably sourced materials
  - Rigorous supplier vetting process
  - Continuous quality improvement
  - Customer satisfaction guarantee

#### Values & Principles Section
- **Core Values**:
  - **Health First**: Every product decision prioritizes human health
  - **Environmental Regeneration**: Going beyond sustainability to actively heal ecosystems
  - **Transparency**: Open about sourcing, impact, and business practices
  - **Scientific Integrity**: Evidence-based approach to health and environmental claims
  - **Community Impact**: Building a movement of health-conscious, environmentally-aware consumers

#### Impact Goals Section
- **2024 Goals**:
  - Plant 10,000 bamboo trees
  - Support 500 pandas through habitat conservation
  - Help 1,000 customers eliminate microplastic intake
  - Prevent 50kg of plastic from entering oceans
- **Long-term Vision (5 Years)**:
  - Become the leading plastic-free oral care brand globally
  - Plant 100,000 trees and support 5,000 pandas
  - Eliminate 1 ton of microplastics from human intake
  - Inspire industry-wide shift to sustainable oral care

#### Contact & Connect Section
- **Get in Touch**:
  - Email: hello@ecofloss.com
  - Follow our conservation updates on social media
  - Subscribe to monthly impact newsletters
- **Press & Partnerships**:
  - Media inquiries welcome
  - Retail partnership opportunities
  - Conservation organization collaborations

### Technical Implementation
- **Components**: HeroSection, FounderStory, HealthCrisis, EnvironmentalCommitment, ProductPhilosophy, Values, Goals, Contact
- **Content Management**: Structured content for easy updates
- **SEO Optimization**: Rich meta tags, structured data for organization information
- **Performance**: Optimized images, fast loading for better user experience

## 8. Admin Dashboard (`/admin`)

### User Story
"As the business owner, I need comprehensive insights into sales performance, order management, inventory levels, and conservation impact, so I can make informed business decisions and ensure smooth operations."

### Authentication & Access
- **Login Required**: Supabase authentication for admin access
- **Role-Based Access**: Admin-only routes with proper security
- **Session Management**: Secure session handling with automatic logout

### Dashboard Layout

#### Overview Dashboard (`/admin/dashboard`)
- **Key Metrics Cards**:
  - Total Revenue (this month vs last month)
  - Orders Completed (with percentage change)
  - Conversion Rate (visitors to customers)
  - Average Order Value
- **Conservation Impact Summary**:
  - Trees Planted This Month
  - Pandas Supported This Month
  - Total Conservation Donations
- **Quick Actions**:
  - Add New Product
  - Process Pending Orders
  - Update Inventory
  - Generate Reports

#### Sales Analytics (`/admin/sales`)
- **Revenue Charts**:
  - Daily revenue (last 30 days)
  - Monthly revenue comparison (last 12 months)
  - Revenue by product category
- **Sales Performance Metrics**:
  - Best-selling products with quantities
  - Revenue per product category
  - Geographic sales distribution
  - Customer acquisition cost
- **Conversion Analytics**:
  - Funnel analysis (visits → cart → checkout → purchase)
  - Abandoned cart recovery opportunities
  - Product page performance metrics

#### Order Management (`/admin/orders`)
- **Order List View**:
  - Filterable by status (pending, processing, shipped, delivered)
  - Searchable by order number, customer email
  - Sortable by date, amount, status
- **Order Details**:
  - Customer information and shipping address
  - Products ordered with quantities and prices
  - Payment status and Stripe transaction details
  - Conservation impact for this order
- **Order Processing**:
  - Update order status workflow
  - Add tracking numbers
  - Send customer notifications
  - Process refunds/returns

#### Inventory Management (`/admin/inventory`)
- **Current Stock Levels**:
  - Real-time inventory counts for all products
  - Low stock alerts (configurable thresholds)
  - Supplier contact information
- **Inventory Actions**:
  - Update stock quantities
  - Set reorder points
  - Add new products
  - Manage product variations (pack sizes, bristle types)
- **Supplier Management**:
  - Contact information for each supplier
  - Order history and lead times
  - Quality notes and ratings

#### Conservation Impact Tracking (`/admin/conservation`)
- **Impact Calculations**:
  - Total conservation donations by month
  - Breakdown: reforestation vs panda conservation
  - Impact per product sold
- **Donation Management**:
  - Track actual donations made to partner organizations
  - Upload donation receipts and documentation
  - Schedule monthly donation transfers
- **Impact Reporting**:
  - Generate monthly impact reports
  - Export data for transparency reports
  - Update global counters for public dashboard

#### Customer Management (`/admin/customers`)
- **Customer Database**:
  - Customer contact information from orders
  - Order history per customer
  - Lifetime value calculations
- **Communication Tools**:
  - Send order updates and shipping notifications
  - Monthly impact newsletter management
  - Customer service ticket tracking

#### Reports & Analytics (`/admin/reports`)
- **Financial Reports**:
  - Profit & loss statements
  - Tax reporting data
  - Revenue forecasting
- **Operational Reports**:
  - Inventory turnover rates
  - Supplier performance metrics
  - Shipping cost analysis
- **Conservation Reports**:
  - Monthly impact summaries
  - Partner organization updates
  - Transparency report generation

### Technical Implementation
- **Authentication**: Supabase Auth with role-based access control
- **Data Visualization**: Charts and graphs for analytics
- **Real-time Updates**: Live order status, inventory levels
- **Export Functions**: PDF and CSV export for all reports
- **Responsive Design**: Mobile-friendly admin interface
- **Security**: Row Level Security policies, admin-only access

## 9. Legal & Compliance Pages

### Privacy Policy (`/privacy`)
- **Data Collection**: What information we collect and why
- **Data Usage**: How customer information is used
- **Data Protection**: Security measures and storage
- **Third-party Services**: Stripe, Supabase, email providers
- **Cookie Policy**: Analytics and performance tracking
- **User Rights**: Access, correction, deletion requests
- **Contact Information**: How to reach us about privacy concerns

### Terms of Service (`/terms`)
- **Product Descriptions**: Accuracy of product information
- **Pricing**: Price accuracy, payment processing
- **Shipping & Returns**: Delivery terms, return policy
- **Conservation Claims**: Transparency about environmental impact
- **Limitation of Liability**: Standard e-commerce protections
- **Dispute Resolution**: How conflicts are handled
- **Modification Rights**: How terms may change

### Contact Page (`/contact`)
- **Contact Form**:
  - Name, email, subject, message fields
  - Inquiry type: General, Orders, Returns, Conservation, Press
- **Direct Contact**:
  - Email: hello@ecofloss.com
  - Business address (if applicable)
- **FAQ Section**:
  - Common questions about products, shipping, returns
  - Conservation impact questions
  - Product care and usage instructions
- **Response Time**: "We respond within 24 hours"

## Technical Development Phases

### Phase 1: Foundation Setup (Week 1)
1. Initialize Vite + React + TypeScript project
2. Install and configure shadcn/ui with custom theme
3. Setup Supabase project and database schema
4. Implement basic routing with React Router
5. Create responsive layout components

### Phase 2: Core E-commerce Features (Week 2-3)
1. Build product catalog and product pages
2. Implement shopping cart functionality
3. Develop checkout flow with Stripe integration
4. Create order confirmation and email notifications
5. Build admin dashboard basics

### Phase 3: Conservation Features (Week 4)
1. Implement conservation impact calculations
2. Build live impact dashboard with real-time counters
3. Create conservation tracking in admin panel
4. Add impact previews throughout user flow

### Phase 4: Content & Legal (Week 5)
1. Build homepage with educational content
2. Create About Us page with mission content
3. Implement legal pages (Privacy, Terms, Contact)
4. Add comprehensive product information

### Phase 5: Polish & Launch Prep (Week 6)
1. Performance optimization and testing
2. SEO implementation and meta tags
3. Mobile responsiveness verification
4. Security audit and compliance check
5. Production deployment setup

## Success Metrics & KPIs

### Business Metrics
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Average Order Value (AOV)
- Conversion Rate (traffic to purchases)
- Customer Lifetime Value (CLV)

### Environmental Impact Metrics
- Trees Planted Per Month
- Conservation Donations Made
- Microplastics Prevented (calculated)
- Customer Environmental Awareness (surveys)

### User Experience Metrics
- Page Load Speed (<2 seconds)
- Mobile Conversion Rate
- Cart Abandonment Rate
- Customer Satisfaction Score

### Marketing & Growth Metrics
- Organic Traffic Growth
- Social Media Engagement
- Email Newsletter Sign-ups
- Customer Referral Rate

This comprehensive PRD provides the complete blueprint for building EcoFloss as a professional, impactful e-commerce platform that successfully combines health advocacy with environmental conservation, creating a compelling value proposition for conscious consumers while building a sustainable business model.