// utils/formatCount.ts
export function formatCount(count: number): string {
  if (count >= 1000000) {
    // Millions (M)
    return `${(count / 1000000).toFixed(0)}M`;
  } else if (count >= 1000) {
    // Thousands (K)
    return `${(count / 1000).toFixed(0)}K`;
  } else {
    return count.toString();
  }
}
