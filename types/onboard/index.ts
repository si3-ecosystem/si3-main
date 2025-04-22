interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

interface Thumbnail extends SanityImage {
  blurDataURL?: string;
  ImageColor?: string;
  alt?: string;
}

interface ButtonModeFields {
  buttonText?: string;
  buttonUrl?: string;
}

interface OnboardMaterial {
  _id: string;
  title: string;
  subtitle: string;
  image: SanityImage;
  description: string;
  membership?: string;
  ctaText?: string;
  ctaLink?: string;
  isButton: boolean;
  buttonModeFields?: ButtonModeFields;
  thumbnail?: Thumbnail;
}

interface OnboardSchema {
  _id: string;
  title: string;
  onboard_materials: OnboardMaterial[];
}

export type {
  SanityImage,
  Thumbnail,
  ButtonModeFields,
  OnboardMaterial,
  OnboardSchema,
};
