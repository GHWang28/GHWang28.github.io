import React, { useState } from 'react';
import { Box, DialogContent, useMediaQuery } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from '../ModalBootstrap';
import PropTypes from 'prop-types';

function ModalImage({ open, setOpen, src, title = 'Image Modal' }) {
  const [zoom, setZoom] = useState(false);
  const mediumMq = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <BootstrapDialog
      open={open}
      fullWidth
      fullScreen={!mediumMq}
      maxWidth='xxl'
      onClose={() => { setOpen(false) }}
      aria-labelledby='image-modal'
      aria-describedby='image-modal'
    >
      <BootstrapDialogTitle sx={{ textAlign: 'center' }} onClose={() => { setOpen(false) }}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent onClick={() => { setZoom(!zoom) }} sx={{ cursor: 'pointer' }}>
        <Box
          sx={{ pointerEvents: 'none', width: (zoom) ? 'fit-content' : '100%', userSelect: 'none' }}
          component='img'
          src={src}
        />
      </DialogContent>
    </BootstrapDialog>
  )
}

ModalImage.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  setOpen: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired
};

export default ModalImage;
