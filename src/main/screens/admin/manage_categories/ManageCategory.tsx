import React, {useEffect, useState} from 'react';
import useCategoryApi from '../../../hooks/apis/useCategoryApi';
import {Category} from '../../../models/Category';
import CategoryItem from '../../../components/admin/manage_categories/CategoryItem';
import {Button, Grid, Typography} from '@mui/material';
import AddCategoryDialog from '../../../components/admin/manage_categories/AddCategoryDialog';

const ManageCategory = () => {
  const {getListCategories} = useCategoryApi();
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isReload, setIsReload] = useState<boolean>(false);

  useEffect(() => {
    getListCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((e) => console.log(e));
  }, [isReload]);

  return (
    <Grid container spacing={3} flexDirection="column">
      <Grid item xs={12}>
        <Typography
          sx={{fontSize: '2rem', fontWeight: 600, textAlign: 'center'}}
        >
          Quản lý thể loại phim
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          sx={{float: 'right', mr: 3}}
          onClick={() => setOpen(true)}
        >
          Thêm thể loại
        </Button>
        <AddCategoryDialog props={{open, setOpen, isReload, setIsReload}} />
      </Grid>
      <Grid item xs={12}>
        {categories.map((category) => (
          <CategoryItem props={{category}} key={category.uuid} />
        ))}
      </Grid>
    </Grid>
  );
};

export default ManageCategory;
