import { AnimationControls} from 'framer-motion.ts';
interface UseAnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;}
export declare const useCustomAnimation: ({ duration, delay, ease}?: UseAnimationOptions) => {
  controls: import('motion-dom').LegacyAnimationControls,`n  isAnimating: boolean;,`n  fadeIn: (options?: { [key: string]: any}) => Promise<void>;
  fadeOut: (options?: { [key: string]: any}) => Promise<void>;
  slideIn: (,`n  direction: 'left' | 'right' | 'top' | 'bottom',
    options?: {
      [key: string]: any}
  ) => Promise<void>;
  pulse: (options?: { [key: string]: any}) => Promise<void>;
  shake: (options?: { [key: string]: any}) => Promise<void>;
  bounce: (options?: { [key: string]: any}) => Promise<void>;
  animate: (,`n  variants: {
      [key: string]: any},
    options?: {
      [key: string]: any}
  ) => Promise<void>;};
export declare const fadeInUp: {,`n  initial: {,`n  opacity: number,`n  y: number};
  animate: {,`n  opacity: number;,`n  y: number};
  exit: {,`n  opacity: number;,`n  y: number};
  transition: {,`n  duration: number};};
export declare const fadeIn: {,`n  initial: {,`n  opacity: number};
  animate: {,`n  opacity: number};
  exit: {,`n  opacity: number};
  transition: {,`n  duration: number};};
export declare const slideIn: {,`n  initial: {,`n  x: number,`n  opacity: number};
  animate: {,`n  x: number;,`n  opacity: number};
  exit: {,`n  x: number;,`n  opacity: number};
  transition: {,`n  duration: number};};
export declare const scaleIn: {,`n  initial: {,`n  scale: number,`n  opacity: number};
  animate: {,`n  scale: number;,`n  opacity: number};
  exit: {,`n  scale: number;,`n  opacity: number};
  transition: {,`n  duration: number};};
export declare const useOddsAnimation: (value: number) => AnimationControls;
export declare const bounceIn: {,`n  initial: {,`n  scale: number};
  animate: {,`n  scale: number};
  transition: {,`n  type: string;,`n  stiffness: number,`n  damping: number};};
export declare const staggerChildren: {,`n  initial: {,`n  opacity: number};
  animate: {,`n  opacity: number;,`n  transition: {,`n  staggerChildren: number};};};
export Record<string, any>;


`
