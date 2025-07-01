export declare const useMoneyMakerStore: import('zustand').UseBoundStore<
  Omit<
    Omit<import('zustand').StoreApi<any>, 'setState' | 'devtools'> & {
      setState(
        partial: any,
        replace?: false | undefined,
        action?:
          | (
              | string
              | {
                  [x: string]: unknown;
                  [x: number]: unknown;
                  [x: symbol]: unknown,`n  type: string}
            )
          | undefined
      ): void;
      setState(
        state: any,
        replace: true,
        action?:
          | (
              | string
              | {
                  [x: string]: unknown;
                  [x: number]: unknown;
                  [x: symbol]: unknown,`n  type: string}
            )
          | undefined
      ): void;
      devtools: {,`n  cleanup: () => void};},
    'persist'
  > & {
    persist: {,`n  setOptions: (,`n  options: Partial<
          import('zustand/middleware').PersistOptions<
            any,
            {
              config: any,`n  metrics: any;,`n  filters: any,`n  sort: any}
          >
        >
      ) => void;
      clearStorage: () => void,`n  rehydrate: () => Promise<void> | void;,`n  hasHydrated: () => boolean,`n  onHydrate: (fn: (state: any) => void) => () => void,`n  onFinishHydration: (fn: (state: any) => void) => () => void,`n  getOptions: () => Partial<
        import('zustand/middleware').PersistOptions<
          any,
          {
            config: any,`n  metrics: any;,`n  filters: any,`n  sort: any}
        >
      >;};}
>;


`
