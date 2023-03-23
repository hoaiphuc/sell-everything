import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from '../../components/iconify';
import { addBuilding } from '../../features/buildingSlice';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [valueInput, setValueInput] = useState('Áo quần');
  const [isCreate, setIsCreate] = useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (value) => {
    setValueInput(value);
  };
  const handleSaveBuilding = async () => {
    console.log('value: ', valueInput);
    setIsCreate(true);
  };
  useEffect(() => {
    console.log('isCreate: ', isCreate);
    if (isCreate) {
      dispatch(addBuilding(valueInput))
        .then((result) => {
          console.log('result: ', result);
          alert('Create building successful');
          handleClose();
          setIsCreate(false);
        })
        .catch((error) => {
          console.log('error: ', error);
          alert('Create building fail');
          handleClose();
          setIsCreate(false);
        });
    }
  }, [isCreate]);
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        New building
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm loại sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText>Điền tên loại sản phẩm cần thêm</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add new building"
            type="text"
            fullWidth
            variant="standard"
            onChange={(value) => handleChange(value.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveBuilding}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
