-- ============================================
-- COMPLETE SUPABASE SETUP SCRIPT
-- Run this ONCE to set up everything
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. CREATE ALL TABLES
-- ============================================

-- Hero Content Table
CREATE TABLE IF NOT EXISTS hero_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  eyebrow TEXT NOT NULL DEFAULT 'Creative Graphics Designer — Lagos, NG',
  greeting TEXT NOT NULL DEFAULT 'Hello, I''m Bukola',
  line2 TEXT NOT NULL DEFAULT 'I build brands through',
  highlight TEXT NOT NULL DEFAULT 'visual storytelling.',
  paragraph TEXT NOT NULL DEFAULT 'I help organizations communicate clearly, campaign boldly, and print beautifully — from social media graphics and newsletters to large-format banners and brand identities.',
  primary_label TEXT NOT NULL DEFAULT 'View My Work',
  primary_link TEXT NOT NULL DEFAULT '/projects',
  secondary_label TEXT NOT NULL DEFAULT 'Let''s Talk',
  secondary_link TEXT NOT NULL DEFAULT '/contact',
  teams_label TEXT NOT NULL DEFAULT 'Designing for teams at',
  orgs JSONB NOT NULL DEFAULT '["Business Women Hub", "Bramble Network", "Shapers of Nation", "Sexual Purity Movement"]',
  portrait TEXT NOT NULL DEFAULT '',
  tags JSONB NOT NULL DEFAULT '["Graphic Design", "Digital Media", "Print Production"]',
  badge_label TEXT NOT NULL DEFAULT 'Years Exp.',
  availability TEXT NOT NULL DEFAULT 'Available for projects',
  coords TEXT NOT NULL DEFAULT '6.6191° N — 3.5123° E',
  ticker_words JSONB NOT NULL DEFAULT '["Social Media Design", "Branding", "Print Production", "Newsletters", "Campaigns", "Video Content", "Event Graphics", "Digital Media"]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About Content Table
CREATE TABLE IF NOT EXISTS about_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  image TEXT NOT NULL DEFAULT '',
  tag1 TEXT NOT NULL DEFAULT '✦ Brand Systems',
  tag2 TEXT NOT NULL DEFAULT 'Print ↔ Digital',
  eyebrow TEXT NOT NULL DEFAULT 'About Me',
  heading1 TEXT NOT NULL DEFAULT 'Who is',
  heading2 TEXT NOT NULL DEFAULT 'Esther Bukola?',
  intro TEXT NOT NULL DEFAULT 'I''m a detail-oriented, result-driven creative professional based in Lagos — working across graphics design, digital media, social media management, communications, customer service, and IT support.',
  approach TEXT NOT NULL DEFAULT 'My approach combines creative visual storytelling, attention to detail, strategic communication, and a strong understanding of audience needs. My mission is simple:',
  mission TEXT NOT NULL DEFAULT 'creating positive customer and audience experiences through innovative design.',
  cv_label TEXT NOT NULL DEFAULT 'Download CV',
  exp_label TEXT NOT NULL DEFAULT 'My Experience',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  no TEXT NOT NULL,
  title TEXT NOT NULL,
  kicker TEXT NOT NULL,
  description TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]',
  icon TEXT NOT NULL DEFAULT 'pen',
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  org TEXT NOT NULL,
  category TEXT NOT NULL,
  year TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  study_type TEXT NOT NULL DEFAULT '',
  objective TEXT NOT NULL DEFAULT '',
  deliverables JSONB NOT NULL DEFAULT '[]',
  tools JSONB NOT NULL DEFAULT '[]',
  impact TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles/Blog Table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tag TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL,
  read_time TEXT NOT NULL DEFAULT '3 min read',
  body JSONB NOT NULL DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  org TEXT NOT NULL,
  avatar TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  source TEXT DEFAULT 'website'
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  service TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. INSERT DEFAULT DATA
-- ============================================

-- Insert default hero content
INSERT INTO hero_content (id) VALUES (uuid_generate_v4())
ON CONFLICT DO NOTHING;

-- Insert default about content
INSERT INTO about_content (id) VALUES (uuid_generate_v4())
ON CONFLICT DO NOTHING;

-- Insert default services
INSERT INTO services (no, title, kicker, description, tags, icon, featured, sort_order) VALUES
('01', 'Graphic Design & Digital Media', 'Primary specialization', 'Visually engaging design that helps organizations communicate ideas, promote activities, strengthen brands, and connect with their audiences — from a single post to a full campaign system.', '["Social media graphics", "Flyers & posters", "Banners", "Brochures", "Newsletters", "Event materials", "Branding materials", "Publication design", "Digital campaigns", "Blog graphics", "Ad creatives"]', 'pen', true, 1),
('02', 'Customer Service & Communications', 'People & message', 'Clear, empathetic communication that turns audiences into communities — managing relationships, coordinating stakeholders, and keeping every public touchpoint on-brand.', '["Customer relationship management", "Stakeholder communication", "Social media communication", "Content creation", "Community engagement", "Volunteer engagement", "Digital communication"]', 'chat', false, 2),
('03', 'IT Support & Print Operations', 'Technical backbone', 'Hands-on production experience — from preparing files for large-format output and ID card machines to keeping the digital workplace running without hiccups.', '["Technical support", "Microsoft Office", "Printing operations", "Large-format printing", "ID card production", "IT troubleshooting", "Digital workplace support"]', 'chip', false, 3)
ON CONFLICT DO NOTHING;

-- Insert default social links
INSERT INTO social_links (platform, url, label, sort_order) VALUES
('linkedin', '', 'LinkedIn', 1),
('instagram', '', 'Instagram', 2),
('behance', '', 'Behance', 3),
('dribbble', '', 'Dribbble', 4),
('whatsapp', '', 'WhatsApp', 5)
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_sort_order ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_articles_sort_order ON articles(sort_order);
CREATE INDEX IF NOT EXISTS idx_articles_tag ON articles(tag);
CREATE INDEX IF NOT EXISTS idx_testimonials_sort_order ON testimonials(sort_order);
CREATE INDEX IF NOT EXISTS idx_social_links_sort_order ON social_links(sort_order);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at DESC);

-- ============================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. CREATE SECURITY POLICIES
-- ============================================

-- Allow public read access on all content tables
CREATE POLICY "Allow public read access on hero_content" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access on about_content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Allow public read access on testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access on social_links" ON social_links FOR SELECT USING (true);

-- Allow public newsletter subscription
CREATE POLICY "Allow public newsletter subscription" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public to read own subscription" ON newsletter_subscribers FOR SELECT USING (true);

-- Allow public contact messages
CREATE POLICY "Allow public contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public to read contact messages" ON contact_messages FOR SELECT USING (true);

-- Allow all operations for admin (you can restrict this later)
CREATE POLICY "Allow all operations on hero_content" ON hero_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on about_content" ON about_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on projects" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on social_links" ON social_links FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow deletion of subscribers" ON newsletter_subscribers FOR DELETE USING (true);
CREATE POLICY "Allow deletion of messages" ON contact_messages FOR DELETE USING (true);

-- ============================================
-- 6. CREATE TRIGGERS FOR updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON hero_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON about_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SETUP COMPLETE!
-- ============================================

-- Now create the storage bucket manually in Supabase Dashboard:
-- 1. Go to Storage
-- 2. Click "New bucket"
-- 3. Name: portfolio
-- 4. Toggle "Public bucket" ON
-- 5. Click "Create bucket"

-- Then add storage policies in the bucket's Policies tab:
-- See SUPABASE_STORAGE_SETUP.md for detailed instructions
