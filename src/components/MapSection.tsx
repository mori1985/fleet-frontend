
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Vehicle, LatLngExpression } from '../types';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapSectionProps {
  center: LatLngExpression;
  filteredVehicles: Vehicle[];
  selectedPath: LatLngExpression[];
  fetchHistory: (id: number) => void;
  mapRef: React.RefObject<any>;
}

const MapSection: React.FC<MapSectionProps> = ({ center, filteredVehicles, selectedPath, fetchHistory, mapRef }) => {
  const createVehicleIcon = (status: string | undefined) => {
    const safeStatus = status || 'idle';
    const color = safeStatus === 'moving' ? '#10B981' : safeStatus === 'stopped' ? '#EF4444' : '#F59E0B';
    const pulse = safeStatus === 'moving' ? '<div class="pulse"></div>' : '';
    
    return L.divIcon({
      html: `
        <div style="position: relative; width: 32px; height: 32px;">
          ${pulse}
          <div style="
            background: ${color};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 3px solid white;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16" style="transform: rotate(45deg);">
              <path d="M8 1a2 2 0 0 0-2 2v4H5V5H3v6h2v-2h1v4a2 2 0 0 0 4 0V9h1v2h2V5h-2v2h-1V3a2 2 0 0 0-2-2z"/>
            </svg>
          </div>
        </div>
        <style>
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }
          .pulse {
            position: absolute;
            top: 0; left: 0; width: 32px; height: 32px;
            background: rgba(16, 185, 129, 0.4);
            border-radius: 50%;
            animation: pulse 2s infinite;
            z-index: -1;
          }
        </style>
      `,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  };

  return (
    <div style={{ height: '600px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {filteredVehicles.map(vehicle => (
          <Marker
            key={vehicle.id}
            position={[vehicle.lat, vehicle.lng]}
            icon={createVehicleIcon(vehicle.status)}
            eventHandlers={{
              click: () => fetchHistory(vehicle.id),
            }}
          >
            <Popup>
              <div className="text-center">
                <strong>{vehicle.name}</strong><br />
                Status: <span className={`font-bold ${
                  vehicle.status === 'moving' ? 'text-green-600' : 
                  vehicle.status === 'stopped' ? 'text-red-600' : 'text-amber-600'
                }`}>
                  {(vehicle.status || 'unknown').toUpperCase()}
                </span><br />
                Speed: {vehicle.speed} km/h<br />
                Distance: {vehicle.distance} km
              </div>
            </Popup>
          </Marker>
        ))}
        {selectedPath.length > 0 && (
          <Polyline positions={selectedPath} color="#3B82F6" weight={4} opacity={0.8} />
        )}
      </MapContainer>
    </div>
  );
};

export default MapSection;