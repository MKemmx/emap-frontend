import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DataGrid } from '@mui/x-data-grid';
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
} from '@mui/material';
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

// Hooks
import useFetch from '../../hooks/useFetch';

// components
import Iconify from '../../components/iconify';
import RoomCoordinatePageModal from './RoomCoordinatePageModal';

// ----------------------------------------------------------------------
export default function RoomCoordinatePage() {
  const [pageSize, setPageSize] = useState(10);

  // Hook Data
  const { data, loading, error, handleSearch, searchedText, reFetchData } = useFetch('roomCoordinate');

  // Modal State
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Closing Modal Function
  const closeModal = () => {
    setOpenAddModal(false);
    setEditData(null);
  };

  // Handle Edit Data and Show Edit Modal
  const handleEditData = (data) => {
    setEditData(data);
  };

  // Columns
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      minWidth: 50,
    },
    {
      field: 'roomId.name',
      headerName: 'Room Name',
      minWidth: 150,
      flex: 1,
      editable: false,
      renderCell: ({ row }) => row.roomId.name,
    },
    {
      field: 'longitude',
      headerName: 'Longitude',
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: 'latitude',
      headerName: 'Latitude',
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: '',
      headerName: 'Actions',
      minWidth: 120,
      headerClassName: 'action-header',
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  handleEditData(row);
                }}
              >
                <AiOutlineEdit />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton>
                <AiOutlineDelete />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {(openAddModal || editData !== null) && (
        <RoomCoordinatePageModal
          closeModal={closeModal}
          openAddModal={openAddModal}
          editData={editData}
          reFetchData={reFetchData}
        />
      )}

      <Helmet>
        <title> Room Coordinate </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Room Coordinate
          </Typography>
          <Button
            onClick={() => {
              setOpenAddModal(true);
            }}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Room Coordinate
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
