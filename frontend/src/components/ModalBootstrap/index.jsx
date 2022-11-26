import React from 'react';
import { Dialog, DialogTitle, IconButton, Slide, styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

export function BootstrapDialog(props) {
  const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    }
  }));

  const backdropSX = {
    bgcolor: 'rgba(0,0,0,0.1)',
    backdropFilter: 'blur(5px)',
  }

  return (
    <StyledDialog
      TransitionComponent={transition}
      closeAfterTransition
      PaperProps={{
        sx: {
          border: '1px solid whitesmoke',
          borderRadius: '15px',
          width: '100%'
        }
      }}
      BackdropProps={{ sx: backdropSX }}
      {...props}
    />
  );
}

export function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          title='Close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
