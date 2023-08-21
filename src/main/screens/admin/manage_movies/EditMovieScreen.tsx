import React, {useContext, useEffect, useState} from 'react';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import useFirebase from '../../../hooks/apis/useFirebase';
import {LoadingContext} from '../../../hooks/contexts/LoadingContext';
import {Movie} from '../../../models/Movie';
import EditMovie from '../../../components/admin/manage_movies/EditMovie';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import FileUpload from 'react-material-file-upload';
import {useParams} from 'react-router-dom';
import useCategoryApi from '../../../hooks/apis/useCategoryApi';
import {Category} from '../../../models/Category';
import CarouselImage from '../../../components/common/CarouselImage';
import ReactPlayer from 'react-player';
import {successSnackbar, warningSnackbar} from '../../../utils/showSnackbar';
import {StorageLocation} from '../../../models/enums/StorageLocation';
import {FileType} from '../../../models/enums/FileType';
import _ from 'lodash';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

const EditMovieScreen = () => {
  const {getMovie, updateMovie} = useMovieApi();
  const {getListCategories} = useCategoryApi();
  const {uploadSingleFile, uploadMultiFiles} = useFirebase();
  const {setLoadingPage} = useContext(LoadingContext);
  const params = useParams();
  const [movieUpdate, setMovieUpdate] = useState<Movie>({
    uuid: '',
    name: '',
    duration: 0,
    author: '',
    releaseDate: new Date(),
    categories: [],
    images: [],
    movieFile: null,
    active: 1,
  });
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [images, setImages] = useState<Array<File>>([]);
  const [video, setVideo] = useState<File[]>([]);
  const [changeImages, setChangeImages] = useState<boolean>(false);
  const [changeVideo, setChangeVideo] = useState<boolean>(false);

  // control video

  useEffect(() => {
    if (params.movieUuid) {
      setLoadingPage(true);
      getMovie(params.movieUuid as string)
        .then((response) => {
          setMovieUpdate(response.data);
        })
        .catch((e) => console.log(e));

      getListCategories()
        .then((response) => {
          setCategories(response.data);
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingPage(false);
          }, 1500);
        });
    }
    // eslint-disable-next-line
  }, [params.movieUuid]);

  const save = () => {
    if (
      movieUpdate.name === '' ||
      movieUpdate.duration === 0 ||
      movieUpdate.author === ''
    ) {
      warningSnackbar(`Các input không được để trống!`);
      return;
    }
    if (
      (changeImages && images.length === 0) ||
      (changeVideo && video.length === 0)
    ) {
      warningSnackbar(
        'Phải tải ít nhất một ảnh của phim và không được thiếu file video!'
      );
      return;
    }
    let isTooBig = false;
    for (const image of images) {
      if (image.size >= 100000) {
        warningSnackbar(`File ${image.name} quá lớn`);
        isTooBig = true;
      }
    }
    if (isTooBig) return;
    if (movieUpdate.categories.length === 0) {
      warningSnackbar('Phải chọn ít nhất 1 thể loại!');
      return;
    }
    if (movieUpdate.duration < 0) {
      warningSnackbar('Thời lượng phim không được để số âm!');
      return;
    }

    if (changeVideo && !changeImages) {
      setLoadingPage(true);
      uploadSingleFile(StorageLocation.VIDEO, video[0], FileType.VIDEO)
        .then((_video) => {
          updateMovie(movieUpdate.uuid, {
            ...movieUpdate,
            movieFile: _video,
            images: null,
          })
            .then((response) => {
              successSnackbar(`Cập nhật phim ${movieUpdate.name} thành công`);
            })
            .catch((e) => console.log(e));
        })
        .finally(() => {
          setLoadingPage(false);
          setChangeImages(false);
          setChangeVideo(false);
        });
    } else if (!changeVideo && changeImages) {
      setLoadingPage(true);
      uploadMultiFiles(StorageLocation.IMAGE, images, FileType.IMAGE)
        .then((_images) => {
          updateMovie(movieUpdate.uuid, {
            ...movieUpdate,
            movieFile: null,
            images: _images,
          })
            .then((response) => {
              successSnackbar(`Cập nhật phim ${movieUpdate.name} thành công`);
            })
            .catch((e) => console.log(e));
        })
        .finally(() => {
          setLoadingPage(false);
          setChangeImages(false);
          setChangeVideo(false);
        });
    } else if (changeImages && changeVideo) {
      setLoadingPage(true);
      uploadSingleFile(StorageLocation.VIDEO, video[0], FileType.VIDEO)
        .then((_video) => {
          uploadMultiFiles(StorageLocation.IMAGE, images, FileType.IMAGE).then(
            (_images) => {
              updateMovie(movieUpdate.uuid, {
                ...movieUpdate,
                movieFile: _video,
                images: _images,
              })
                .then((response) => {
                  successSnackbar(
                    `Cập nhật phim ${movieUpdate.name} thành công`
                  );
                })
                .catch((e) => console.log(e));
            }
          );
        })
        .finally(() => {
          setLoadingPage(false);
          setChangeImages(false);
          setChangeVideo(false);
        });
    } else {
      setLoadingPage(true);
      uploadMultiFiles(StorageLocation.IMAGE, images, FileType.IMAGE)
        .then((_images) => {
          updateMovie(movieUpdate.uuid, {
            ...movieUpdate,
            movieFile: null,
            images: null,
          })
            .then((response) => {
              successSnackbar(`Cập nhật phim ${movieUpdate.name} thành công`);
            })
            .catch((e) => console.log(e));
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingPage(false);
            setChangeImages(false);
            setChangeVideo(false);
          }, 2000);
        });
    }
  };

  return (
    <React.Fragment>
      <Grid container justifyContent="center" alignItems="center" my={5}>
        <Grid item>
          <Typography
            sx={{
              fontSize: '30px',
              textTransform: 'capitalize',
              fontWeight: 550,
            }}
          >
            {`Chỉnh sửa thông tin phim: ${movieUpdate.name}`}
          </Typography>
        </Grid>
      </Grid>
      <Box component="form" noValidate>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            {changeImages ? (
              <FileUpload
                value={images}
                onChange={setImages}
                title="Chọn ảnh cho phim tại đây"
                accept="image/*"
                buttonText="Tải ảnh lên"
              />
            ) : (
              <CarouselImage
                props={{
                  images: movieUpdate.images!.map((item) => item.url),
                  sx: {
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                  },
                }}
              />
            )}
            <FormControlLabel
              label="Thay đổi ảnh"
              control={
                <Checkbox
                  checked={changeImages}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setChangeImages(event.target.checked);
                  }}
                  inputProps={{'aria-label': 'controlled'}}
                />
              }
            />
          </Grid>
          <Grid item xs={6}>
            {changeVideo ? (
              <FileUpload
                value={video}
                onChange={setVideo}
                title="Chọn video cho phim tại đây"
                accept="video/*"
                buttonText="Tải video lên"
                multiple={false}
              />
            ) : (
              <ReactPlayer
                url={movieUpdate.movieFile?.url}
                controls
                height="100%"
                width="100%"
              />
            )}
            <FormControlLabel
              label="Thay đổi video"
              control={
                <Checkbox
                  checked={changeVideo}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setChangeVideo(event.target.checked);
                  }}
                  inputProps={{'aria-label': 'controlled'}}
                />
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              margin="normal"
              label="Tên phim"
              variant="outlined"
              value={movieUpdate.name}
              onChange={(event) =>
                setMovieUpdate({...movieUpdate, name: event.target.value})
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
              value={movieUpdate.categories}
              onChange={(event, newValue: Category[]) => {
                setMovieUpdate({...movieUpdate, categories: newValue});
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
              value={movieUpdate.duration}
              onChange={(event) =>
                setMovieUpdate({
                  ...movieUpdate,
                  duration: Number(event.target.value),
                })
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
              value={movieUpdate.author}
              onChange={(event) =>
                setMovieUpdate({...movieUpdate, author: event.target.value})
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày phát hành"
                value={dayjs(movieUpdate.releaseDate)}
                onChange={(newValue) => {
                  setMovieUpdate({
                    ...movieUpdate,
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
            <Button onClick={save} variant="contained">
              Cập nhật phim
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default EditMovieScreen;
