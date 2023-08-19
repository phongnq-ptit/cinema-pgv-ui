import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../../../hooks/contexts/AuthContext';
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
import InfoIcon from '@mui/icons-material/Info';

const ErrorDialog = () => {
  const {error, setError} = useContext(AuthContext);

  const handleClose = () => {
    setError({open: false, content: ''});
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  useEffect(() => {
    if (error.open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [error.open]);

  return (
    <Dialog
      open={error.open}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="md"
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
          <InfoIcon sx={{color: 'red'}} />
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          {error.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{fontWeight: 600, color: 'red'}} onClick={handleClose}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
