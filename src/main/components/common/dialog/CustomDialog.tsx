import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, {ReactNode, useEffect} from 'react';
import withSlot from '../../../hooks/wrapper/withSlots';
import useSlot from '../../../hooks/contexts/useSlots';

interface BaseProps {
  open: boolean;
  setOpen: Function;
}

const CustomDialog = ({
  children,
  props,
}: {
  children: ReactNode;
  props: BaseProps;
}) => {
  const handleClose = () => {
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

  const TitleTemplate = useSlot({
    children,
    name: 'title',
    fallback: <React.Fragment></React.Fragment>,
  });

  const ContentTemplate = useSlot({
    children,
    name: 'content',
    fallback: <React.Fragment></React.Fragment>,
  });

  const ActionTemplate = useSlot({
    children,
    name: 'action',
    fallback: <React.Fragment></React.Fragment>,
  });

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="md"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <TitleTemplate />
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <ContentTemplate />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ActionTemplate />
        <Button onClick={handleClose}>Trở lại</Button>
      </DialogActions>
    </Dialog>
  );
};

export default withSlot(CustomDialog);
