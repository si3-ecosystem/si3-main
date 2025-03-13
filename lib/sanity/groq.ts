import { groq } from "next-sanity";

export const getAll = groq`*[]`;

export const seoData = groq`*[_type == 'utils'][0]`;

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
