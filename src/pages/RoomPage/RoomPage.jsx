import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DataGrid } from '@mui/x-data-grid';
// @mui
import { Card, Stack, Button, Container, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { AiOutlineSearch } from 'react-icons/ai';

// Hooks
import useFetch from '../../hooks/useFetch';

// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------
const columns = [
  {
    field: '_id',
    headerName: 'ID',
    minWidth: 50,
  },
  {
    field: 'buildingId.name',
    headerName: 'Building Name',
    minWidth: 150,
    flex: 1,
    editable: false,
    renderCell: ({ row }) => {
      return <>{row.buildingId.name}</>;
    },
  },
  {
    field: 'name',
    headerName: 'Room Name',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
  {
    field: 'marker',
    headerName: 'Marker Color',
    minWidth: 150,
    flex: 1,
    editable: false,
  },
];

// ----------------------------------------------------------------------
export default function RoomPage() {
  const [pageSize, setPageSize] = useState(10);

  // Hook Data
  const { data, loading, error, handleSearch, searchedText } = useFetch('room');

  return (
    <>
      <Helmet>
        <title> Room </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Room
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Room
          </Button>
        </Stack>

        <Card>
          <Box sx={{ width: '100%', maxWidth: 400, mt: 3, mb: 3, mx: 2 }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineSearch size={24} />
                  </InputAdornment>
                ),
              }}
              fullWidth
              placeholder="Search..."
              id="searchInput"
              onChange={handleSearch}
              value={searchedText}
            />
          </Box>

          <Box sx={{ height: 550 }}>
            <DataGrid
              loading={loading}
              getRowId={(row) => row._id}
              density="comfortable"
              rows={data}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              pagination
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection={false}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: false }}
            />
          </Box>
        </Card>
      </Container>
    </>
  );
}
