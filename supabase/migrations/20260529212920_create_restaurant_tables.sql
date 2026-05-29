/*
  # Restaurant Website Database Schema

  ## New Tables
  - `menu_items` - All menu items with category, price, description, image
  - `reviews` - Customer testimonials with star ratings
  - `reservations` - Table booking requests
  - `contact_messages` - Contact form submissions

  ## Security
  - RLS enabled on all tables
  - Public SELECT on menu_items and reviews
  - Authenticated INSERT for reservations and contact_messages
  - Anonymous INSERT allowed for contact forms and reservations (public-facing)
*/

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'Main Meals',
  image_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available menu items"
  ON menu_items FOR SELECT
  USING (is_available = true);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_location text DEFAULT '',
  rating integer NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review_text text NOT NULL,
  avatar_letter text DEFAULT 'G',
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published reviews"
  ON reviews FOR SELECT
  USING (is_published = true);

-- Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  reservation_date date NOT NULL,
  reservation_time time NOT NULL,
  guests integer NOT NULL DEFAULT 2,
  special_requests text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a reservation"
  ON reservations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Seed Menu Items
INSERT INTO menu_items (name, description, price, category, is_featured) VALUES
  -- Starters
  ('Bruschetta al Pomodoro', 'Toasted artisan bread topped with fresh roma tomatoes, garlic, basil, and extra virgin olive oil', 95.00, 'Starters', false),
  ('Crispy Calamari', 'Tender calamari rings lightly dusted and fried golden, served with house-made aioli and fresh lemon', 145.00, 'Starters', false),
  ('Beef Carpaccio', 'Wafer-thin slices of premium beef tenderloin with rocket, shaved parmesan, capers and truffle oil', 185.00, 'Starters', true),
  ('Butternut Bisque', 'Silky roasted butternut soup finished with cream, toasted seeds and herb oil', 110.00, 'Starters', false),
  -- Main Meals
  ('Grilled Beef Fillet', '250g prime beef fillet grilled to perfection, served with truffle mash, seasonal vegetables and red wine jus', 395.00, 'Main Meals', true),
  ('Lamb Rack', 'Herb-crusted Karoo lamb rack, served with rosemary roasted potatoes, ratatouille and mint reduction', 365.00, 'Main Meals', true),
  ('Pan-Seared Salmon', 'Atlantic salmon fillet with lemon butter sauce, wilted spinach, cherry tomatoes and crispy capers', 285.00, 'Main Meals', false),
  ('Chicken Supreme', 'Free-range chicken breast with mushroom cream sauce, asparagus and pommes fondant', 245.00, 'Main Meals', false),
  ('Mushroom Risotto', 'Creamy arborio risotto with wild mushrooms, truffle oil, parmesan crisp and fresh herbs', 215.00, 'Main Meals', false),
  -- Desserts
  ('Malva Pudding', 'Classic South African warm malva pudding with crème anglaise and vanilla bean ice cream', 115.00, 'Desserts', false),
  ('Chocolate Fondant', 'Warm dark chocolate lava cake with a molten centre, served with Chantilly cream and berry coulis', 135.00, 'Desserts', true),
  ('Crème Brûlée', 'Classic French vanilla custard with a perfectly caramelised sugar crust and fresh berries', 125.00, 'Desserts', false),
  ('Cheese Selection', 'Curated selection of local and imported cheeses, quince paste, crackers and honeycomb', 185.00, 'Desserts', false),
  -- Drinks
  ('Signature Negroni', 'House-crafted negroni with premium gin, sweet vermouth and Campari, served over a large ice sphere', 145.00, 'Drinks', false),
  ('Sparkling Elderflower', 'House-made elderflower cordial, fresh mint, lime and sparkling water', 85.00, 'Drinks', false),
  ('Estate Red Wine', 'Premium South African Cabernet Sauvignon from the Western Cape, full-bodied with notes of dark fruit', 165.00, 'Drinks', false),
  ('Freshly Brewed Coffee', 'Single-origin arabica, available as espresso, americano, cappuccino or flat white', 65.00, 'Drinks', false)
ON CONFLICT DO NOTHING;

-- Seed Reviews
INSERT INTO reviews (customer_name, customer_location, rating, review_text, avatar_letter) VALUES
  ('Alexandra V.', 'Sandton, JHB', 5, 'An absolutely exquisite dining experience. The beef fillet was cooked to perfection and the service was impeccable. This is the finest restaurant in Johannesburg without question.', 'A'),
  ('James K.', 'Cape Town', 5, 'I have dined in restaurants across Europe and this stands proudly among the best. The attention to detail in every dish is remarkable. The chocolate fondant was divine.', 'J'),
  ('Naledi M.', 'Pretoria', 5, 'We celebrated our anniversary here and the staff made the evening truly memorable. The lamb rack was outstanding and the wine selection is superb. We will absolutely be returning.', 'N'),
  ('Michael D.', 'Rosebank', 5, 'From the moment you walk in, the atmosphere is sophisticated yet warm and welcoming. The tasting menu was an adventure through incredible flavours. Highly recommend to everyone.', 'M'),
  ('Priya S.', 'Johannesburg North', 5, 'The mushroom risotto was the best I have ever had. As a vegetarian, I appreciate a restaurant that takes plant-based dishes as seriously as their meat courses. Spectacular.', 'P'),
  ('Thomas W.', 'Hyde Park', 5, 'Outstanding in every regard. The sommelier was incredibly knowledgeable and paired our wines perfectly. The crème brûlée was flawless. This is our new favourite special occasion restaurant.', 'T')
ON CONFLICT DO NOTHING;
