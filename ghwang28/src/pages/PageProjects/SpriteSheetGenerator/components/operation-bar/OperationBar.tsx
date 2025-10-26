import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, styled, TextField, Theme, useMediaQuery } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderZipIcon from '@mui/icons-material/FolderZip';

type ComponentProps = {
  projectName: string;
  setProjectName: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  gridRows: number;
  setRows: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  gridCols: number;
  setCols: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  uploadImages: React.ChangeEventHandler<HTMLInputElement>;
  uploadImagesLoading: boolean;
  exportSpriteSheet: () => void;

  uploadProject: React.ChangeEventHandler<HTMLInputElement>;
  uploadProjectLoading: boolean;
  exportProject: () => void;
  exportProjectLoading: boolean;

  exportDisabled?: boolean;
  resetGrid: () => void;
}

const FormRow = styled('div')({
  display: 'flex',
  gap: 8,
  justifyContent: 'space-between'
})

const SmallFormRow = styled('div')({
  display: 'flex',
  gap: 8,
})

export const OperationBar: React.FC<ComponentProps> = ({
  projectName,
  setProjectName,
  gridRows,
  setRows,
  gridCols,
  setCols,
  uploadImages,
  uploadImagesLoading,
  resetGrid,
  exportSpriteSheet,
  uploadProject,
  uploadProjectLoading,
  exportProject,
  exportProjectLoading,
  exportDisabled = false
}) => {

  // Project name
  const projectNameComponent = (
    <TextField
      label="Project Name"
      type="text"
      value={projectName}
      onChange={setProjectName}
      size="small"
      fullWidth
      placeholder='This will be used when exporting files'
    />
  )

  // Upload images
  const uploadImageComponent = (
    <LoadingButton
      variant="contained"
      component="label"
      startIcon={<UploadFileIcon />}
      loading={uploadImagesLoading}
      loadingPosition="start"
    >
      {'Upload Images'}
      <input
        type="file"
        hidden
        multiple
        accept="image/png, image/jpeg, image/webp"
        onChange={uploadImages}
      />
    </LoadingButton>
  )

  const colComponent = (
    <TextField
      label="Columns"
      type="number"
      value={gridCols}
      onChange={setCols}
      inputProps={{ min: 1 }}
      sx={{ width: 100, flexShrink: 0 }}
      size="small"
    />
  )

  const rowComponent = (
    <TextField
      label="Rows"
      type="number"
      value={gridRows}
      onChange={setRows}
      inputProps={{ min: 1 }}
      sx={{ width: 100, flexShrink: 0 }}
      size="small"
    />
  )

  const deleteComponent = (
    <Button
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={resetGrid}
      sx={{ flexShrink: 0 }}
    >
      {'Clear'}
    </Button>
  )

  const exportSpriteSheetComponent = (
    <Button
      variant="contained"
      color="primary"
      startIcon={<DownloadIcon />}
      onClick={exportSpriteSheet}
      disabled={exportDisabled}
    >
      {'Export Spritesheet'}
    </Button>
  )

  const uploadProjectComponent = (
    <LoadingButton
      variant="contained"
      component="label"
      color="warning"
      startIcon={<FolderZipIcon />}
      loading={uploadProjectLoading}
      loadingPosition="start"
    >
      {'Upload Project'}
      <input
        type="file"
        hidden
        accept=".zip"
        onChange={uploadProject}
      />
    </LoadingButton>
  )
  
  const exportProjectComponent = (
    <LoadingButton
      variant="contained"
      color="warning"
      startIcon={<DownloadIcon />}
      onClick={() => exportProject()}
      loading={exportProjectLoading}
      disabled={exportDisabled}
      loadingPosition="start"
    >
      {'Export Project'}
    </LoadingButton>
  )

  const smallMq = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        mt: 2
      }}
    >
      {smallMq ? (
        <FormRow>
          {projectNameComponent}
          {rowComponent}
          {colComponent}
          {deleteComponent}
        </FormRow>
      ) : (
        <React.Fragment>
          {projectNameComponent}
          <SmallFormRow>
            {rowComponent}
            {colComponent}
            <Box sx={{ marginLeft: 'auto' }}>
              {deleteComponent}
            </Box>
          </SmallFormRow>
        </React.Fragment>
      )}

      <FormRow>
        {uploadImageComponent}
        {exportSpriteSheetComponent}
      </FormRow>

      <FormRow>
        {uploadProjectComponent}
        {exportProjectComponent}
      </FormRow>
    </Box>
  );
};
