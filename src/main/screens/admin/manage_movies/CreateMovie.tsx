import React, {useContext, useState} from 'react';
import {Movie} from '../../../models/Movie';
import EditMovie from '../../../components/admin/manage_movies/EditMovie';
import {Button, Grid, Typography} from '@mui/material';
import FileUpload from 'react-material-file-upload';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import useFirebase from '../../../hooks/apis/useFirebase';
import {LoadingContext} from '../../../hooks/contexts/LoadingContext';
import {
  errorSnackbar,
  successSnackbar,
  warningSnackbar,
} from '../../../utils/showSnackbar';
import {StorageLocation} from '../../../models/enums/StorageLocation';
import {FileType} from '../../../models/enums/FileType';
import {useNavigate} from 'react-router-dom';

const CreateMovie = () => {
  const navigate = useNavigate();
  const {addNewMovie} = useMovieApi();
  const {uploadSingleFile, uploadMultiFiles} = useFirebase();
  const {setLoadingPage} = useContext(LoadingContext);
  const [newMovie, setNewMovie] = useState<Movie>({
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
  const [images, setImages] = useState<Array<File>>([]);
  const [video, setVideo] = useState<File[]>([]);

  const save = (data: any) => {
    if (images.length === 0 || video.length === 0) {
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
    if (newMovie.categories.length === 0) {
      warningSnackbar('Phải chọn ít nhất 1 thể loại!');
      return;
    }
    if (data.duration < 0) {
      warningSnackbar('Thời lượng phim không được để số âm!');
      return;
    }

    setLoadingPage(true);
    setNewMovie((prev) => ({...prev, ...data}));
    uploadSingleFile(StorageLocation.VIDEO, video[0], FileType.VIDEO)
      .then((_video) => {
        uploadMultiFiles(StorageLocation.IMAGE, images, FileType.IMAGE).then(
          (_images) => {
            console.log('_images', {
              ...newMovie,
              movieFile: _video,
              images: _images,
            });

            addNewMovie({
              ...newMovie,
              movieFile: _video,
              images: _images,
            })
              .then((response) => {
                console.log('movie', newMovie);

                successSnackbar(`Thêm phim ${newMovie.name} thành công`);
              })
              .catch((e) => errorSnackbar(e));
          }
        );
      })
      .finally(() => {
        setLoadingPage(false);
        navigate('/admin/movies');
      });
  };

  return (
    <React.Fragment>
      <EditMovie
        props={{
          movie: newMovie,
          setMovie: setNewMovie,
          save,
        }}
      >
        <EditMovie.Slot name="title">
          <Typography
            sx={{
              fontSize: '30px',
              textTransform: 'capitalize',
              fontWeight: 550,
            }}
          >
            Thêm Phim Mới
          </Typography>
        </EditMovie.Slot>
        <EditMovie.Slot name="file">
          <Grid item xs={6}>
            <FileUpload
              value={images}
              onChange={setImages}
              title="Chọn ảnh cho phim tại đây"
              accept="image/*"
              buttonText="Tải ảnh lên"
            />
          </Grid>
          <Grid item xs={6}>
            <FileUpload
              value={video}
              onChange={setVideo}
              title="Chọn video cho phim tại đây"
              accept="video/*"
              buttonText="Tải video lên"
              multiple={false}
            />
          </Grid>
        </EditMovie.Slot>
        <EditMovie.Slot name="action">
          <Button type="submit" variant="contained">
            Thêm phim mới
          </Button>
        </EditMovie.Slot>
      </EditMovie>
    </React.Fragment>
  );
};

export default CreateMovie;
