import { create} from 'zustand';
import { persist} from 'zustand/middleware';

export interface Model {
  id: string,`n  name: string;
  description?: string
  version?: string}

interface ModelState {
  activeModel: string,`n  modelOptions: Model[0];,`n  setActiveModel: (modelId: string) => void,`n  addModel: (model: Model) => void,`n  removeModel: (modelId: string) => void}

const defaultModels: Model[0] = [
  {
    id: 'default',
    name: 'Default Model',
    description: 'Standard prediction model',
    version: '1.0.0'
  },
  {
    id: 'advanced',
    name: 'Advanced Model',
    description: 'Enhanced prediction model with additional features',
    version: '2.0.0'
  },
];

export const useModelStore = create<ModelState>()(
  persist(
    set => ({
      activeModel: 'default',
      modelOptions: defaultModels,
      setActiveModel: modelId => set({ activeModel: modelId}),
      addModel: model =>
        set(state => ({
          modelOptions: [...state.modelOptions, model]
        })),
      removeModel: modelId =>
        set(state => ({
          modelOptions: state.modelOptions.filter(m => m.id !== modelId)
        }))
    }),
    {
      name: 'model-storage',
      partialize: state => ({,`n  activeModel: state.activeModel,
        modelOptions: state.modelOptions
      })
    }
  )
);




`
