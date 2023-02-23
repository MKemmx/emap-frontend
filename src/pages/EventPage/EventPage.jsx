import React, { useState } from 'react';
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
  Link,
  Tooltip,
  IconButton,
} from '@mui/material';
import { AiOutlineSearch, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

// Day JS
import dayjs from 'dayjs';

// Hooks
import useFetch from '../../hooks/useFetch';

// components
import Iconify from '../../components/iconify';
import EventPageModal from './EventPageModal';

const ExpandableCell = ({ value }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Box sx={{ py: 1.5 }}>
      {expanded ? value : value.slice(0, 200)}&nbsp;
      {value.length > 200 && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
          style={{ color: '#0d6efd', textDecoration: 'none' }}
          type="button"
          component="button"
          sx={{ fontSize: 'inherit' }}
          onClick={() => setExpanded(!expanded)}
        >
          {/* {expanded ?  : ' view more'} */}

          {expanded ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '5px' }}>view less </span>
              <BsChevronUp />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '5px' }}>view more </span>
              <BsChevronDown />
            </Box>
          )}
        </Link>
      )}
    </Box>
  );
};

// ----------------------------------------------------------------------
export default function EventPage() {
  const [pageSize, setPageSize] = useState(10);

  // Hook Data
  const { data, loading, error, handleSearch, searchedText, reFetchData, handleDelete } = useFetch('event');

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

  // ----------------------------------------------------------------------
  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      minWidth: 50,
    },
    {
      field: 'date',
      headerName: 'Date',
      minWidth: 150,
      flex: 1,
      editable: false,
      renderCell: ({ row }) => {
        return <>{dayjs(row.date).format('L LT')}</>;
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 1,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 150,
      flex: 1,
      editable: false,
      renderCell: (params) => <ExpandableCell {...params} />,
    },
    {
      field: '',
      headerName: 'Actions',
      minWidth: 110,
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

            <Tooltip
              onClick={() => {
                handleDelete('event', row._id);
              }}
              title="Delete"
            >
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
        <EventPageModal
          closeModal={closeModal}
          openAddModal={openAddModal}
          editData={editData}
          reFetchData={reFetchData}
        />
      )}

      <Helmet>
        <title> Event </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Event
          </Typography>
          <Button
            onClick={() => {
              setOpenAddModal(true);
            }}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Event
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
              getEstimatedRowHeight={() => 100}
              getRowHeight={() => 'auto'}
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
