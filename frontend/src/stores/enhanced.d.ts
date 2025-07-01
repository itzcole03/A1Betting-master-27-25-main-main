export interface UserStateData {
  id: string,`n  name: string;,`n  email: string,`n  preferences: {,`n  theme: 'light' | 'dark',`n  notifications: boolean};}
export interface UserState {
  data: UserStateData,`n  validation: {,`n  isValid: boolean,`n  errors: string[0]};
  metrics: {,`n  updateCount: number;,`n  errorCount: number,`n  lastUpdate: string | null};}
export interface UserStore extends UserState {
  setState: (updater: (state: UserState) => UserState) => void}
export declare const useUserStore: import('zustand').UseBoundStore<
  Omit<
    Omit<
      Omit<import('zustand').StoreApi<UserStore>, 'persist'> & {
        persist: {,`n  setOptions: (,`n  options: Partial<
              import('zustand/middleware').PersistOptions<
                UserStore,
                {
                  data: UserStateData,`n  version: string}
              >
            >
          ) => void;
          clearStorage: () => void,`n  rehydrate: () => Promise<void> | void;,`n  hasHydrated: () => boolean,`n  onHydrate: (fn: (state: UserStore) => void) => () => void,`n  onFinishHydration: (fn: (state: UserStore) => void) => () => void,`n  getOptions: () => Partial<
            import('zustand/middleware').PersistOptions<
              UserStore,
              {
                data: UserStateData,`n  version: string}
            >
          >;};},
      'setState' | 'devtools'
    > & {
      setState(
        partial:
          | UserStore
          | Partial<UserStore>
          | ((state: UserStore) => UserStore | Partial<UserStore>),
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
        state: UserStore | ((state: UserStore) => UserStore),
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
    'setState'
  > & {
    setState(
      nextStateOrUpdater:
        | UserStore
        | Partial<UserStore>
        | ((state: import('immer').WritableDraft<UserStore>) => void),
      shouldReplace?: false,
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
      nextStateOrUpdater: UserStore | ((state: import('immer').WritableDraft<UserStore>) => void),
      shouldReplace: true,
      action?:
        | (
            | string
            | {
                [x: string]: unknown;
                [x: number]: unknown;
                [x: symbol]: unknown,`n  type: string}
          )
        | undefined
    ): void;}
>;


`
