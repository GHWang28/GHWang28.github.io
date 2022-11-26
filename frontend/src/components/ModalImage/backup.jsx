import React from 'react';
import { DialogContent, DialogContentText } from "@mui/material";
import { BootstrapDialog, BootstrapDialogTitle } from "../ModalBootstrap";
import PropTypes from 'prop-types';

function ModalImage({ open, setOpen }) {
  return (
    <BootstrapDialog
      open={open}
      fullWidth
      maxWidth='xxl'
      onClose={() => { setOpen(false) }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <BootstrapDialogTitle sx={{ textAlign: 'center' }} onClose={() => { setOpen(false) }}>
        {"Use Google's location service?"}
      </BootstrapDialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
    </BootstrapDialog>
  )
}

export default ModalImage;
