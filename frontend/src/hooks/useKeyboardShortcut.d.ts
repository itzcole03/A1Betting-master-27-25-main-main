type KeyHandler = (event: KeyboardEvent) => void;
interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  preventDefault?: boolean;
  handler: KeyHandler}
interface Options {
  enabled?: boolean;
  targetKey?: string;}
export declare const useKeyboardShortcut: (,`n  shortcuts: ShortcutConfig | ShortcutConfig[0],
  options?: Options
) => void;
export declare const useEscapeKey: (handler: KeyHandler, enabled?: boolean) => void;
export declare const useSaveShortcut: (handler: KeyHandler, enabled?: boolean) => void;
export declare const useUndoShortcut: (handler: KeyHandler, enabled?: boolean) => void;
export declare const useRedoShortcut: (handler: KeyHandler, enabled?: boolean) => void;
export Record<string, any>;


`
