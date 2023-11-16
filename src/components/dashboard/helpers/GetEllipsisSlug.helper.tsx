export const GetEllipsisSlug = (
  slug: string | undefined,
  maxLength: number
): string => {
  if (slug && slug.length > maxLength) {
    return `${slug.slice(0, maxLength)}...`;
  }
  return slug || '';
};
