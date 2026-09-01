/*
# Create agency_portfolio and agency_leads tables

1. New Tables
- `agency_portfolio` — stores portfolio project entries displayed on the live portfolio grid.
  - id (uuid, primary key)
  - title (text, not null) — project name
  - category (text, not null) — e.g. "Web App", "Landing Page", "E-commerce"
  - description (text, not null) — short project description
  - image_url (text) — optional URL to a project image
  - client (text) — client/business name
  - tags (text[]) — array of technology/service tags
  - featured (boolean, default false) — whether to highlight the project
  - created_at (timestamptz, default now())
- `agency_leads` — stores contact form submissions from potential clients.
  - id (uuid, primary key)
  - name (text, not null) — client's full name
  - email (text, not null) — client's email address
  - business_name (text) — business/company name
  - budget (text) — selected budget range
  - message (text, not null) — project details message
  - created_at (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- agency_portfolio: public read (anon + authenticated SELECT), no public writes — portfolio items are managed by the agency owner.
- agency_leads: public INSERT only (anyone can submit a lead), no public SELECT/UPDATE/DELETE — leads are private to the agency owner.

3. Important Notes
- This is a no-auth single-tenant agency marketing site; visitors submit leads and browse the portfolio.
- No user_id columns or auth references — the site has no login.
- RLS policies use `TO anon, authenticated` so the anon-key frontend can read the portfolio and insert leads.
*/

CREATE TABLE IF NOT EXISTS agency_portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image_url text,
  client text,
  tags text[] DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agency_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  business_name text,
  budget text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE agency_portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_leads ENABLE ROW LEVEL SECURITY;

-- agency_portfolio: public read only
DROP POLICY IF EXISTS "anon_read_portfolio" ON agency_portfolio;
CREATE POLICY "anon_read_portfolio" ON agency_portfolio FOR SELECT
  TO anon, authenticated USING (true);

-- agency_leads: public insert only (visitors submit leads)
DROP POLICY IF EXISTS "anon_insert_leads" ON agency_leads;
CREATE POLICY "anon_insert_leads" ON agency_leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Seed sample portfolio data
INSERT INTO agency_portfolio (title, category, description, image_url, client, tags, featured) VALUES
  ('SaaS Analytics Platform', 'Web App', 'A real-time analytics dashboard for SaaS companies to track MRR, churn, and user growth with interactive charts and exportable reports.', NULL, 'MetricFlow', ARRAY['React', 'PostgreSQL', 'Tailwind'], true),
  ('D2C Skincare Launch', 'Landing Page', 'High-converting product launch page with animated hero, testimonial carousel, and integrated checkout that drove a 3x ROAS.', NULL, 'Lumina Skin', ARRAY['Next.js', 'Stripe', 'Framer Motion'], true),
  ('B2B Lead Gen Engine', 'Web App', 'Automated lead generation and qualification pipeline with CRM sync, email sequences, and a custom scoring algorithm.', NULL, 'PipelinePro', ARRAY['React', 'Supabase', 'TypeScript'], true),
  ('Restaurant Ordering System', 'E-commerce', 'Full-stack online ordering platform with real-time kitchen tickets, table reservations, and contactless payments.', NULL, 'Tavola', ARRAY['React', 'PostgreSQL', 'Stripe'], false),
  ('Fitness App Redesign', 'Web App', 'Complete UX overhaul and progressive web app rebuild for a fitness coaching platform, improving session completion by 40%.', NULL, 'FitForge', ARRAY['React', 'Tailwind', 'PWA'], false),
  ('Corporate Portfolio', 'Landing Page', 'A sleek corporate website for a consulting firm with case studies, team bios, and a blog CMS.', NULL, 'Northwind Consulting', ARRAY['Next.js', 'Sanity', 'Tailwind'], false)
ON CONFLICT DO NOTHING;
