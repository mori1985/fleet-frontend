
import React, { useEffect, useState, useRef } from 'react';
import { Container, Box } from '@mui/material';
import Navbar from './components/Navbar';
import FilterSection from './components/FilterSection';
import KPISection from './components/KPISection';
import MapSection from './components/MapSection';
import TableSection from './components/TableSection';
import ReportsSection from './components/ReportsSection';
import PerformanceSection from './components/PerformanceSection';
import { Vehicle, VehicleHistory, LatLngExpression } from './types';

const BACKEND_URL = 'http://localhost:3010';

const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPath, setSelectedPath] = useState<LatLngExpression[]>([]);

  const mapRef = useRef<any>(null);

  // اسکرول نرم
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // دریافت خودروها
  useEffect(() => {
    const fetchVehicles =	async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/vehicles`);
        if (!res.ok) throw new Error('Failed to fetch vehicles');
        const data = await res.json();
        setVehicles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // دریافت تاریخچه
  const fetchHistory = async (id: number) => {
    try {
      const res = await fetch(`${BACKEND_URL}/vehicles/${id}/history`);
      if (!res.ok) throw new Error('Failed to fetch history');
      const data = await res.json();
      setSelectedPath(data.map((h: VehicleHistory) => [h.lat, h.lng] as LatLngExpression));
    } catch (err) {
      console.error(err);
    }
  };

  const center: LatLngExpression = [52.5215, 13.4070];
  const activeVehiclesCount = vehicles.filter(v => v.status === 'moving').length;
  const totalVehicles = vehicles.length;
  const totalDistanceValue = vehicles.reduce((a, b) => a + b.distance, 0);
  const filteredVehicles = vehicles.filter(
    v =>
      (filterStatus === 'all' || v.status === filterStatus) &&
      v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <Box className="flex items-center justify-center h-screen text-xl font-medium text-gray-600">
      در حال بارگذاری...
    </Box>
  );
  if (error) return (
    <Box className="text-red-600 text-center mt-10 text-lg">
      خطا: {error}
    </Box>
  );

  return (
    <>
      <Navbar onNavigate={scrollToSection} />

      {/* Dashboard */}
      <section id="dashboard" className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <Container maxWidth="xl">
          <FilterSection
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <KPISection
            activeVehiclesCount={activeVehiclesCount}
            totalVehicles={totalVehicles}
            totalDistanceValue={totalDistanceValue}
          />
        </Container>
      </section>

      {/* Map */}
      <section id="map" className="py-16 bg-gray-50">
        <Container maxWidth="xl">
          <MapSection
            center={center}
            filteredVehicles={filteredVehicles}
            selectedPath={selectedPath}
            fetchHistory={fetchHistory}
            mapRef={mapRef}
          />
        </Container>
      </section>

      {/* Reports */}
      <section id="reports" className="py-16 bg-white">
        <Container maxWidth="xl">
          <ReportsSection vehicles={vehicles} />
        </Container>
      </section>

      {/* Performance */}
      <section id="performance" className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <Container maxWidth="xl">
          <PerformanceSection vehicles={vehicles} />
        </Container>
      </section>

      {/* Table (Data Entry) */}
      <section id="data-entry" className="py-16 bg-gray-100">
        <Container maxWidth="xl">
          <TableSection filteredVehicles={filteredVehicles} fetchHistory={fetchHistory} />
        </Container>
      </section>
    </>
  );
};

export default Dashboard;