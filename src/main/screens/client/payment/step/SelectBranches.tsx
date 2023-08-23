import React from 'react';
import {MoviePublic} from '../../../../models/Movie';
import {ISaveTargets} from '../Payment';
import {Button, Grid} from '@mui/material';

interface Props {
  moviePublics: MoviePublic[];
  saveTargets: ISaveTargets;
  setSaveTargets: Function;
  steps: number;
  setSteps: Function;
}

const SelectBranches = ({props}: {props: Props}) => {
  const handleClick = (item: MoviePublic) => {
    props.setSaveTargets({
      ...props.saveTargets,
      branchUuid: item.branch.uuid,
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
              sx={{fontWeight: 600}}
              onClick={() => handleClick(item)}
            >
              {item.branch.userName}
            </Button>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default SelectBranches;
