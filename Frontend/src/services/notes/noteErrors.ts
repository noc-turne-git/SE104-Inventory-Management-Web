import { isAxiosError } from 'axios';

export const getErrorMessage = (err: unknown, fallback: string) => {
  if (!isAxiosError(err)) return fallback;
  return err.response?.data?.message || fallback;
};
