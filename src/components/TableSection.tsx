// TableSection.tsx
import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { Vehicle } from '../types';

interface TableSectionProps {
  filteredVehicles: Vehicle[];
  fetchHistory: (id: number) => void;
}

const TableSection: React.FC<TableSectionProps> = ({ filteredVehicles, fetchHistory }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Vehicle List
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Status</TableCell>
              <TableCell sx={{ color: '#fff' }}>Distance (km)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.map(v => (
              <TableRow key={v.id} onMouseEnter={() => fetchHistory(v.id)} sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' } }}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.name}</TableCell>
                <TableCell><Chip label={v.status || 'Unknown'} /></TableCell>
                <TableCell>{v.distance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

export default TableSection;
