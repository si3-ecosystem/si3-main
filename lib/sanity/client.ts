import {
  apiVersion,
  dataset,
  projectId,
  useCdn,
  previewSecretId,
} from "./config";
import {
  getAll,
  seoData,
  scholarsQuery,
  guidesQuery,
  partnersQuery,
  aboutQuery,
  onboardQuery,
  homepageQuery,
  aboutIntroQuery,
  privacyPolicyQuery,
  termsAndConditionsQuery,
  membersPolicyQuery,
  cookiePolicyQuery,
} from "./groq";
import { createClient } from "next-sanity";

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables.",
  );
}

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;

export const previewClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: previewSecretId,
    })
  : null;

import { QueryParams } from "next-sanity";

type FetchParams = QueryParams | undefined;
type FetchQuery = string;

type FetchResult<T> = Promise<T[] | T | null>;

export const fetcher = async <T = unknown>([query, params]: [
  FetchQuery,
  FetchParams,
]): FetchResult<T> => {
  return client ? await client.fetch<T>(query, params || {}) : [];
};

(async () => {
  if (client) {
    const data = await client.fetch(getAll);
    if (!data || !data.length) {
      console.error(
        "Sanity returns empty array. Are you sure the dataset is public?",
      );
    }
  }
})();

export async function getSeoData() {
  if (client) {
    return (await client.fetch(seoData)) || {};
  }
  return {};
}

export async function getHomePageData() {
  if (client) {
    return (await client.fetch(homepageQuery)) || {};
  }
  return {};
}

export async function getScholarsData() {
  if (client) {
    return (await client.fetch(scholarsQuery)) || {};
  }
  return {};
}

export async function getGuidesData() {
  if (client) {
    return (await client.fetch(guidesQuery)) || {};
  }
  return {};
}

export async function getPartnersData() {
  if (client) {
    return (await client.fetch(partnersQuery)) || {};
  }
  return {};
}

export async function getAboutPageData() {
  if (client) {
    return (await client.fetch(aboutQuery)) || {};
  }
  return {};
}
export async function getOnboardPageData() {
  if (client) {
    return (await client.fetch(onboardQuery)) || {};
  }
  return {};
}
export async function getAboutIntroData() {
  if (client) {
    return (await client.fetch(aboutIntroQuery)) || {};
  }
  return {};
}

export async function getPrivacyPolicy() {
  if (client) {
    return (await client.fetch(privacyPolicyQuery)) || {};
  }
  return {};
}
export async function getTermsAndConditions() {
  if (client) {
    return (await client.fetch(termsAndConditionsQuery)) || {};
  }
  return {};
}
export async function getMembersPolicy() {
  if (client) {
    return (await client.fetch(membersPolicyQuery)) || {};
  }
  return {};
}
export async function getCookiePolicy() {
  if (client) {
    return (await client.fetch(cookiePolicyQuery)) || {};
  }
  return {};
}
