interface Review {
  comment: string;
  rating: number;
  reviewer: string;
}

export interface Psychologist {
  id: string;
  about: string;
  avatar_url: string;
  experience: number;
  initial_consultation: string;
  license: string;
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: Review[];
  specialization: string;
}

export interface ApiResponse {
  items: Psychologist[];
  nextCursor: string | null;
}

export type FilterSort = 'A-Z' | 'Z-A' | '<170$' | '>170$' | 'Popular' | 'NotPopular' | 'All';
