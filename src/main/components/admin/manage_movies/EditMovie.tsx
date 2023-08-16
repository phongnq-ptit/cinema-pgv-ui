import React, {ReactNode, useEffect, useState} from 'react';
import withSlot from '../../../hooks/wrapper/withSlots';
import useSlot from '../../../hooks/contexts/useSlots';
import {Movie} from '../../../models/Movie';
import {Autocomplete, Box, Checkbox, Grid, TextField} from '@mui/material';
import useCategoryApi from '../../../hooks/apis/useCategoryApi';
import {Category} from '../../../models/Category';
import {Controller, useForm} from 'react-hook-form';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface BaseProps {
  movie: Movie;
  setMovie: Function;
  save: Function;
}

const EditMovie = ({
  children,
  props,
}: {
  children: ReactNode;
  props: BaseProps;
}) => {
  const {movie, setMovie, save: submit} = props;
  const {handleSubmit, control} = useForm();
  const {getListCategories} = useCategoryApi();
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    getListCategories().then((response) => {
      setCategories(response.data);
    });
    // eslint-disable-next-line
  }, []);

  function save(data: any) {
    submit(data);
  }

  const TitleTemplate = useSlot({
    children,
    name: 'title',
    fallback: <React.Fragment></React.Fragment>,
  });

  const ActionTemplate = useSlot({
    children,
    name: 'action',
    fallback: <React.Fragment></React.Fragment>,
  });

  const FileTemplate = useSlot({
    children,
    name: 'file',
    fallback: <React.Fragment></React.Fragment>,
  });

  return (
    <React.Fragment>
      <Grid container justifyContent="center" alignItems="center" my={5}>
        <Grid item>
          <TitleTemplate />
        </Grid>
      </Grid>
      <Box component="form" noValidate onSubmit={handleSubmit(save)}>
        <Grid container spacing={2} alignItems="center">
          <FileTemplate />
          <Grid item xs={6}>
            <Controller
              name="name"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                  required
                  margin="normal"
                  label="Tên phim"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
              rules={{
                required: 'Không được để trống!',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={categories}
              disableCloseOnSelect
              value={movie.categories}
              onChange={(event, newValue: Category[]) => {
                setMovie({...movie, categories: newValue});
              }}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, {selected}) => (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{marginRight: 8}}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Thể loại" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="duration"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                  required
                  margin="normal"
                  label="Thời lượng (phút)"
                  type="number"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
              rules={{
                required: 'Không được để trống!',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="author"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                  required
                  margin="normal"
                  label="Tác giả"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
              rules={{
                required: 'Không được để trống!',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày phát hành"
                value={dayjs(movie.releaseDate)}
                onChange={(newValue) => {
                  setMovie({
                    ...movie,
                    releaseDate: newValue ? newValue.toDate() : new Date(),
                  });
                }}
                format="DD/MM/YYYY"
                sx={{width: '100%'}}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid
          container
          style={{marginTop: '24px'}}
          justifyContent="center"
          alignItems="center"
          mt={3}
        >
          <Grid item>
            <ActionTemplate />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default withSlot(EditMovie);
