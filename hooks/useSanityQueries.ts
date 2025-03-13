import { useQuery } from '@tanstack/react-query';
import { getScholarsData, getGuidesData, getPartnersData } from '@/lib/sanity/client';

// Query keys for caching
export const QUERY_KEYS = {
  SCHOLARS: 'scholars',
  GUIDES: 'guides',
  PARTNERS: 'partners',
};

export function useScholarsData() {
  return useQuery({
    queryKey: [QUERY_KEYS.SCHOLARS],
    queryFn: getScholarsData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useGuidesData() {
  return useQuery({
    queryKey: [QUERY_KEYS.GUIDES],
    queryFn: getGuidesData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function usePartnersData() {
  return useQuery({
    queryKey: [QUERY_KEYS.PARTNERS],
    queryFn: getPartnersData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
