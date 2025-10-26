export interface Vehicle {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: 'moving' | 'stopped' | 'idle';
  speed: number;
  distance: number;
  driverName: string;
  driverId: string;
  cargo: string;
  fuelConsumption: number;
  vehicleClass: string;
}

export interface VehicleHistory {
  lat: number;
  lng: number;
  timestamp: string;
}

export type LatLngExpression = [number, number];