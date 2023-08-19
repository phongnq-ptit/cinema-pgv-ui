import React, {useState} from 'react';
import {Category} from '../../../models/Category';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import useCategoryApi from '../../../hooks/apis/useCategoryApi';
import {successSnackbar, warningSnackbar} from '../../../utils/showSnackbar';

interface Props {
  category: Category;
}

const CategoryItem = ({props}: {props: Props}) => {
  const {updateCategory} = useCategoryApi();
  const [category, setCategory] = useState<Category>(props.category);
  const [checked, setChecked] = useState<boolean>(false);

  const handleUpdate = () => {
    if (category.name === '' || category.description === '') {
      warningSnackbar('Không được để trống!');
      return;
    }

    updateCategory(category.uuid, category)
      .then((response) => {
        successSnackbar('Cập nhật thông tin thể loại thành công!');
        setChecked(false);
      })
      .catch((e) => {});
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography component="caption">{`Thể loại: ${category.name}`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2} flexDirection="column">
          <Grid item xs={12}>
            {checked ? (
              <TextField
                value={category.name}
                label="Tên thể loại"
                onChange={(event) => {
                  setCategory({...category, name: event.target.value});
                }}
                fullWidth
                required
              />
            ) : (
              <React.Fragment>
                <Typography sx={{fontWeight: 600}}>Tên thể loại</Typography>
                <Typography>{category.name}</Typography>
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={12}>
            {checked ? (
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
            ) : (
              <React.Fragment>
                <Typography sx={{fontWeight: 600}}>Mô tả</Typography>
                <Typography>{category.description}</Typography>
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6}>
                <FormControlLabel
                  label="Chỉnh sửa thông tin thể loại"
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => {
                        setChecked(event.target.checked);
                      }}
                      inputProps={{'aria-label': 'controlled'}}
                    />
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  disabled={!checked}
                  sx={{float: 'right', mr: 3}}
                  onClick={handleUpdate}
                >
                  Cập nhật
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryItem;
