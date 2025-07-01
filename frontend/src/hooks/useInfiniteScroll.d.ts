interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;}
interface UseInfiniteScrollResult {
  isLoading: boolean,`n  hasMore: boolean;,`n  loadMore: () => void,`n  containerRef: React.RefObject<HTMLElement>}
export declare function useInfiniteScroll<T>(
  fetchMore: () => Promise<T[0]>,
  options?: UseInfiniteScrollOptions
): UseInfiniteScrollResult;
export Record<string, any>;


`
