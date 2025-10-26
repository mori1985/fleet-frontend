import React, { useEffect, useState, useRef, useMemo } from "react";
import { Container } from "@mui/material"; // فقط Container نگه داشتیم
import Navbar from "./components/Navbar";
import FilterSection from "./components/FilterSection";
import KPISection from "./components/KPISection";
import MapSection from "./components/MapSection";
import TableSection from "./components/TableSection";
import ReportsSection from "./components/ReportsSection";
import PerformanceSection from "./components/PerformanceSection";
import { Vehicle, LatLngExpression } from "./types";

const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const mapRef = useRef<any>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // دیتای هاردکد با لوکیشن‌های واقعی
  useEffect(() => {
    const initialVehicles: Vehicle[] = [
      { id: 1, name: 'Mercedes-Benz S-Class', lat: 52.518278, lng: 13.410108, status: 'moving', speed: 60, distance: 150, driverName: 'Hans Müller', driverId: 'DE123456', cargo: 'Electronics', fuelConsumption: 8.5, vehicleClass: 'Luxury' },
      { id: 2, name: 'BMW X5', lat: 52.517287, lng: 13.394012, status: 'moving', speed: 55, distance: 200, driverName: 'Sophie Weber', driverId: 'DE789012', cargo: 'Furniture', fuelConsumption: 9.2, vehicleClass: 'SUV' },
      { id: 3, name: 'Audi A4', lat: 52.531737, lng: 13.389654, status: 'moving', speed: 45, distance: 180, driverName: 'Thomas Schmidt', driverId: 'DE345678', cargo: 'Food Supplies', fuelConsumption: 7.8, vehicleClass: 'Sedan' },
      { id: 4, name: 'Volkswagen Golf', lat: 52.553917, lng: 13.411684, status: 'moving', speed: 50, distance: 130, driverName: 'Anna Fischer', driverId: 'DE901234', cargo: 'Textiles', fuelConsumption: 6.5, vehicleClass: 'Compact' },
      { id: 5, name: 'Porsche Cayenne', lat: 52.569204, lng: 13.400936, status: 'moving', speed: 65, distance: 220, driverName: 'Lukas Becker', driverId: 'DE567890', cargo: 'Machinery', fuelConsumption: 10.0, vehicleClass: 'SUV' },
      { id: 6, name: 'Opel Astra', lat: 52.580578, lng: 13.401825, status: 'moving', speed: 40, distance: 190, driverName: 'Klara Hoffmann', driverId: 'DE112233', cargo: 'Clothing', fuelConsumption: 6.8, vehicleClass: 'Compact' },
      { id: 7, name: 'Ford Focus', lat: 52.596604, lng: 13.368581, status: 'moving', speed: 55, distance: 160, driverName: 'Paul Schneider', driverId: 'DE445566', cargo: 'Groceries', fuelConsumption: 7.0, vehicleClass: 'Sedan' },
      { id: 8, name: 'Toyota Corolla', lat: 52.598912, lng: 13.381817, status: 'moving', speed: 60, distance: 140, driverName: 'Julia Krause', driverId: 'DE778899', cargo: 'Tools', fuelConsumption: 6.2, vehicleClass: 'Compact' },
      { id: 9, name: 'Honda Civic', lat: 52.598143, lng: 13.402970, status: 'moving', speed: 50, distance: 170, driverName: 'Markus Vogel', driverId: 'DE001122', cargo: 'Electronics', fuelConsumption: 6.9, vehicleClass: 'Sedan' },
      { id: 10, name: 'Hyundai Tucson', lat: 52.595898, lng: 13.390058, status: 'moving', speed: 45, distance: 210, driverName: 'Sabine Lehmann', driverId: 'DE334455', cargo: 'Furniture', fuelConsumption: 8.0, vehicleClass: 'SUV' },
      { id: 11, name: 'Skoda Octavia', lat: 52.591739, lng: 13.383897, status: 'stopped', speed: 0, distance: 130, driverName: 'Stefan König', driverId: 'DE667788', cargo: 'Food Supplies', fuelConsumption: 7.3, vehicleClass: 'Sedan' },
      { id: 12, name: 'Peugeot 3008', lat: 52.597222, lng: 13.378356, status: 'stopped', speed: 0, distance: 150, driverName: 'Claudia Meier', driverId: 'DE990011', cargo: 'Textiles', fuelConsumption: 8.1, vehicleClass: 'SUV' },
      { id: 13, name: 'Renault Clio', lat: 52.615059, lng: 13.299932, status: 'stopped', speed: 0, distance: 170, driverName: 'Peter Schulz', driverId: 'DE223344', cargo: 'Machinery', fuelConsumption: 6.4, vehicleClass: 'Compact' },
      { id: 14, name: 'Citroën C4', lat: 52.618132, lng: 13.307414, status: 'stopped', speed: 0, distance: 140, driverName: 'Ingrid Wagner', driverId: 'DE556677', cargo: 'Clothing', fuelConsumption: 6.7, vehicleClass: 'Sedan' },
      { id: 15, name: 'Kia Sportage', lat: 52.620649, lng: 13.313514, status: 'stopped', speed: 0, distance: 160, driverName: 'Ralf Braun', driverId: 'DE889900', cargo: 'Groceries', fuelConsumption: 8.3, vehicleClass: 'SUV' },
      { id: 16, name: 'Mazda CX-5', lat: 52.623986, lng: 13.303163, status: 'idle', speed: 5, distance: 180, driverName: 'Ursula Schmidt', driverId: 'DE112233', cargo: 'Tools', fuelConsumption: 7.9, vehicleClass: 'SUV' },
      { id: 17, name: 'Nissan Qashqai', lat: 52.626101, lng: 13.280606, status: 'idle', speed: 5, distance: 200, driverName: 'Dirk Hoffmann', driverId: 'DE445566', cargo: 'Electronics', fuelConsumption: 7.5, vehicleClass: 'Compact' },
      { id: 18, name: 'Suzuki Vitara', lat: 52.630213, lng: 13.195960, status: 'idle', speed: 5, distance: 220, driverName: 'Monika Fischer', driverId: 'DE778899', cargo: 'Furniture', fuelConsumption: 8.2, vehicleClass: 'SUV' },
      { id: 19, name: 'Mitsubishi Outlander', lat: 52.635598, lng: 13.207978, status: 'idle', speed: 5, distance: 190, driverName: 'Gregor Weber', driverId: 'DE001122', cargo: 'Food Supplies', fuelConsumption: 7.6, vehicleClass: 'SUV' },
      { id: 20, name: 'Jeep Cherokee', lat: 52.521696, lng: 13.388013, status: 'idle', speed: 5, distance: 210, driverName: 'Katrin Vogel', driverId: 'DE334455', cargo: 'Machinery', fuelConsumption: 8.4, vehicleClass: 'SUV' },
    ];
    setVehicles(initialVehicles);
  }, []);

  // آپدیت تصادفی دیتا هر 5 ثانیه
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => ({
          ...vehicle,
          speed: Math.floor(Math.random() * 80),
          distance: vehicle.distance + Math.random() * 10,
          status:
            Math.random() > 0.7
              ? Math.random() > 0.5
                ? "stopped"
                : "idle"
              : "moving",
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // فیلتر کردن دیتا با useMemo برای بهینه‌سازی
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(
      (v) =>
        (filterStatus === "all" || v.status === filterStatus) &&
        v.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vehicles, filterStatus, searchTerm]);

  const center: LatLngExpression = [52.5200, 13.4050];
  const activeVehiclesCount = filteredVehicles.filter(
    (v) => v.status === "moving"
  ).length;
  const totalVehicles = filteredVehicles.length;
  const totalDistanceValue = filteredVehicles.reduce((a, b) => a + b.distance, 0);

  return (
    <>
      <Navbar onNavigate={scrollToSection} />

      {/* Dashboard: KPI + Filter */}
      <section
        id="dashboard"
        className="py-16 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50"
      >
        <Container maxWidth="xl">
          <KPISection
            activeVehiclesCount={activeVehiclesCount}
            totalVehicles={totalVehicles}
            totalDistanceValue={totalDistanceValue}
          />
          <FilterSection
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Container>
      </section>

      {/* Map */}
      <section
        id="map"
        className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50"
      >
        <Container maxWidth="xl">
          <MapSection
            vehicles={filteredVehicles}
            center={center}
            mapRef={mapRef}
            fetchHistory={() => {}}
          />
        </Container>
      </section>

      {/* Vehicle List */}
      <section
        id="data-entry"
        className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      >
        <Container maxWidth="xl">
          <TableSection
            filteredVehicles={filteredVehicles}
            fetchHistory={() => {}}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Container>
      </section>

      {/* Reports */}
      <section
        id="reports"
        className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50"
      >
        <Container maxWidth="xl">
          <ReportsSection vehicles={filteredVehicles} />
        </Container>
      </section>

      {/* Performance */}
      <section
        id="performance"
        className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50"
      >
        <Container maxWidth="xl">
          <PerformanceSection vehicles={filteredVehicles} />
        </Container>
      </section>
    </>
  );
};

export default Dashboard;