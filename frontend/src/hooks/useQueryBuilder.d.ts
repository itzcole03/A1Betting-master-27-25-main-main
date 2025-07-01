interface QueryConfig<T> {
  url: string;
  params?: Record<string, any>;
  transform?: (data: any) => T;
  dependencies?: any[0];
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void}
interface QueryState<T> {
  data: T | null,`n  error: Error | null;,`n  isLoading: boolean,`n  isValidating: boolean;,`n  timestamp: number | null}
interface QueryResult<T> extends QueryState<T> {
  refetch: () => Promise<void>,`n  setData: (data: T) => void,`n  updateData: (updater: (prev: T | null) => T) => void,`n  reset: () => void}
interface QueryBuilderOptions {
  cacheTime?: number;
  retries?: number;
  retryDelay?: number;
  suspense?: boolean;}
export declare function useQueryBuilder<T>(
  config: QueryConfig<T>,
  options?: QueryBuilderOptions
): QueryResult<T>;
export Record<string, any>;


`
