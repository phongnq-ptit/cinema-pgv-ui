import React from 'react';
import {Movie} from '../../../models/Movie';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Link, useNavigate} from 'react-router-dom';
import AddCardIcon from '@mui/icons-material/AddCard';

interface Props {
  movie: Movie;
}

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    height: 420,
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.4)',
    },
  },
  media: {
    paddingTop: '56.25%',
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  },
  content: {
    textAlign: 'left',
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
  },
});

const MovieItemForClient = ({props}: {props: Props}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Grid item xs={3}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={props.movie.images![0].url}
          />
          <CardContent className={classes.content}>
            <Link
              className={classes.truncate}
              to={`/client/home/${props.movie.uuid}`}
              style={{
                color: '#546e7a',
                marginBottom: '0.6rem',
                fontSize: '1.2rem',
                fontWeight: '600',
              }}
            >
              {props.movie.name}
            </Link>
            <Typography variant="body2">
              {`Thời lượng: ${props.movie.duration} phút`}
            </Typography>
            <Typography className={classes.truncate} variant="body2">
              {`Thể loại: ${props.movie.categories
                .map((item) => item.name)
                .join(', ')}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Button
                sx={{textAlign: 'center', width: '80%'}}
                startIcon={<AddCardIcon />}
                variant="outlined"
                onClick={() => navigate(`/client/payment/${props.movie.uuid}`)}
              >
                Mua vé ngay
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default MovieItemForClient;
