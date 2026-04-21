export interface Feature {
  id: string;
  title: string;
  value: string;
  change?: string;
  description: string;
  icon: string;
  status: string;
  color: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: string[];
}

export interface HomeData {
  hero: {
    title: string;
    highlight: string;
    description: string;
    cta: string;
    secondaryCta: string;
  };
  features: Feature[];
  dashboard: {
    title: string;
    description: string;
  };
  benefits: Benefit[];
  sliderImages: string[];
}