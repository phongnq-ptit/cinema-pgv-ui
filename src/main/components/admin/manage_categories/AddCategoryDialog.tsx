import React, {useEffect, useState} from 'react';
import {Category} from '../../../models/Category';
import useCategoryApi from '../../../hooks/apis/useCategoryApi';
import CustomDialog from '../../common/dialog/CustomDialog';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import {successSnackbar, warningSnackbar} from '../../../utils/showSnackbar';

interface Props {
  open: boolean;
  setOpen: Function;
  isReload: boolean;
  setIsReload: Function;
}

const AddCategoryDialog = ({props}: {props: Props}) => {
  const {createCategory} = useCategoryApi();
  const [category, setCategory] = useState<Category>({
    name: '',
    description: '',
  } as Category);

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
    if (props.open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  const handleCloseDialog = () => {
    setCategory({
      name: '',
      description: '',
    } as Category);
    props.setOpen(false);
  };

  const handleSave = () => {
    if (category.name === '' || category.description === '') {
      warningSnackbar('Không được để trống thông tin!');
      return;
    }

    createCategory(category)
      .then((response) => {
        successSnackbar(`Thêm thể loại ${category.name} thành công!`);
        props.setIsReload(!props.isReload);
        handleCloseDialog();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleCloseDialog}
      scroll="paper"
      fullWidth
      maxWidth="sm"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Thêm thể loại mới</DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Grid component="form" container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                value={category.name}
                label="Tên thể loại"
                onChange={(event) => {
                  setCategory({...category, name: event.target.value});
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={category.description}
                multiline
                label="Mô tả"
                onChange={(event) => {
                  setCategory({...category, description: event.target.value});
                }}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{textDecoration: 'underline'}}>
        <Button type="submit" sx={{fontWeight: 600}} onClick={handleSave}>
          Thêm thể loại
        </Button>
        <Button sx={{fontWeight: 600}} onClick={handleCloseDialog}>
          Trở lại
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;
