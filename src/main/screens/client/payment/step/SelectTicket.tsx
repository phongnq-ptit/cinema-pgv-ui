import React, {useState} from 'react';
import {MoviePublic} from '../../../../models/Movie';
import {ISaveTargets} from '../Payment';
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {formatter} from '../../../../utils/CommonUtils';
import {warningSnackbar} from '../../../../utils/showSnackbar';

interface Props {
  moviePublics: MoviePublic[];
  saveTargets: ISaveTargets;
  setSaveTargets: Function;
  steps: number;
  setSteps: Function;
}

const SelectTicket = ({props}: {props: Props}) => {
  const [value, setValue] = useState<MoviePublic | null>(null);
  const handleClick = () => {
    if (props.saveTargets.numberOfTicket <= 0) {
      warningSnackbar('Số lượng vé phải lớn hơn hoặc bằng 1!');
      return;
    }
    props.setSteps(props.steps + 1);
  };

  const handleChecked =
    (item: MoviePublic) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        props.setSaveTargets({
          ...props.saveTargets,
          moviePublicUuid: item.uuid,
        });
        setValue(item);
      } else {
        props.setSaveTargets({
          ...props.saveTargets,
          moviePublicUuid: undefined,
        });
        setValue(null);
      }
    };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {props.moviePublics.map((item) => (
          <Grid item xs={4} key={item.uuid}>
            <FormControlLabel
              sx={{border: '1px solid #ccc', p: 1}}
              control={
                <Checkbox
                  checked={props.saveTargets.moviePublicUuid === item.uuid}
                  onChange={handleChecked(item)}
                />
              }
              label={`Giá vé: ${formatter.format(item.price)} (còn lại ${
                item.totalTickets
              } vé)`}
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            size="small"
            label="Nhập số lượng vé muốn mua"
            type="number"
            value={props.saveTargets.numberOfTicket}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              props.setSaveTargets({
                ...props.saveTargets,
                numberOfTicket: event.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            disabled={
              props.saveTargets.moviePublicUuid === undefined ||
              props.saveTargets.numberOfTicket <= 0
            }
            variant="contained"
            onClick={handleClick}
          >
            Tiếp tục
          </Button>
        </Grid>
        <Grid item xs={12}>
          {value !== null && props.saveTargets.numberOfTicket > 0 && (
            <Typography>{`Thành tiền: ${formatter.format(
              value.price * props.saveTargets.numberOfTicket
            )}`}</Typography>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SelectTicket;
