import React, {ReactNode} from 'react';
import withSlot from '../../../hooks/wrapper/withSlots';
import useSlot from '../../../hooks/contexts/useSlots';
import {Movie} from '../../../models/Movie';
import {Autocomplete, Box, Checkbox, Grid, TextField} from '@mui/material';
import {Category} from '../../../models/Category';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface BaseProps {
  movie: Movie;
  setMovie: Function;
  categories: Array<Category>;
}

const EditMovie = ({
  children,
  props,
}: {
  children: ReactNode;
  props: BaseProps;
}) => {
  const {movie, setMovie, categories} = props;
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
      <Box component="form" noValidate>
        <Grid container spacing={2} alignItems="center">
          <FileTemplate />
          <Grid item xs={6}>
            <TextField
              required
              margin="normal"
              label="Tên phim"
              variant="outlined"
              value={movie.name}
              onChange={(event) =>
                setMovie({...movie, name: event.target.value})
              }
              fullWidth
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
              isOptionEqualToValue={(option: Category, value: Category) =>
                option.uuid === value.uuid
              }
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
            <TextField
              required
              margin="normal"
              label="Thời lượng (phút)"
              type="number"
              variant="outlined"
              value={movie.duration}
              onChange={(event) =>
                setMovie({...movie, duration: event.target.value})
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              margin="normal"
              label="Tác giả"
              variant="outlined"
              value={movie.author}
              onChange={(event) =>
                setMovie({...movie, author: event.target.value})
              }
              fullWidth
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
