import { groq } from "next-sanity";

export const getAll = groq`*[]`;

export const seoData = groq`*[_type == 'utils'][0]`;

export const homepageQuery = groq`
  *[_type == "homepageSchema"][0] {
    _id,
    title,
    image {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt,
    },
    communityPartners[]-> {
      _id,
      name,
      type,
      logo {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background,
        alt,
      },
    },
     educationPartners[]-> {
      _id,
      name,
      type,
      logo {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background,
        alt,
      },
    },
  }
`;

export const scholarsQuery = groq`
*[_type == "scholarsSchema"][0] {
  _id,
  introduction-> {
  ...,
 thumbnail {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
  },
  title,
  description,
  courses[]-> {
    _id,
    title,
    description,
    thumbnail {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
    video {
      "url": asset->url
    },
    company->,
    presenters[]->
  },
  community_title,
  community_description,
  communities[]-> {
    _id,
    published,
    order,
    communityLogo {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background
    },
    communityName,
    communityLocation,
    communityType,
    communityDescription,
    communityWebsite,
    communityLeaderName,
    communityLeaderEmail,
    xHandle,
    warpastHandle,
    discover
  },
  video {
    "videoUrl": videoFile.asset->url,
    title,
    ctaLink,
    ctaTitle
  }
}
`;

export const guidesQuery = groq`
*[_type == "guidesSchema"][0] {
  _id,
   introduction-> {
  ...,
 thumbnail {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
  },
  web3brands->,
  members_title,
  members_description,
  members[]-> {
    _id,
    name,
    date,
    description,
    country,
    position,
    hobbies,
    image {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
    email,
    link
  },
  programming_title,
  programming_description,
  programming[]-> {
    _id,
    date,
    image {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
    title,
    description,
    presenters[]-> {
    ...,
      _id,
      name,
      image {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background
      }
    }
  },
  testimonials[]-> {
    _id,
    excerpt,
    description,
    image {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
    name,
    title,
    companyName,
    link,
    companyLogo {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    }
  },
  video {
    "videoUrl": videoFile.asset->url,
    title,
    ctaLink,
    ctaTitle
  }
}
`;

export const partnersQuery = groq`
*[_type == "partnersSchema"][0] {
  _id,
  introduction-> {
  ...,
 thumbnail {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
  },
  title,
  explore[]-> {
    _id,
    title,
    description,
    subTitle,
    ctaText,
    ctaLink,
    image {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    }
  },
  testimonials[]-> {
    _id,
    excerpt,
    description,
    image {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
    companyName,
    link
  },
  video {
    "videoUrl": videoFile.asset->url,
    title,
    ctaLink,
    ctaTitle
  }
}
`;

export const aboutQuery = groq`
*[_type == "aboutSchema"][0] {
  _id,
   about_hero-> {
   heroVideo {
    "videoUrl": videoFile.asset->url,
    title,
    ctaLink,
    ctaTitle
  },
  title,
  description,
  image {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
  },
  our_purpose_title,
  our_purpose_description,
  purposes[]-> {
    _id,
    title,
    description, 
    image {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
  },
  testimonial {
    quote,
    sourceUrl,
    sourceTitle,
    author,
    image {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
  },
  members[]-> {
    _id,
    name, 
    position,
    hobbies,
    image {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
    email,
    link
  },
  timeline-> {
    _id,
    title,
    timelineItems[] {
      year,
      subtitle,
      content,
      isActive
    }
  },
  video {
    "videoUrl": videoFile.asset->url,
    title,
    ctaLink,
    ctaTitle
  }
}
`;

export const onboardQuery = groq`
  *[_type == "onboardSchema"][0] {
  ...,
    _id,
    title,
    "onboard_materials": onboard_materials[]-> {
      _id,
      title,
      description,
      membership,
      ctaText,
      ctaLink,
      isButton,
      buttonModeFields {
        buttonText,
        buttonUrl,
      },
      thumbnail {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background,
        alt,
      },
    },
  }
`;
export const aboutIntroQuery = groq`
  *[_type == "aboutPageIntro"][0] {
    _id,
    title,
    description,
    ctaText,
    ctaLink,
    image {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background,
        alt,
      },
  }
`;
