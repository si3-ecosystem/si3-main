import {
  apiVersion,
  dataset,
  projectId,
  useCdn,
  previewSecretId,
} from "./config";
import { postquery, getAll, seoData } from "./groq";
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

export async function getAllPosts() {
  if (client) {
    return (await client.fetch(postquery)) || [];
  }
  return [];
}
