import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip, 
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Vehicle } from '../types';

interface TableSectionProps {
  filteredVehicles: Vehicle[];
  fetchHistory: (id: number) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const TableSection: React.FC<TableSectionProps> = ({ 
  filteredVehicles, 
  fetchHistory,
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'moving': return { bg: '#7C3AED', text: '#fff' };
      case 'stopped': return { bg: '#EC4899', text: '#fff' };
      case 'idle': return { bg: '#A78BFA', text: '#1a1a2e' };
      default: return { bg: '#6B7280', text: '#fff' };
    }
  };

  return (
    <Box sx={{ mb: 6, mt: 3 }}> {/* فاصله از نوبار */}
      <Card sx={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        border: '1px solid rgba(167, 139, 250, 0.2)',
        boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
        borderRadius: 3,
      }}>
        <CardContent sx={{ p: 3 }}>
          {/* عنوان + فیلترها */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              className="text-center font-bold mb-4"
              sx={{ 
                background: 'linear-gradient(to right, #7C3AED, #A78BFA, #EC4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              Vehicle List
            </Typography>

            {/* فیلترها */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <FormControl sx={{ minWidth: 140 }}>
                <InputLabel sx={{ color: '#A78BFA' }}>Status</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  sx={{ 
                    borderRadius: 12,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(167, 139, 250, 0.3)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#A78BFA' },
                    '& .MuiSvgIcon-root': { color: '#A78BFA' },
                    color: '#C4B5FD'
                  }}
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
                sx={{ 
                  flex: 1,
                  minWidth: 200,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 12,
                    color: '#C4B5FD',
                    '& fieldset': { borderColor: 'rgba(167, 139, 250, 0.3)' },
                    '&:hover fieldset': { borderColor: '#A78BFA' },
                    '&.Mui-focused fieldset': { borderColor: '#7C3AED' }
                  },
                  '& .MuiInputLabel-root': { color: '#A78BFA' },
                  '& .MuiSvgIcon-root': { color: '#A78BFA' }
                }}
              />
            </Box>
          </Box>

          {/* جدول */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#7C3AED' }}>
                  {['ID', 'Name', 'Status', 'Distance (km)'].map((header) => (
                    <TableCell key={header} sx={{ color: '#fff', fontWeight: 600 }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVehicles.map((v) => {
                  const status = getStatusColor(v.status || 'unknown');
                  return (
                    <TableRow 
                      key={v.id} 
                      onMouseEnter={() => fetchHistory(v.id)} 
                      sx={{ 
                        '&:hover': { backgroundColor: 'rgba(167, 139, 250, 0.1)' },
                        transition: 'background 0.2s'
                      }}
                    >
                      <TableCell sx={{ color: '#C4B5FD' }}>{v.id}</TableCell>
                      <TableCell sx={{ color: '#C4B5FD', fontWeight: 500 }}>{v.name}</TableCell>
                      <TableCell>
                        <Chip 
                          label={v.status || 'Unknown'} 
                          size="small"
                          sx={{ 
                            bgcolor: status.bg, 
                            color: status.text,
                            fontWeight: 600,
                            textTransform: 'capitalize'
                          }} 
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#C4B5FD' }}>{v.distance.toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TableSection;