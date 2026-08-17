export type Language = 'ar' | 'fr' | 'en';

export type Sector = 'education' | 'health' | 'water' | 'relief' | 'community';

export type CountryCode = 'mali' | 'burkina' | 'niger' | 'general';

export type ProjectStatus = 'planned' | 'in_progress' | 'completed' | 'planning' | 'in-progress';

export type Currency = 'USD' | 'EUR' | 'XOF' | 'SAR' | 'AED';

export type DonationFrequency = 'one-time' | 'monthly' | 'annual' | 'one_time' | 'yearly';

export interface ImpactStats {
  beneficiariesCount: number;
  projectsCount: number;
  countriesCount: number;
  volunteersCount: number;
  waterWellsCount: number;
  schoolsSupported: number;
  healthClinicsSupported: number;
  mealsDistributed: number;
}

export interface Campaign {
  id: string;
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  description: {
    ar: string;
    fr: string;
    en: string;
  };
  targetAmount: number; // in USD
  raisedAmount: number; // in USD
  currency?: Currency;
  country: CountryCode;
  city: string;
  sector: Sector;
  image: string;
  donorsCount: number;
  featured?: boolean;
  urgent?: boolean;
  startDate?: string;
  endDate?: string;
  status?: 'active' | 'completed' | 'paused';
}

export interface Project {
  id: string;
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  description: {
    ar: string;
    fr: string;
    en: string;
  };
  sector: Sector;
  country: CountryCode;
  city?: string;
  locationName?: string;
  status: ProjectStatus;
  progressPercentage?: number;
  beneficiariesTarget?: number;
  beneficiariesEstimated?: number;
  budgetUsd?: number;
  estimatedCost?: number;
  spentUsd?: number;
  startDate?: string;
  completionDate?: string;
  image: string;
  gallery?: string[];
  objectives?: string[];
  keyOutcomes?: {
    ar: string[];
    fr: string[];
    en: string[];
  };
}

export interface MaliRegion {
  id: string;
  name: {
    ar: string;
    fr: string;
    en: string;
  };
  description: {
    ar: string;
    fr: string;
    en: string;
  };
  historicalContext: {
    ar: string;
    fr: string;
    en: string;
  };
  image: string;
  activeInitiativesCount: number;
  coordinates: [number, number]; // [lat, lng]
}

export interface DonationTransaction {
  id: string;
  receiptNumber: string;
  amount: number;
  currency: Currency;
  amountUsdEquivalent?: number;
  frequency?: DonationFrequency;
  cause?: Sector | 'general';
  targetCountry?: CountryCode;
  campaignId?: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  donorCountry?: string;
  isAnonymous: boolean;
  paymentMethod: string;
  status?: 'completed' | 'pending' | 'failed';
  createdAt: string;
  transactionId?: string;
}

export type DonationRecord = DonationTransaction;

export interface DonationIntent {
  amount: number;
  currency: Currency;
  frequency: DonationFrequency;
  campaignId?: string;
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  message?: string;
  paymentMethod: string;
}

export interface TransparencyReport {
  id?: string;
  year: number;
  title?: {
    ar: string;
    fr: string;
    en: string;
  };
  auditor?: string;
  auditorName?: string;
  fileUrl?: string;
  totalDonationsReceivedUsd?: number;
  totalDonationsSpentUsd?: number;
  adminOverheadPercentage?: number;
  programExpenditurePercentage?: number;
  expenditureBySector?: {
    sector: Sector;
    percentage: number;
    amountUsd: number;
  }[];
  annualReportPdfUrl?: string;
  auditStatus?: 'certified' | 'in_review';
}

export interface Story {
  id: string;
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  excerpt: {
    ar: string;
    fr: string;
    en: string;
  };
  content: {
    ar: string;
    fr: string;
    en: string;
  };
  author: string;
  location: string;
  date: string;
  image: string;
  sector: Sector;
}

export interface NewsItem {
  id: string;
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  summary: {
    ar: string;
    fr: string;
    en: string;
  };
  content: {
    ar: string;
    fr: string;
    en: string;
  };
  date?: string;
  publishedAt?: string;
  location?: string;
  image: string;
  category: string;
  country?: CountryCode;
  featured?: boolean;
}

export type NewsArticle = NewsItem;

export interface GalleryItem {
  id: string;
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  type: 'image' | 'video';
  url: string;
  thumbnailUrl: string;
  sector: Sector;
  country: CountryCode;
  location: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city?: string;
  specialty?: 'medical' | 'education' | 'engineering' | 'logistics' | 'media';
  skills?: string;
  motivation?: string;
  sectorInterest?: Sector | 'media' | 'tech' | 'logistics' | 'fundraising' | 'fieldwork';
  experienceYears?: string;
  message?: string;
  createdAt?: string;
  submittedAt?: string;
  status?: 'pending' | 'reviewed' | 'accepted' | 'archived';
}

export interface Partner {
  id: string;
  name: string;
  category: 'international_ngo' | 'government' | 'corporate' | 'un_agency';
  logoPlaceholderText: string;
  country: string;
  website?: string;
}

export interface OrganizationSettings {
  nameAr: string;
  nameFr: string;
  nameEn: string;
  taglineAr: string;
  taglineFr: string;
  taglineEn: string;
  email: string;
  phone: string;
  whatsapp: string;
  addressBamako: string;
  addressNiamey: string;
  addressOuagadougou?: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
  currencyRates: {
    USD: number;
    EUR: number;
    XOF: number;
  };
  paymentGateways: {
    stripeEnabled: boolean;
    paypalEnabled: boolean;
    flutterwaveEnabled: boolean;
    paystackEnabled: boolean;
    orangeMoneyEnabled: boolean;
    waveEnabled: boolean;
    mockEnabled: boolean;
  };
}
