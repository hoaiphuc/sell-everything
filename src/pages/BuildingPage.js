import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TextField,
} from '@mui/material';
import { Modal } from 'react-bootstrap';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuildings, removeBuilding, selectAllBuilding } from '../features/buildingSlice';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import FormDialog from './Popup/CreateBuildingModal';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'buildingId', label: 'Mã tòa', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function BuildingPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [isOpenCreateBuildingPopup, setIsOpenCreateBuildingPopup] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [valueTarget, setValueTarget] = useState();

  const buildings = useSelector(selectAllBuilding);
  
  useEffect(()=>{
    console.log('listbuildingxcccc: ', buildings);

  },[buildings])
  const dispatch = useDispatch();

  const handleOpenPopup = () => {
    setIsOpenCreateBuildingPopup(true);
  };

  const handleClosePopup = () => {
    setIsOpenCreateBuildingPopup(false);
  };
  // const posts = useSelector(selectAllPosts);
  const handleEdit = () => {
        // dispatch(removebuilding(valueTarget, buildingName, attribute));
        
    console.log("handleEdit: ", valueTarget);
  }
  const handleDelete = () => {
    dispatch(removeBuilding(valueTarget));
  }
  useEffect(() => {
    dispatch(fetchBuildings());
  }, [dispatch]);

  const handleOpenMenu = (event, id) => {
    setValueTarget(id)
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = buildings.map((n) => n.name);
      console.log("newSelecteds: ", newSelecteds)
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    console.log("id: ", id)
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - buildings.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> building | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            building
          </Typography>
          <FormDialog handleClose={handleClosePopup} handleClickOpen={handleOpenPopup}/>

        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={buildings.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {buildings.map((row) => {
                      const { id } = row;

                      const selectedUser = selected.indexOf(id) !== -1;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} />
                          </TableCell>

                          <TableCell align="left">
                            {' '}
                            <Typography variant="subtitle2" noWrap>
                              {id}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={(event)=> handleOpenMenu(event, id)}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={buildings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Modal
        open={isOpenCreateBuildingPopup}
        onClose={handleClosePopup}
        aria-labelledby="create-building-modal-title"
        aria-describedby="create-building-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: 1,
          }}
        >
          <Typography id="create-building-modal-title" variant="h6" gutterBottom>
            Create New building
          </Typography>
          <Typography id="create-building-modal-description" sx={{ mb: 2 }}>
            Fill out the form below to create a new building.
          </Typography>
          <Stack spacing={2}>
            <TextField label="building Name" variant="outlined" />
            {/* {row?.id} */}
            <Button variant="contained" onClick={handleClosePopup}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Create
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={(event)=> handleEdit(event)}>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }}/>
              Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}  onClick={(event)=> handleDelete(event)}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
        </MenuItem>
      </Popover>
    </>
  );
}
