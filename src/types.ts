export interface Project {
  id: string;
  title: {
    es: string;
    en: string;
  };
  category: {
    es: string;
    en: string;
  };
  location: {
    es: string;
    en: string;
  };
  year: string;
  area: string;
  image: string;
  description: {
    es: string;
    en: string;
  };
  details: {
    es: { label: string; value: string }[];
    en: { label: string; value: string }[];
  };
  gallery: {
    facade: string;
    bathroom: string;
    bedroom: string;
    pool: string;
    living: string;
  };
}

export interface Service {
  id: string;
  title: {
    es: string;
    en: string;
    it: string;
    fr: string;
  };
  description: {
    es: string;
    en: string;
    it: string;
    fr: string;
  };
  icon: string;
  details: {
    es: string[];
    en: string[];
    it: string[];
    fr: string[];
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: {
    es: string;
    en: string;
    it: string;
    fr: string;
  };
  content: {
    es: string;
    en: string;
    it: string;
    fr: string;
  };
  avatar: string;
}

export type Language = 'es' | 'en' | 'it' | 'fr';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => any;
}

export type TranslationType = any;
