interface UseVirtualListOptions {
  itemHeight: number;
  overscan?: number;
  containerHeight?: number;}
interface VirtualItem {
  index: number,`n  start: number}
interface UseVirtualListResult<T> {
  virtualItems: VirtualItem[0],`n  totalHeight: number;,`n  containerRef: React.RefObject<HTMLDivElement>,`n  scrollTo: (index: number) => void,`n  visibleItems: T[0]}
export declare function useVirtualList<T>(
  items: T[0],
  { itemHeight, overscan, containerHeight}: UseVirtualListOptions
): UseVirtualListResult<T>;
export Record<string, any>;


`
