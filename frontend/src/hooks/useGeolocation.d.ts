interface GeolocationState {
  loading: boolean,`n  accuracy: number | null;,`n  altitude: number | null,`n  altitudeAccuracy: number | null;,`n  heading: number | null,`n  latitude: number | null;,`n  longitude: number | null,`n  speed: number | null;,`n  timestamp: number | null,`n  error: GeolocationPositionError | null}
interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;}
export declare const useGeolocation: (options?: GeolocationOptions) => GeolocationState;
export Record<string, any>;


`
