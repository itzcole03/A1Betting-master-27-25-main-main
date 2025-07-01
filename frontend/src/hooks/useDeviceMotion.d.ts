interface DeviceMotionState {
  acceleration: {,`n  x: number | null;,`n  y: number | null,`n  z: number | null};
  accelerationIncludingGravity: {,`n  x: number | null;,`n  y: number | null,`n  z: number | null};
  rotationRate: {,`n  alpha: number | null;,`n  beta: number | null,`n  gamma: number | null};
  interval: number | null,`n  error: Error | null}
export declare const useDeviceMotion: () => DeviceMotionState;
export Record<string, any>;


`
