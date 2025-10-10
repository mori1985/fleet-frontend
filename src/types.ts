export interface Vehicle {
       id: number;
       name: string;
       lat: number;
       lng: number;
       status: 'moving' | 'stopped' | 'idle';
       distance: number;
       updated_at: string;
     }