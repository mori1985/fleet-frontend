// MapSection.tsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, Typography } from '@mui/material';
import { Vehicle, LatLngExpression } from '../types';

interface MapSectionProps {
  center: LatLngExpression;
  filteredVehicles: Vehicle[];
  selectedPath: LatLngExpression[];
  fetchHistory: (id: number) => void;
  mapRef: React.MutableRefObject<any>;
}

const MapSection: React.FC<MapSectionProps> = ({ center, filteredVehicles, selectedPath, fetchHistory, mapRef }) => {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

const getVehicleIcon = (status?: string) => {
  const color = status === 'moving' ? '#4CAF50' : status === 'stopped' ? '#F44336' : '#FFC107';
  return L.divIcon({
    className: 'blinking-car',
    html: `
      <svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <style>
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          .car { fill: ${color}; animation: blink 1.5s infinite; }
        </style>
        <path class="car" d="M16 36h32l4-12H12l4 12zm-4-16h40l6 16H6l6-16zm2 20h36v4H14v-4zm4 8h24v4H18v-4z"/>
        <circle cx="20" cy="52" r="6" fill="#333"/>
        <circle cx="44" cy="52" r="6" fill="#333"/>
      </svg>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Live Map
        </Typography>
        <MapContainer center={center} zoom={13} style={{ height: 450, width: '100%' }} ref={mapRef}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredVehicles.map(v => (
            <Marker key={v.id} position={[v.lat, v.lng]} icon={getVehicleIcon(v.status)} eventHandlers={{ mouseover: () => fetchHistory(v.id) }}>
              <Popup>
                {v.name}<br />
                Driver: {v.driver_name}<br />
                Status: {v.status}<br />
                Last Update: {new Date(v.updated_at).toLocaleString()}
              </Popup>
            </Marker>
          ))}
          {selectedPath.length > 0 && <Polyline positions={selectedPath} color="#1976d2" weight={4} />}
        </MapContainer>
      </CardContent>
    </Card>
  );
};

export default MapSection;
