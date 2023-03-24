import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
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
import { fetchCategories, removeCategory, selectAllCategory } from '../features/categorySlice';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import FormDialog from './Popup/CreateCategoryModal';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'categoryId', label: 'CategoryId', alignRight: false },
  { id: 'CategoryName', label: 'Category Name', alignRight: false },
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

export default function CategoryPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [isOpenCreateCategoryPopup, setIsOpenCreateCategoryPopup] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [valueTarget, setValueTarget] = useState();

  const categories = useSelector(selectAllCategory);
  
  const dispatch = useDispatch();

  const handleOpenPopup = () => {
    setIsOpenCreateCategoryPopup(true);
  };

  const handleClosePopup = () => {
    setIsOpenCreateCategoryPopup(false);
  };
  // const posts = useSelector(selectAllPosts);
  const handleEdit = () => {
        // dispatch(removeCategory(valueTarget, categoryName, attribute));
        
    console.log("handleEdit: ", valueTarget);
  }
  const handleDelete = () => {
    dispatch(removeCategory(valueTarget));
  }
  useEffect(() => {
    dispatch(fetchCategories());
    console.log('listcategory: ', categories);
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
      const newSelecteds = categories.map((n) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Category | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Category
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
                    rowCount={categories.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {categories.map((row) => {
                      const { id, categoryName } = row;

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

                          <TableCell align="left">
                            {' '}
                            <Typography variant="subtitle2" noWrap>
                              {categoryName}
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
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Modal
        open={isOpenCreateCategoryPopup}
        onClose={handleClosePopup}
        aria-labelledby="create-category-modal-title"
        aria-describedby="create-category-modal-description"
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
          <Typography id="create-category-modal-title" variant="h6" gutterBottom>
            Create New Category
          </Typography>
          <Typography id="create-category-modal-description" sx={{ mb: 2 }}>
            Fill out the form below to create a new category.
          </Typography>
          <Stack spacing={2}>
            <TextField label="Category Name" variant="outlined" />
            {/* Add more fields as needed */}
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
        {/* <MenuItem onClick={(event)=> handleEdit(event)}>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }}/>
              Edit
        </MenuItem> */}

        <MenuItem sx={{ color: 'error.main' }}  onClick={(event)=> handleDelete(event)}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
        </MenuItem>
      </Popover>
    </>
  );
}
