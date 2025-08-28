-- EcoFloss Database Schema
-- Run these commands in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    inventory_count INTEGER NOT NULL DEFAULT 0,
    image_urls TEXT[] NOT NULL DEFAULT '{}',
    category TEXT NOT NULL CHECK (category IN ('floss', 'toothbrush', 'toothpaste')),
    trees_planted_per_purchase INTEGER NOT NULL DEFAULT 1,
    pandas_supported_per_purchase DECIMAL(5, 2) NOT NULL DEFAULT 0.5,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table  
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    customer_email TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    shipping_address JSONB NOT NULL,
    billing_address JSONB NOT NULL,
    items JSONB NOT NULL, -- Array of {product_id, quantity, price, name}
    subtotal DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    conservation_donation DECIMAL(10, 2) NOT NULL, -- 10% of subtotal
    stripe_payment_intent_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    tracking_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conservation impact tracking
CREATE TABLE conservation_impact (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    trees_planted INTEGER NOT NULL DEFAULT 0,
    pandas_supported DECIMAL(5, 2) NOT NULL DEFAULT 0,
    bamboo_reforestation_donation DECIMAL(10, 2) NOT NULL, -- 5% of order total
    panda_conservation_donation DECIMAL(10, 2) NOT NULL, -- 5% of order total  
    total_environmental_impact DECIMAL(10, 2) NOT NULL, -- Combined donation
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Global counters for real-time dashboard
CREATE TABLE global_counters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    metric_name TEXT NOT NULL UNIQUE CHECK (metric_name IN ('total_trees', 'total_pandas_supported', 'total_orders', 'total_revenue')),
    metric_value DECIMAL(15, 2) NOT NULL DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory alerts
CREATE TABLE inventory_alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    current_stock INTEGER NOT NULL,
    reorder_point INTEGER NOT NULL,
    supplier_contact TEXT,
    alert_sent BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial global counters
INSERT INTO global_counters (metric_name, metric_value) VALUES
    ('total_trees', 0),
    ('total_pandas_supported', 0),
    ('total_orders', 0),
    ('total_revenue', 0);

-- Insert sample products
INSERT INTO products (name, description, price, inventory_count, image_urls, category, trees_planted_per_purchase, pandas_supported_per_purchase) VALUES
    (
        '100% Bamboo Dental Floss', 
        'Eliminate your #1 source of daily microplastic intake with our 100% organic bamboo dental floss. Stronger than plastic, naturally antibacterial, and completely biodegradable within 60-90 days.',
        8.99,
        500,
        ARRAY['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'],
        'floss',
        3,
        1.0
    ),
    (
        'Biodegradable Bamboo Toothbrush',
        'Complete your plastic-free oral care routine with our ergonomic bamboo toothbrush. Natural antimicrobial handle with soft natural bristles for effective, gentle cleaning.',
        6.99,
        300,
        ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'],
        'toothbrush',
        1,
        0.5
    );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Function to update global counters when orders are created
CREATE OR REPLACE FUNCTION update_global_counters_on_order()
RETURNS TRIGGER AS $$
BEGIN
    -- Update total orders
    UPDATE global_counters 
    SET metric_value = metric_value + 1, last_updated = NOW()
    WHERE metric_name = 'total_orders';
    
    -- Update total revenue
    UPDATE global_counters
    SET metric_value = metric_value + NEW.total_amount, last_updated = NOW()  
    WHERE metric_name = 'total_revenue';
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to update conservation counters when conservation impact is created
CREATE OR REPLACE FUNCTION update_conservation_counters()
RETURNS TRIGGER AS $$
BEGIN
    -- Update total trees planted
    UPDATE global_counters
    SET metric_value = metric_value + NEW.trees_planted, last_updated = NOW()
    WHERE metric_name = 'total_trees';
    
    -- Update total pandas supported  
    UPDATE global_counters
    SET metric_value = metric_value + NEW.pandas_supported, last_updated = NOW()
    WHERE metric_name = 'total_pandas_supported';
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply counter triggers
CREATE TRIGGER update_counters_on_order AFTER INSERT ON orders FOR EACH ROW EXECUTE PROCEDURE update_global_counters_on_order();
CREATE TRIGGER update_conservation_counters_trigger AFTER INSERT ON conservation_impact FOR EACH ROW EXECUTE PROCEDURE update_conservation_counters();

-- Row Level Security (RLS) policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE conservation_impact ENABLE ROW LEVEL SECURITY;
ALTER TABLE global_counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_alerts ENABLE ROW LEVEL SECURITY;

-- Public read access for products and global counters
CREATE POLICY "Public can read active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read global counters" ON global_counters FOR SELECT USING (true);

-- Admin can do everything (you'll need to set up admin role)
CREATE POLICY "Admin full access products" ON products FOR ALL USING (auth.jwt() ->> 'email' = 'your_admin_email@example.com');
CREATE POLICY "Admin full access orders" ON orders FOR ALL USING (auth.jwt() ->> 'email' = 'your_admin_email@example.com');
CREATE POLICY "Admin full access conservation" ON conservation_impact FOR ALL USING (auth.jwt() ->> 'email' = 'your_admin_email@example.com');
CREATE POLICY "Admin full access counters" ON global_counters FOR ALL USING (auth.jwt() ->> 'email' = 'your_admin_email@example.com');
CREATE POLICY "Admin full access alerts" ON inventory_alerts FOR ALL USING (auth.jwt() ->> 'email' = 'your_admin_email@example.com');

-- Orders can be inserted by anyone (guest checkout), but only admin can read/update
CREATE POLICY "Anyone can insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert conservation impact" ON conservation_impact FOR INSERT WITH CHECK (true);