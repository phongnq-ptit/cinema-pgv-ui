import React, {useState} from 'react';
import {
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import dayjs from 'dayjs';
import {MoviePublic} from '../../../models/Movie';
import {formatter} from '../../../utils/CommonUtils';
import SelectMovieDialog from '../select_movies/SelectMovieDialog';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import useFirebase from '../../../hooks/apis/useFirebase';

interface Props {
  movie: MoviePublic;
  movieSelected: string[];
  setMovieSelected: Function;
}

const MovieItem = ({props}: {props: Props}) => {
  const {downloadFile} = useFirebase();
  const [openUpdate, setOpenUpdate] = useState(false);
  const isSelected = () => props.movieSelected.includes(props.movie.uuid);

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      props.setMovieSelected([...props.movieSelected, props.movie.uuid]);
    } else {
      props.setMovieSelected([
        ...props.movieSelected.filter((item) => item !== props.movie.uuid),
      ]);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickDownload = () => {
    const _movie = props.movie.movie;
    downloadFile(_movie.movieFile!.url, _movie.movieFile!.fileName)
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1} key={props.movie.uuid}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isSelected()}
            onChange={handleChecked}
            color="primary"
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        <TableCell>{props.movie.movie.name}</TableCell>
        <TableCell>
          {dayjs(props.movie.startDate).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell>{`${dayjs(props.movie.startDate).format('HH:mm')} - ${dayjs(
          props.movie.endDate
        ).format('HH:mm')}`}</TableCell>
        <TableCell>{formatter.format(props.movie.price)}</TableCell>
        <TableCell>{`${props.movie.totalTickets} vé`}</TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            sx={{mx: 1}}
            onClick={() => {
              setOpenUpdate(true);
            }}
          >
            Cập nhật
          </Button>
          <Tooltip title="Xem thêm">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ml: 2}}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MoreVertIcon sx={{width: 24, height: 24}} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          >
            <MenuItem onClick={handleClose}>
              <Button
                size="small"
                startIcon={<DownloadIcon />}
                onClick={handleClickDownload}
              >
                Tải phim xuống
              </Button>
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <SelectMovieDialog
        props={{
          open: openUpdate,
          setOpen: setOpenUpdate,
          movie: props.movie.movie,
          moviePublic: props.movie,
        }}
      />
    </React.Fragment>
  );
};

export default MovieItem;
