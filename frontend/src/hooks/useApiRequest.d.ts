interface UseApiRequestOptions {
  cacheTime?: number;
  retries?: number;
  retryDelay?: number;
  onError?: (error: Error) => void;
  enabled?: boolean;}
export declare function useApiRequest<T>(
  url: string,
  {
    cacheTime, // 5 minutes;
    retries,
    retryDelay,
    onError,
//     enabled
  }?: UseApiRequestOptions
): {
  mutate: () => Promise<void>,`n  data: T | null;,`n  error: Error | null,`n  isLoading: boolean;,`n  isValidating: boolean};
export Record<string, any>;


`
