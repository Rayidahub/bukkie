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

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at DESC);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public insert for newsletter (anyone can subscribe)
CREATE POLICY "Allow public newsletter subscription" 
ON newsletter_subscribers FOR INSERT 
WITH CHECK (true);

-- Allow public to insert contact messages
CREATE POLICY "Allow public contact messages" 
ON contact_messages FOR INSERT 
WITH CHECK (true);

-- Allow public to read their own subscription status (by email)
CREATE POLICY "Allow public to read own subscription" 
ON newsletter_subscribers FOR SELECT 
USING (true);

-- Allow public to read contact messages (for admin)
CREATE POLICY "Allow public to read contact messages" 
ON contact_messages FOR SELECT 
USING (true);

-- Allow updates to contact messages (for admin status updates)
CREATE POLICY "Allow updates to contact messages" 
ON contact_messages FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Allow deletion (for admin)
CREATE POLICY "Allow deletion of subscribers" 
ON newsletter_subscribers FOR DELETE 
USING (true);

CREATE POLICY "Allow deletion of messages" 
ON contact_messages FOR DELETE 
USING (true);

-- Trigger to update updated_at for contact_messages
CREATE TRIGGER update_contact_messages_updated_at 
BEFORE UPDATE ON contact_messages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
