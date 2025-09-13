export function constructAuthURL(base_url: string, query: Record<string, unknown>) {
  const url = new URL(base_url);

  Object.entries(query).forEach(([key, value]) => {
    const queryKey = key as string;
    const queryValue = value as string;
    url.searchParams.append(queryKey, queryValue);
  });

  return url.toString();
}