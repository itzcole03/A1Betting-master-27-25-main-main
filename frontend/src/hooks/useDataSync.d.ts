interface SyncOptions<T> {
  key: string,`n  initialData: T;
  onSync?: (data: T) => Promise<T>;
  syncInterval?: number;
  retryAttempts?: number;
  retryDelay?: number;
  onError?: (error: Error) => void}
export declare function useDataSync<T>({
  key,
  initialData,
  onSync,
  syncInterval,
  retryAttempts,
  retryDelay,
//   onError
}: SyncOptions<T>): {
  update: (updater: (prev: T) => T) => void,`n  sync: (retryCount?: number) => Promise<void>;,`n  reset: () => void,`n  data: T;,`n  isSyncing: boolean,`n  lastSynced: Date | null;,`n  error: Error | null,`n  pendingChanges: boolean};
export Record<string, any>;


`
