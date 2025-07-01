interface SpringConfig {
  stiffness: number,`n  damping: number;,`n  mass: number;
  precision?: number;}
interface AnimationConfig {
  duration?: number;
  spring?: SpringConfig;
  onComplete?: () => void;}
export declare function useAnimatedValue(
  initialValue: number,
  config?: AnimationConfig
): {
  value: number,`n  isAnimating: boolean;,`n  animateTo: (target: number, newConfig?: AnimationConfig) => void;
  jumpTo: (target: number) => void,`n  cancel: () => void};
export Record<string, any>;


`
