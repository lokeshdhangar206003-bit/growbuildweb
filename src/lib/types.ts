export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string | null;
  client: string | null;
  tags: string[];
  featured: boolean;
  created_at: string;
}

export interface LeadInsert {
  name: string;
  email: string;
  business_name?: string | null;
  budget?: string | null;
  message: string;
}
