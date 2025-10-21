export interface Vehicle {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status?: string;
  distance: number;
  driver_name: string;
  driver_phone: string;
  updated_at: string;
}

export interface VehicleHistory {
  id: number;
  vehicle_id: number;
  lat: number;
  lng: number;
  timestamp: string;
}

export type LatLngExpression = [number, number];