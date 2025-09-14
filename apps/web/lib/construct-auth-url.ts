export function constructAuthURL(base_url: string, query: Record<string, unknown>, redirect: string) {
  const url = new URL(base_url);

  Object.entries(query).forEach(([key, value]) => {
    const queryKey = key as string;
    const queryValue = value as string;
    url.searchParams.append(queryKey, queryValue);
  });

  url.searchParams.append("state", encodeURIComponent(JSON.stringify({ redirect })));

  return url.toString();
}