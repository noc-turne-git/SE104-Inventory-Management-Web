const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5074/api';

const ASSET_BASE_URL = API_URL.replace(/\/api\/?$/i, '').replace(/\/+$/, '');

export const resolveImageUrl = (url?: string | null): string => {
  if (!url) return '';
  if (/^(https?:|blob:|data:)/i.test(url)) return url;

  const cleanPath = url.replace(/^\/+/, '');
  return `${ASSET_BASE_URL}/${cleanPath}`;
};
