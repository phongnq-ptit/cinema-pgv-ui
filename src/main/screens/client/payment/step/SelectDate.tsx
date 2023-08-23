import React from 'react';
import {MoviePublic} from '../../../../models/Movie';
import {ISaveTargets} from '../Payment';
import {Button, Grid} from '@mui/material';
import {formatDate, passDataTime} from '../../../../utils/CommonUtils';

interface Props {
  moviePublics: MoviePublic[];
  saveTargets: ISaveTargets;
  setSaveTargets: Function;
  steps: number;
  setSteps: Function;
}

const SelectDate = ({props}: {props: Props}) => {
  const handleClick = (item: MoviePublic) => {
    props.setSaveTargets({
      ...props.saveTargets,
      startDate: passDataTime(item.startDate),
    });
    props.setSteps(props.steps + 1);
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {props.moviePublics.map((item) => (
          <Grid item xs={4} key={item.uuid}>
            <Button
              variant="outlined"
              size="large"
              sx={{fontWeight: 600, fontSize: '1rem'}}
              onClick={() => handleClick(item)}
            >
              {formatDate(item.startDate, item.endDate)}
            </Button>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default SelectDate;
