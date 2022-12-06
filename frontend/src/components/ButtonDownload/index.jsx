import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

function ButtonDownload ({ downloadLink, fileName, title }) {
  const onDownload = () => {
    const a = document.createElement("a");
    a.href = downloadLink;
    a.setAttribute('download', fileName);
    a.click();
  }

  return (
    <Button onClick={onDownload} variant='outlined' startIcon={<DownloadIcon />}>
      {title}
    </Button>
  )
}

export default ButtonDownload;