import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, {ReactNode, useEffect} from 'react';

interface Props {
  open: boolean;
  setOpen: Function;
  handleOkBtn: Function;
  handleClose?: Function;
}

const DialogConfirm = ({
  props,
  children,
}: {
  props: Props;
  children: ReactNode;
}) => {
  const handleClose = () => {
    props.handleClose && props.handleClose();
    props.setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
    if (props.open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="sm"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Typography sx={{fontSize: '1rem', fontWeight: 600}}>
            Xác nhận thay đổi
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{fontWeight: 600}} onClick={handleClose}>
          Đóng
        </Button>
        <Button sx={{fontWeight: 600}} onClick={props.handleOkBtn()}>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
