export type Project = {
  id: string; owner_id: string; title: string; synopsis: string;
  format: 'film' | 'series' | 'book'; stage: 'idea' | 'in_development' | 'completed';
  genres: string[]; themes: string[]; countries: string[]; languages: string[];
  territories: string[]; looking_for: string[]; budget: number | null; currency: string;
  funding_notes: string; visibility: 'public' | 'private'; ownership_declared: boolean;
  created_at: string; demo?: boolean; image?: string;
}
export type Profile = { id: string; display_name: string; role: 'creator' | 'industry' | 'company'; bio: string; country: string; languages: string[]; interests: string[]; acquisition_criteria: string; territories: string[] }
