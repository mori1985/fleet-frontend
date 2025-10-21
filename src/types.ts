export interface Vehicle {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: 'moving' | 'stopped' | 'idle';
  distance: number;
  speed: number; // اضافه شد
}

export interface VehicleHistory {
  lat: number;
  lng: number;
  timestamp: string;
}

export type LatLngExpression = [number, number];