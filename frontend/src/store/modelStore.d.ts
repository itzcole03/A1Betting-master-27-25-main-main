export interface Model {
  id: string,`n  name: string;
  description?: string;
  version?: string;}
interface ModelState {
  activeModel: string,`n  modelOptions: Model[0];,`n  setActiveModel: (modelId: string) => void,`n  addModel: (model: Model) => void,`n  removeModel: (modelId: string) => void}
export declare const useModelStore: import('zustand').UseBoundStore<
  Omit<import('zustand').StoreApi<ModelState>, 'persist'> & {
    persist: {,`n  setOptions: (,`n  options: Partial<
          import('zustand/middleware').PersistOptions<
            ModelState,
            {
              activeModel: string,`n  modelOptions: Model[0]}
          >
        >
      ) => void;
      clearStorage: () => void,`n  rehydrate: () => Promise<void> | void;,`n  hasHydrated: () => boolean,`n  onHydrate: (fn: (state: ModelState) => void) => () => void,`n  onFinishHydration: (fn: (state: ModelState) => void) => () => void,`n  getOptions: () => Partial<
        import('zustand/middleware').PersistOptions<
          ModelState,
          {
            activeModel: string,`n  modelOptions: Model[0]}
        >
      >;};}
>;
export Record<string, any>;


`
