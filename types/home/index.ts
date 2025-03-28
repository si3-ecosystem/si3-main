// Common types
export interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  blurDataURL?: string;
  ImageColor?: string;
  alt?: string;
}

export interface ImpactMetric {
  _id: string;
  metricTitle: string;
  count: number;
}

interface Impact {
  title: string;
  metrics: ImpactMetric[];
}

export interface SanityVideo {
  videoUrl: string;
  title: string;
  ctaLink: string;
  ctaTitle: string;
}

// Scholars Data Types
export interface Community {
  _id: string;
  published: boolean;
  order: number;
  background: SanityImage;
  communityLogo: SanityImage;
  communityName: string;
  communityLocation: string;
  communityType: string[];
  communityDescription: string;
  communityWebsite: string;
  communityLeaderName: string;
  communityLeaderEmail: string;
  xHandle: string;
  linkedIn: string;
  discover: string;
}

export interface Introduction {
  _id: string;
  title: string;
  description: string;
  subtitle: string;
  thumbnail: SanityImage;
  ctaText: string;
  ctaLink: string;
  memberShip?: string;
}

export interface Web3Brand {
  _id: string;
  title: string;
  description?: string;
  gallery?: {
    galleryTitle: string;
    images?: SanityImage[];
  }[];
  video?: {
    _type: "file";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}

export interface Presenter {
  _id: string;
  name: string;
  image: SanityImage;
  position?: string;
  logo?: SanityImage;
}

export interface Company {
  _id: string;
  name: string;
  logo: SanityImage;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: SanityImage;
  video: {
    url: string;
  };
  company: Company;
  presenters: Presenter[];
}

export interface ScholarsData {
  _id: string;
  introduction: Introduction;
  title: string;
  image: SanityImage;
  description: string;
  courses: Course[];
  community_title: string;
  community_description: string;
  communities: Community[];
  video: SanityVideo;
}

// Guides Data Types
export interface Member {
  _id: string;
  name: string;
  date?: string;
  description?: string;
  country: string;
  position: string;
  hobbies: string[];
  image: SanityImage;
  email: string;
  link: string;
}

export interface ProgrammingEvent {
  _id: string;
  date: string;
  image: SanityImage;
  title: string;
  description: string;
  presenters: Presenter[];
}

export interface Testimonial {
  _id: string;
  excerpt?: string;
  description: string;
  image: SanityImage;
  name?: string;
  title?: string;
  companyName: string;
  link: string;
  companyLogo?: SanityImage;
}

export interface AboutIntroData {
  _id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: SanityImage;
}

export interface GuidesData {
  _id: string;
  title: string;
  description: string;
  image: SanityImage;
  introduction: Introduction;
  web3brands: Web3Brand;
  members_title: string;
  members_description: string;
  members: Member[];
  programming_title: string;
  programming_description: string;
  programming: ProgrammingEvent[];
  testimonials: Testimonial[];
  video: SanityVideo;
}

// Partners Data Types
export interface ExploreItem {
  _id: string;
  title: string;
  description: string;
  subTitle: string;
  ctaText: string;
  ctaLink: string;
  image: SanityImage;
}

export interface PartnersData {
  _id: string;
  title: string;
  description: string;
  image: SanityImage;
  introduction: Introduction;
  explore: ExploreItem[];
  testimonials: Testimonial[];
  video: SanityVideo;
}

export interface HomepageImage extends SanityImage {
  blurDataURL?: string;
  ImageColor?: string;
  alt?: string;
}

export interface Partner {
  _id: string;
  name: string;
  logo?: HomepageImage;
  type?: string;
}

export interface HomepageSchema {
  _id: string;
  title: string;
  impact: Impact;
  desc: string;
  ctaText: string;
  ctaLink: string;
  videoUrl: string;
  image: HomepageImage;
  educationPartners: Partner[];
  communityPartners: Partner[];
}
