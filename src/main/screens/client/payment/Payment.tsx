import {
  Box,
  Button,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Movie, MoviePublic} from '../../../models/Movie';
import useMovieApi from '../../../hooks/apis/useMovieApi';
import {LoadingContext} from '../../../hooks/contexts/LoadingContext';
import SelectDate from './step/SelectDate';
import SelectBranches from './step/SelectBranches';
import SelectTicket from './step/SelectTicket';
import ReviewPayment from './step/ReviewPayment';
import usePaymentApi from '../../../hooks/apis/usePaymentApi';

export interface ISaveTargets {
  moviePublicUuid: string | undefined;
  movieUuid: string;
  startDate: Date | string | undefined;
  branchUuid: string | undefined;
  numberOfTicket: number;
}

const Payment = () => {
  const params = useParams();
  const {getMovie} = useMovieApi();
  const {getListMoviePublicForPayment} = usePaymentApi();
  const {setLoadingPage} = useContext(LoadingContext);
  const [steps, setSteps] = useState<number>(0);
  const STEPS = ['Chọn ngày giờ', 'Chọn chi nhánh', 'Chọn loại vé', 'Tổng hợp'];
  const [movie, setMovie] = useState<Movie>({
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
  const [moviePublics, setMoviePublics] = useState<Array<MoviePublic>>([]);
  const [saveTargets, setSaveTargets] = useState<ISaveTargets>({
    moviePublicUuid: undefined,
    movieUuid: '',
    startDate: undefined,
    branchUuid: undefined,
    numberOfTicket: 0,
  });

  useEffect(() => {
    if (params.movieUuid) {
      setLoadingPage(true);
      const _params =
        saveTargets.moviePublicUuid === undefined
          ? {
              movieUuid: params.movieUuid,
              startDate: saveTargets.startDate,
              branchUuid: saveTargets.branchUuid,
            }
          : {moviePublicUuid: saveTargets.moviePublicUuid};
      getListMoviePublicForPayment(_params)
        .then((response) => {
          setMoviePublics(response.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingPage(false);
          }, 1000);
        });
    }
    // eslint-disable-next-line
  }, [params.movieUuid, steps]);

  useEffect(() => {
    if (params.movieUuid) {
      getMovie(params.movieUuid as string)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((e) => console.log(e));
    }
    // eslint-disable-next-line
  }, [params.movieUuid]);

  const isLastStep = steps === STEPS.length - 1;
  function renderStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <SelectDate
            props={{moviePublics, saveTargets, setSaveTargets, steps, setSteps}}
          />
        );
      case 1:
        return (
          <SelectBranches
            props={{moviePublics, saveTargets, setSaveTargets, steps, setSteps}}
          />
        );
      case 2:
        return (
          <SelectTicket
            props={{moviePublics, saveTargets, setSaveTargets, steps, setSteps}}
          />
        );
      case 3:
        return (
          <ReviewPayment props={{moviePublics, saveTargets, setSaveTargets}} />
        );
      default:
        return <div>Not Found</div>;
    }
  }

  function _handleBack() {
    switch (steps) {
      case 0:
        break;
      case 1:
        setSaveTargets({...saveTargets, startDate: undefined});
        break;
      case 2:
        setSaveTargets({
          ...saveTargets,
          branchUuid: undefined,
          numberOfTicket: 0,
          moviePublicUuid: undefined,
        });
        break;
      case 3:
        setSaveTargets({
          ...saveTargets,
          moviePublicUuid: undefined,
          numberOfTicket: 0,
        });
        break;
      default:
        break;
    }
    setSteps(steps - 1);
  }

  function _handleNext() {
    if (isLastStep) {
      // do nothing
    } else {
      setLoadingPage(true);
      setSteps(steps + 1);
      setTimeout(() => {
        setLoadingPage(false);
      }, 750);
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            sx={{
              width: '100%',
              fontSize: '2rem',
              fontWeight: 600,
              my: 3,
              textAlign: 'center',
            }}
          >{`Thanh toán vé cho phim: ${movie.name}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Paper sx={{minHeight: '70vh', p: 6, width: '60%'}}>
              <Grid
                container
                spacing={2}
                flexDirection="column"
                justifyContent="space-between"
              >
                <Grid item xs={12}>
                  <Stepper activeStep={steps}>
                    {STEPS.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
                <Grid item xs={12}>
                  <Box minHeight="520px">{renderStepContent(steps)}</Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{float: 'right'}}>
                    <Button
                      disabled={steps === 0}
                      variant="outlined"
                      color="inherit"
                      onClick={_handleBack}
                      sx={{mr: 1}}
                    >
                      Trở lại
                    </Button>
                    {isLastStep && (
                      <Button variant="contained" onClick={_handleNext}>
                        {'Thanh toán với Momo'}
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Payment;
