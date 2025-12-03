export function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      return apiUrl;
    }
  }
  return '';
}

export function getApiEndpoint(endpoint: string): string {
  const baseUrl = getApiUrl();
  if (baseUrl) {
    return `${baseUrl}${endpoint}`;
  }
  return endpoint;
}

