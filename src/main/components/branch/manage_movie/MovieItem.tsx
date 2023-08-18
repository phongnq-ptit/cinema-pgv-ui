import React, {useState} from 'react';
import MovieCard from '../../common/movies/MovieCard';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import {MoviePublic} from '../../../models/Movie';
import dayjs from 'dayjs';
import useFirebase from '../../../hooks/apis/useFirebase';

interface BaseProps {
  moviePublic: MoviePublic;
}

const MovieItem = ({props}: {props: BaseProps}) => {
  const {downloadFile} = useFirebase();
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);

  const handleDownload = () => {
    const {url, fileName} = props.moviePublic.movie.movieFile!;
    setLoadingDownload(true);
    downloadFile(url, fileName).finally(() => setLoadingDownload(false));
  };
  return (
    <React.Fragment>
      <MovieCard props={{movie: props.moviePublic.movie}}>
        <MovieCard.Slot name="content">
          <Typography variant="body1" color="text.secondary" sx={{mb: 1}}>
            Bắt đầu:
            {` ${dayjs(props.moviePublic.startDate).format(
              'HH:mm, DD/MM/YYYY'
            )}`}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{mb: 1}}>
            Kết thúc:
            {` ${dayjs(props.moviePublic.endDate).format('HH:mm, DD/MM/YYYY')}`}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{mb: 1}}>
            {`Giá tiền (1 vé): ${props.moviePublic.price} VND`}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{mb: 1}}>
            {`Số vé (còn lại):  ${props.moviePublic.totalTickets}`}
          </Typography>
        </MovieCard.Slot>
        <MovieCard.Slot name="action">
          <Button
            sx={{
              textDecoration: 'underline',
              fontWeight: 600,
              letterSpacing: 1,
            }}
            // onClick={handleClickBtn}
          >
            Xem chi tiết
          </Button>
          <Box sx={{position: 'relative'}}>
            <IconButton
              disabled={loadingDownload}
              aria-label="delete"
              onClick={handleDownload}
            >
              <DownloadIcon />
            </IconButton>
            {loadingDownload && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </MovieCard.Slot>
      </MovieCard>
    </React.Fragment>
  );
};

export default MovieItem;
