// FilterSection.tsx
import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface FilterSectionProps {
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
}) => (
  <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
    <FormControl sx={{ minWidth: 140 }}>
      <InputLabel>Status</InputLabel>
      <Select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        sx={{ borderRadius: 12 }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="moving">Moving</MenuItem>
        <MenuItem value="stopped">Stopped</MenuItem>
        <MenuItem value="idle">Idle</MenuItem>
      </Select>
    </FormControl>
    <TextField
      label="Search Name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ flex: 1 }}
    />
  </Box>
);

export default FilterSection;
