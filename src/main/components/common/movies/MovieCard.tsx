import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React, {ReactNode} from 'react';
import {Movie} from '../../../models/Movie';
import withSlot from '../../../hooks/wrapper/withSlots';
import useSlot from '../../../hooks/contexts/useSlots';
import dayjs from 'dayjs';

interface Props {
  movie: Movie;
}

const MovieCard = ({props, children}: {props: Props; children: ReactNode}) => {
  const CARD_PROPERTY = {
    borderRadius: 3,
    boxShadow: 5,
  };

  const ActionTemplate = useSlot({
    children,
    name: 'action',
    fallback: <React.Fragment></React.Fragment>,
  });

  return (
    <Grid item lg={3} md={4} sx={{width: '100%'}}>
      <Card sx={CARD_PROPERTY}>
        <Box sx={{position: 'relative', mb: 2}}>
          <CardMedia
            component="img"
            height="250"
            image={
              props.movie.images[
                Math.floor(Math.random() * (props.movie.images.length - 1))
              ].url
            }
            alt="..."
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background: '#000000d1',
            }}
          >
            <Typography variant="h6" color="white">
              {props.movie.name}
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{px: 3, mb: 0}}>
          <Typography variant="body1" color="text.secondary" sx={{mb: 1}}>
            Tác giả: {props.movie.author}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{mb: 1}}>
            Thời lượng: {`${props.movie.duration} phút`}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{mb: 1}}>
            Ngày phát hành:
            {` ${dayjs(props.movie.releaseDate).format('DD/MM/YYYY')}`}
          </Typography>
        </CardContent>
        <Box
          sx={{
            px: 3,
            pb: 3,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <ActionTemplate />
        </Box>
      </Card>
    </Grid>
  );
};

export default withSlot(MovieCard);
