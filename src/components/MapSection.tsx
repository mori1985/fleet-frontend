import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Vehicle } from "../types";

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface MapSectionProps {
  vehicles: Vehicle[];
  center: [number, number];
  mapRef: React.RefObject<any>;
  fetchHistory: (id: number) => void;
}

const MapSection: React.FC<MapSectionProps> = ({ vehicles, center, mapRef, fetchHistory }) => {
  const createVehicleIcon = (status: string | undefined) => {
    const safeStatus = status || "idle";
    const color = safeStatus === "moving" ? "#10B981" : safeStatus === "stopped" ? "#EF4444" : "#F59E0B";
    const pulse = safeStatus === "moving" ? '<div class="pulse"></div>' : "";

    return L.divIcon({
      html: `
        <div style="position: relative; width: 40px; height: 40px;">
          ${pulse}
          <div style="
            background: ${color};
            width: 40px;
            height: 40px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 20px rgba(0,0,0,0.4);
            border: 4px solid white;
            transition: transform 0.3s ease;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16" style="transform: rotate(45deg);">
              <path d="M8 1a2 2 0 0 0-2 2v4H5V5H3v6h2v-2h1v4a2 2 0 0 0 4 0V9h1v2h2V5h-2v2h-1V3a2 2 0 0 0-2-2z"/>
            </svg>
          </div>
        </div>
        <style>
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { box-shadow: 0 0 0 25px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }
          .pulse {
            position: absolute;
            top: 0; left: 0; width: 40px; height: 40px;
            background: rgba(16, 185, 129, 0.4);
            border-radius: 50%;
            animation: pulse 2s infinite;
            z-index: -1;
          }
          .leaflet-marker-icon:hover div {
            transform: rotate(-45deg) scale(1.1);
          }
        </style>
      `,
      className: "",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  };

  return (
    <div style={{ height: "600px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[vehicle.lat, vehicle.lng]}
            icon={createVehicleIcon(vehicle.status)}
            eventHandlers={{
              click: () => fetchHistory(vehicle.id),
            }}
          >
            <Popup>
              <div style={{ 
                background: "linear-gradient(135deg, #1a1a2e, #16213e)", 
                color: "#C4B5FD", 
                padding: "15px", 
                borderRadius: "8px", 
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                maxWidth: "250px",
                fontFamily: '"Poppins", sans-serif'
              }}>
                <h3 style={{ color: "#A78BFA", fontWeight: 700, marginBottom: "10px" }}>{vehicle.name}</h3>
                <p><strong>Status:</strong> <span style={{ color: vehicle.status === "moving" ? "#10B981" : vehicle.status === "stopped" ? "#EF4444" : "#F59E0B" }}>{vehicle.status?.toUpperCase() || "UNKNOWN"}</span></p>
                <p><strong>Driver:</strong> {vehicle.driverName} (ID: {vehicle.driverId})</p>
                <p><strong>Vehicle Class:</strong> {vehicle.vehicleClass}</p>
                <p><strong>Cargo:</strong> {vehicle.cargo}</p>
                <p><strong>Distance Traveled:</strong> {vehicle.distance} km</p>
                <p><strong>Fuel Consumption:</strong> {vehicle.fuelConsumption} L/100km</p>
                <p><strong>Speed:</strong> {vehicle.speed} km/h</p>
                <p><strong>Last Update:</strong> {new Date().toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapSection;