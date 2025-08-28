-- Update products with real supplier data
-- Clear existing sample data
DELETE FROM products WHERE name IN ('100% Bamboo Dental Floss', 'Biodegradable Bamboo Toothbrush');

-- Insert actual supplier products with professional specifications
INSERT INTO products (name, description, price, inventory_count, image_urls, category, trees_planted_per_purchase, pandas_supported_per_purchase, is_active) VALUES

-- Bamboo Dental Floss (Based on supplier specs)
(
    'Premium Bamboo Dental Floss',
    'Professional twin-line bamboo fiber floss with custom EcoFloss branding. Zero microplastic shedding with superior strength and natural antibacterial properties. Each 30-meter container is packaged in sustainable, biodegradable materials.',
    12.99,
    150,
    ARRAY[
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
        'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&q=80',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'
    ],
    'floss',
    3,
    1.0,
    true
),

-- Bamboo Toothbrush Single (Based on supplier OB-WY-YS119 model)
(
    'Bamboo Toothbrush - Individual',
    'CE-certified bamboo toothbrush with organic charcoal holder design. Features soft Dupont bristles and 100% biodegradable bamboo handle. Ergonomically designed for effective daily cleaning with custom EcoFloss branding.',
    8.99,
    200,
    ARRAY[
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80',
        'https://images.unsplash.com/photo-1582719495072-1e4b2b2b3421?w=800&q=80'
    ],
    'toothbrush',
    1,
    0.5,
    true
),

-- Bamboo Toothbrush 2-Pack (Bundle option)
(
    'Bamboo Toothbrush - 2 Pack',
    'Duo set of CE-certified bamboo toothbrushes with organic charcoal holders. Perfect for couples or family use. Features soft Dupont bristles, biodegradable handles, and comes in eco-friendly packaging.',
    15.99,
    100,
    ARRAY[
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80'
    ],
    'toothbrush',
    2,
    1.0,
    true
),

-- Interdental Brushes (Based on supplier 8-piece kit)
(
    'Bamboo Interdental Brush Kit',
    'Professional 8-piece bamboo interdental brush set for comprehensive oral care. Includes multiple sizes for different tooth gaps. 100% biodegradable handles with soft, effective bristles for plaque removal.',
    16.99,
    75,
    ARRAY[
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
        'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&q=80'
    ],
    'floss',
    2,
    0.75,
    true
),

-- Travel Kit (Combining multiple products)
(
    'Complete Bamboo Oral Care Travel Kit',
    'All-in-one sustainable travel solution including bamboo toothbrush, dental floss, and interdental brushes. Comes in compact, biodegradable travel case with custom EcoFloss branding. Perfect for eco-conscious travelers.',
    24.99,
    50,
    ARRAY[
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80'
    ],
    'toothbrush',
    5,
    2.0,
    true
);

-- Update global counters to reflect new products
UPDATE global_counters SET metric_value = 0 WHERE metric_name IN ('total_trees', 'total_pandas_supported', 'total_orders', 'total_revenue');

-- Show updated products
SELECT 
    name,
    price,
    inventory_count,
    category,
    trees_planted_per_purchase,
    pandas_supported_per_purchase
FROM products 
WHERE is_active = true
ORDER BY category, price;