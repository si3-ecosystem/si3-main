interface Purpose {
  _id: string;
  title: string;
  description: string;
  image: Image;
}

interface Presenter {
  _id: string;
  name: string;
  country: string;
  position: string;
  hobbies: string;
  image: Image;
  email: string;
  link: string;
}

interface TimelineItem {
  year: string;
  subtitle?: string;
  content: string;
  isActive: boolean;
}

interface TimelineSchema {
  _id: string;
  title: string;
  timelineItems: TimelineItem[];
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
  };
  blurDataURL?: string;
  ImageColor?: string;
  alt?: string;
}

interface Testimonial {
  quote: string;
  sourceUrl?: string;
  sourceTitle?: string;
  author: string;
  image: Image;
}

interface Video {
  videoUrl: string;
  title: string;
  ctaLink: string;
  ctaTitle: string;
}

interface Hero {
  title: string;
  description: string;
  image: Image;
}

interface AboutQuery {
  _id: string;
  about_hero: Hero;
  our_purpose_title: string;
  our_purpose_description: string;
  purposes: Purpose[];
  testimonial: Testimonial;
  members: Presenter[];
  timeline: TimelineSchema;
  video: Video;
}

export type {
  Hero,
  AboutQuery,
  Purpose,
  Presenter,
  TimelineItem,
  TimelineSchema,
  Image,
  Testimonial,
  Video,
};
