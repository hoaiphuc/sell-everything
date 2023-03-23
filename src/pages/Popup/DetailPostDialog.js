import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import  Dialog  from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
export default function DetailPostDialog({setOpen, open, post}) {

  const [fullWidth, setFullWidth] = React.useState(true);

  const [maxWidth, setMaxWidth] = React.useState('sm');

  const [imagesLoaded, setImagesLoaded] = React.useState(Array(post.img.length).fill(false));

  const StyledCover = styled('img')({
    height: "150px",
    width: "30%",
    borderRadius: "10px",
    marginLeft: '0',
    marginRight: '5px',
  });
  const handleClose = () => {
    setOpen(false);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };
  
  const handleImageLoad = (index) => {
    setImagesLoaded((prevImagesLoaded) => {
      const newImagesLoaded = [...prevImagesLoaded];
      newImagesLoaded[index] = true;
      return newImagesLoaded;
    });
  };
  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Tên sản phẩm: {post?.product[0]?.productName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Tiêu đề bài đăng: {post?.title}
          </DialogContentText>
          <DialogContentText>
          Mô tả bài đăng: {post?.description}
          </DialogContentText>
          <DialogContentText>
          Giá: {post?.product[0]?.price}
          </DialogContentText>
          <DialogContentText>
          Loại sản phẩm: {post?.category?.categoryName}
          </DialogContentText>
          
          <div style={{ display: "flex", marginTop:"30px", marginLeft:"20px"}}>
            <ImageList cols={3} rowHeight={170}>
        {post.img.map((image, index) =>
          ( <ImageListItem key={image.url}>
            <img
              src={image.url}
              srcSet={image.url}
              alt={post.title}
              loading="eager"
              onLoad={() => handleImageLoad(index)}
            />
            {!imagesLoaded[index] && <div><CircularProgress style={{ display: "block",position: "absolute", top: "50%", left: "50%"}}/></div>}
          </ImageListItem>)        
      )}
    </ImageList>
          
       {/* {post.img.map((image) => 
        { loadingImage ? 
          (<CircularProgress />) : 
          (<ImageListItem key={image.url}>
          <img
            src={image.url}
            srcSet={image.url}
            alt={post.title}
            loading="eager"
            onLoad={handleSmallImageLoad}
          />
        </ImageListItem>)
        } */}
        {/* {post.img.map((image)=>(<StyledCover src={image?.url} />))} */}
        </div>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
              marginTop:'20px'
              }}
          >
            Tình trạng bài đăng: 
            <FormControlLabel
              sx={{ mt: 1 }}
              control={ 
                <Switch checked={fullWidth} onChange={handleFullWidthChange} />
              }
              label="Full width"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}